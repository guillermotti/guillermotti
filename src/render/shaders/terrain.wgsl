import { perlin2d, fbmPerlin2d } from "@vgpu/wgsl-std/noise/perlin";

const WATER_LEVEL: f32 = 0.18;

export fn waterLevel() -> f32 {
  return WATER_LEVEL;
}

fn ridged(position: vec2f, octaves: i32) -> f32 {
  var sum = 0.0;
  var amplitude = 1.0;
  var weight = 0.0;
  var sample = position;
  for (var i = 0; i < octaves; i = i + 1) {
    let ridge = 1.0 - abs(perlin2d(sample));
    sum = sum + amplitude * ridge * ridge;
    weight = weight + amplitude;
    sample = sample * 2.13;
    amplitude = amplitude * 0.5;
  }
  return sum / max(weight, 0.0001);
}

export fn heightCheap(p: vec2f) -> f32 {
  let h = ridged(p * 0.034 + vec2f(4.7, 1.2), 3);
  let inland = smoothstep(-5.0, 24.0, p.y);
  return mix(-2.35, h * 11.4 - 2.1, inland);
}

export fn heightDetail(p: vec2f) -> f32 {
  let warp = vec2f(
    fbmPerlin2d(p * 0.016 + vec2f(17.0, 4.0), 3, 2.17, 0.5),
    fbmPerlin2d(p * 0.016 + vec2f(9.0, 31.0), 3, 2.17, 0.5),
  );
  let q = p + warp * 20.0;
  let h = ridged(q * 0.032 + vec2f(4.7, 1.2), 5);
  let crumble = fbmPerlin2d(q * 0.11 + vec2f(3.0, 8.0), 3, 2.03, 0.5);
  let inland = smoothstep(-6.0, 26.0, q.y);
  return mix(-2.4 + crumble * 0.45, h * 12.2 - 2.2 + crumble * 1.1, inland);
}

export fn terrainNormal(p: vec2f) -> vec3f {
  let e = 0.12;
  let h = heightDetail(p);
  let hx = heightDetail(p + vec2f(e, 0.0));
  let hz = heightDetail(p + vec2f(0.0, e));
  return normalize(vec3f(h - hx, e, h - hz));
}

export fn waveNormal(p: vec2f, time: f32) -> vec3f {
  let drift = vec2f(time * 0.07, time * 0.045);
  let e = 0.55;
  let h = fbmPerlin2d(p * 0.09 + drift, 3, 2.0, 0.5);
  let hx = fbmPerlin2d((p + vec2f(e, 0.0)) * 0.09 + drift, 3, 2.0, 0.5);
  let hz = fbmPerlin2d((p + vec2f(0.0, e)) * 0.09 + drift, 3, 2.0, 0.5);
  return normalize(vec3f((h - hx) / e, 1.0, (h - hz) / e));
}
