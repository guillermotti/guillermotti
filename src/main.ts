import { mountHud } from "./hud";
import { startWorld } from "./render/world";
import { bindPointer, createWorldState, readStoredTheme, setTheme } from "./world";
import "./styles.css";

const theme = readStoredTheme();
document.documentElement.dataset.theme = theme;

const state = createWorldState(theme);
setTheme(state, theme);

const app = document.querySelector("#app");
if (app instanceof HTMLElement) {
  mountHud(app, state);
}

const unbindPointer = bindPointer(state);

const canvas = document.querySelector("#scene");
const ready = () => document.documentElement.classList.add("is-ready");

if (canvas instanceof HTMLCanvasElement && "gpu" in navigator) {
  void startWorld(canvas, state)
    .then((stop) => {
      ready();
      window.addEventListener("pagehide", () => {
        unbindPointer();
        stop();
      });
    })
    .catch(() => {
      document.documentElement.classList.add("no-webgpu");
      ready();
    });
} else {
  document.documentElement.classList.add("no-webgpu");
  ready();
}
