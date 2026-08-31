import { fbmPerlin2d } from "@vgpu/wgsl-std/noise/perlin";
import { hash3 } from "@vgpu/wgsl-std/hash";
import { saturate } from "@vgpu/wgsl-std/math";

export fn sunDirection(day: f32) -> vec3f {
  let altitude = mix(0.04, 0.48, day);
  return normalize(vec3f(0.62, altitude, 0.42));
}

export fn skyColor(rd: vec3f, sun: vec3f, day: f32, time: f32) -> vec3f {
  let height = saturate(rd.y * 0.9 + 0.12);
  let zenithNight = vec3f(0.016, 0.022, 0.055);
  let horizonNight = vec3f(0.42, 0.20, 0.09);
  let zenithDay = vec3f(0.38, 0.52, 0.66);
  let horizonDay = vec3f(0.72, 0.74, 0.76);
  let zenith = mix(zenithNight, zenithDay, day);
  let horizon = mix(horizonNight, horizonDay, day);
  var color = mix(horizon, zenith, pow(height, 0.52));

  let sunDot = saturate(dot(rd, sun));
  let sunCol = mix(vec3f(1.0, 0.52, 0.22), vec3f(1.0, 0.96, 0.88), day);
  color = color + sunCol * pow(sunDot, 8.0) * mix(0.7, 0.35, day);
  color = color + sunCol * pow(sunDot, 180.0) * mix(12.0, 5.5, day);
  color = color + sunCol * pow(sunDot, 1400.0) * mix(18.0, 8.0, day);

  if (rd.y > 0.04) {
    let t = 48.0 / max(rd.y, 0.04);
    let uv = rd.xz * t * 0.012 + vec2f(time * 0.012, 0.0);
    let cover = saturate(fbmPerlin2d(uv, 4, 2.17, 0.5) * 0.55 + 0.12);
    let cloud = cover * cover * mix(0.12, 0.42, day);
    color = mix(color, vec3f(cloud) + color * 0.35, cover * mix(0.25, 0.55, day) * saturate(rd.y * 2.0));
  }

  if (day < 0.28) {
    let spark = hash3(rd * 90.0 + vec3f(2.1, 0.4, 7.7));
    let star = step(0.9964, spark.x) * pow(spark.y, 10.0);
    color = color + vec3f(star) * saturate(1.0 - day / 0.28);
  }

  return color;
}

export fn fogFactor(distance: f32, scroll: f32) -> f32 {
  let density = 0.011 + scroll * 0.018;
  return 1.0 - exp(-distance * density);
}
