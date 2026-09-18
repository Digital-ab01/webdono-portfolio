export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Live screenshot via WordPress mshots — renders the real, current state of
 * each project URL so previews never go stale. First request can return a
 * placeholder while the render queues; subsequent loads are cached.
 */
export function mshot(url: string, width: number, height: number) {
  return `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=${width}&h=${height}`;
}

export function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
