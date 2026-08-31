export type Theme = "night" | "day";

export type WorldState = {
  day: number;
  dayTarget: number;
  mouseX: number;
  mouseY: number;
  mouseTargetX: number;
  mouseTargetY: number;
  scroll: number;
  reducedMotion: boolean;
};

const STORAGE_KEY = "theme";

export function readStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light") return "day";
    if (stored === "dark") return "night";
    if (stored === "day" || stored === "night") return stored;
  } catch {
    // ignore
  }
  return "night";
}

export function writeStoredTheme(theme: Theme): void {
  try {
    localStorage.setItem(STORAGE_KEY, theme === "day" ? "light" : "dark");
  } catch {
    // ignore
  }
}

export function createWorldState(theme: Theme): WorldState {
  const day = theme === "day" ? 1 : 0;
  return {
    day,
    dayTarget: day,
    mouseX: 0,
    mouseY: 0,
    mouseTargetX: 0,
    mouseTargetY: 0,
    scroll: 0,
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  };
}

export function setTheme(state: WorldState, theme: Theme): void {
  state.dayTarget = theme === "day" ? 1 : 0;
  writeStoredTheme(theme);
  document.documentElement.dataset.theme = theme;
}

export function tickWorld(state: WorldState, dt: number): void {
  const follow = state.reducedMotion ? 1 : 1 - Math.exp(-dt * 3.2);
  const look = state.reducedMotion ? 1 : 1 - Math.exp(-dt * 4.4);
  state.day += (state.dayTarget - state.day) * follow;
  state.mouseX += (state.mouseTargetX - state.mouseX) * look;
  state.mouseY += (state.mouseTargetY - state.mouseY) * look;

  const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  state.scroll = Math.min(1, Math.max(0, window.scrollY / maxScroll));
}

export function bindPointer(state: WorldState): () => void {
  const onMove = (event: PointerEvent) => {
    const x = (event.clientX / Math.max(window.innerWidth, 1)) * 2 - 1;
    const y = (event.clientY / Math.max(window.innerHeight, 1)) * 2 - 1;
    state.mouseTargetX = x;
    state.mouseTargetY = -y;
  };
  window.addEventListener("pointermove", onMove, { passive: true });
  return () => window.removeEventListener("pointermove", onMove);
}
