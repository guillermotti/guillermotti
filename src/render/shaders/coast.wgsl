import { heightCheap, heightDetail, terrainNormal, waveNormal, waterLevel } from "./terrain.wgsl";
import { sunDirection, skyColor, fogFactor } from "./atmosphere.wgsl";
import { saturate } from "@vgpu/wgsl-std/math";

struct Params {
  time: f32,
  scroll: f32,
  day: f32,
  pad: f32,
  mouse: vec2f,
  resolution: vec2f,
}

@group(0) @binding(0) var<uniform> params: Params;

const MAX_DIST: f32 = 170.0;

fn cameraRay(uv: vec2f) -> vec3f {
  let yaw = -0.18 + params.mouse.x * 0.28 + params.time * 0.016;
  let pitch = -0.08 + params.mouse.y * 0.12 - params.scroll * 0.05;
  let cy = cos(yaw);
  let sy = sin(yaw);
  let cp = cos(pitch);
  let sp = sin(pitch);
  let forward = normalize(vec3f(sy * cp, sp, cy * cp));
  let right = normalize(cross(forward, vec3f(0.0, 1.0, 0.0)));
  let up = cross(right, forward);
  let aspect = params.resolution.x / max(params.resolution.y, 1.0);
  let ndc = vec2f((uv.x * 2.0 - 1.0) * aspect, 1.0 - uv.y * 2.0);
  return normalize(forward + right * ndc.x * 0.72 + up * ndc.y * 0.72);
}

fn cameraOrigin() -> vec3f {
  return vec3f(
    params.mouse.x * 2.8,
    2.7 + params.scroll * 3.6,
    -14.5 + params.scroll * 9.0,
  );
}

fn marchTerrain(ro: vec3f, rd: vec3f) -> f32 {
  var t = 0.0;
  for (var i = 0; i < 76; i = i + 1) {
    let p = ro + rd * t;
    let h = p.y - heightCheap(p.xz);
    if (h < 0.014 * t) {
      return t;
    }
    t = t + max(h * 0.52, 0.035);
    if (t > MAX_DIST) {
      return -1.0;
    }
  }
  return -1.0;
}

fn shadeTerrain(p: vec3f, rd: vec3f, sun: vec3f, day: f32) -> vec3f {
  let n = terrainNormal(p.xz);
  let h = heightDetail(p.xz);
  let slope = saturate(1.0 - n.y);
  let stone = mix(vec3f(0.22, 0.21, 0.19), vec3f(0.38, 0.36, 0.33), saturate(h * 0.08 + 0.4));
  let moss = vec3f(0.18, 0.22, 0.16);
  var albedo = mix(stone, moss, saturate(n.y - 0.45) * (0.35 + day * 0.25));
  albedo = mix(albedo, vec3f(0.12, 0.11, 0.10), saturate(slope * 1.6));

  let wet = saturate(1.15 - (h - waterLevel()) * 2.8);
  albedo = mix(albedo, albedo * vec3f(0.35, 0.38, 0.4), wet);

  let wrap = saturate(dot(n, sun) * 0.55 + 0.45);
  let sunCol = mix(vec3f(1.0, 0.55, 0.28), vec3f(1.0, 0.94, 0.84), day);
  let skyLit = mix(vec3f(0.08, 0.10, 0.16), vec3f(0.42, 0.50, 0.58), day);
  var color = albedo * (sunCol * wrap * mix(1.1, 0.95, day) + skyLit * (n.y * 0.35 + 0.2));
  let spec = pow(saturate(dot(reflect(-sun, n), -rd)), 24.0) * (1.0 - wet * 0.4) * 0.12;
  color = color + sunCol * spec;
  return color;
}

fn shadeWater(p: vec3f, rd: vec3f, sun: vec3f, day: f32, time: f32) -> vec3f {
  let n = waveNormal(p.xz, time);
  let bed = heightCheap(p.xz);
  let depth = saturate((waterLevel() - bed) * 0.28);
  let shallow = mix(vec3f(0.09, 0.11, 0.12), vec3f(0.14, 0.24, 0.28), day);
  let deep = mix(vec3f(0.012, 0.02, 0.04), vec3f(0.03, 0.08, 0.12), day);
  var water = mix(shallow, deep, depth);

  let reflDir = reflect(rd, n);
  let reflected = skyColor(reflDir, sun, day, time);
  let fresnel = pow(1.0 - saturate(dot(n, -rd)), 5.0);
  water = mix(water, reflected * mix(0.85, 0.55, day), 0.22 + fresnel * 0.55);

  let spec = pow(saturate(dot(reflect(-sun, n), -rd)), mix(36.0, 80.0, day));
  let sunCol = mix(vec3f(1.0, 0.52, 0.22), vec3f(1.0, 0.95, 0.82), day);
  water = water + sunCol * spec * mix(4.2, 1.8, day);
  return water;
}

@fragment
fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let ro = cameraOrigin();
  let rd = cameraRay(uv);
  let sun = sunDirection(params.day);
  var color = skyColor(rd, sun, params.day, params.time);
  var dist = MAX_DIST;

  let landT = marchTerrain(ro, rd);
  var waterT = -1.0;
  if (abs(rd.y) > 0.0001) {
    let t = (waterLevel() - ro.y) / rd.y;
    if (t > 0.0 && t < MAX_DIST) {
      waterT = t;
    }
  }

  let hitLand = landT > 0.0;
  let hitWater = waterT > 0.0 && (!hitLand || waterT < landT);

  if (hitWater) {
    let p = ro + rd * waterT;
    color = shadeWater(p, rd, sun, params.day, params.time);
    dist = waterT;
  } else if (hitLand) {
    let p = ro + rd * landT;
    color = shadeTerrain(p, rd, sun, params.day);
    dist = landT;
  }

  let fog = fogFactor(dist, params.scroll);
  let fogCol = skyColor(rd, sun, params.day, params.time);
  color = mix(color, fogCol, fog);

  return vec4f(color, 1.0);
}
