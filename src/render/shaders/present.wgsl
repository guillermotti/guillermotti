import { applyExposure, linearToSrgb3, tonemapAces } from "@vgpu/wgsl-std/color";
import { hash3 } from "@vgpu/wgsl-std/hash";

struct Params {
  time: f32,
  grain: f32,
}

@group(0) @binding(0) var scene: texture_2d<f32>;
@group(0) @binding(1) var sceneSampler: sampler;
@group(0) @binding(2) var<uniform> params: Params;

@fragment
fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let ca = (uv - vec2f(0.5)) * 0.0024;
  let r = textureSampleLevel(scene, sceneSampler, uv + ca, 0.0).r;
  let g = textureSampleLevel(scene, sceneSampler, uv, 0.0).g;
  let b = textureSampleLevel(scene, sceneSampler, uv - ca, 0.0).b;
  var color = vec3f(r, g, b);

  color = applyExposure(color, 0.15);
  color = tonemapAces(color);

  let radial = length(uv - vec2f(0.5));
  let vignette = 1.0 - smoothstep(0.38, 1.15, radial) * 0.38;
  color = color * vignette;

  let noise = hash3(vec3f(uv * 980.0, params.time * 37.0));
  color = color + (noise - vec3f(0.5)) * params.grain;
  color = clamp(color, vec3f(0.0), vec3f(1.0));

  return vec4f(linearToSrgb3(color), 1.0);
}
