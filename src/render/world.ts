import { clock, effect, frameLoop, init, sampler, surface, target } from "vgpu";
import type { FrameLoopHandle, Gpu } from "vgpu";
import coastShader from "./shaders/coast.wgsl";
import presentShader from "./shaders/present.wgsl";
import { tickWorld, type WorldState } from "../world";

function sceneSize(width: number, height: number): [number, number] {
  const mobile = Math.min(window.innerWidth, window.innerHeight) < 720;
  const scale = mobile ? 0.48 : 0.72;
  return [Math.max(1, Math.floor(width * scale)), Math.max(1, Math.floor(height * scale))];
}

export async function startWorld(canvas: HTMLCanvasElement, state: WorldState): Promise<() => void> {
  let disposed = false;
  let loop: FrameLoopHandle | undefined;
  let gpu: Gpu | undefined;
  let unbindResize: (() => void) | undefined;

  try {
    gpu = await init();
    if (disposed) {
      gpu.dispose();
      return () => undefined;
    }

    const canvasSurface = surface(gpu, canvas, {
      dpr: [1, 1.5],
      alphaMode: "opaque",
      format: "bgra8unorm",
    });
    const hdr = target(gpu, {
      size: sceneSize(canvasSurface.size[0], canvasSurface.size[1]),
      format: "rgba16float",
      label: "coast-hdr",
    });

    const coast = effect(gpu, coastShader, {
      label: "coast",
      set: {
        params: {
          time: 0,
          scroll: 0,
          day: state.day,
          pad: 0,
          mouse: [state.mouseX, state.mouseY],
          resolution: hdr.size,
        },
      },
    });

    const present = effect(gpu, presentShader, {
      label: "present",
      set: {
        scene: hdr,
        sceneSampler: sampler(gpu, { minFilter: "linear", magFilter: "linear" }),
        params: { time: 0, grain: 0.035 },
      },
    });

    unbindResize = canvasSurface.onResize(({ width, height }) => {
      hdr.resize(sceneSize(width, height));
      coast.set({ params: { resolution: hdr.size } });
      present.set({ scene: hdr });
    });

    await coast.compile(hdr);
    if (disposed) {
      unbindResize();
      gpu.dispose();
      return () => undefined;
    }

    const time = clock(gpu);
    loop = frameLoop(gpu, (frame) => {
      tickWorld(state, time.deltaTime);
      const t = state.reducedMotion ? 0 : time.time;
      coast.set({
        params: {
          time: t,
          scroll: state.scroll,
          day: state.day,
          mouse: [state.mouseX, state.mouseY],
        },
      });
      present.set({ params: { time: t, grain: 0.018 } });
      frame.pass({ target: hdr, clear: [0.02, 0.03, 0.05, 1] }, (pass) => {
        pass.draw(coast);
      });
      frame.pass(canvasSurface, present);
    });
  } catch (error) {
    console.warn("WebGPU coast failed to start", error);
    document.documentElement.classList.add("no-webgpu");
    gpu?.dispose();
    return () => undefined;
  }

  return () => {
    disposed = true;
    unbindResize?.();
    loop?.stop();
    gpu?.dispose();
  };
}
