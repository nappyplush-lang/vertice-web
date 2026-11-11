/** Señal global: el preloader terminó y el hero puede animar su entrada. */
let done = false;
const subs = new Set<() => void>();

export function markReady() {
  if (done) return;
  done = true;
  subs.forEach((fn) => fn());
  subs.clear();
}

export function onReady(fn: () => void) {
  if (done) {
    fn();
    return () => {};
  }
  subs.add(fn);
  return () => {
    subs.delete(fn);
  };
}
