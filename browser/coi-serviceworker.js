/* Cross-origin isolation for static hosts that cannot set response headers.
 *
 * wllama's multi-threaded WebAssembly needs SharedArrayBuffer, which browsers only
 * expose on cross-origin-isolated pages -- that is, pages served with
 *   Cross-Origin-Opener-Policy: same-origin
 *   Cross-Origin-Embedder-Policy: require-corp
 *
 * Cloudflare Pages and Netlify can set those through the _headers file in this
 * directory. GitHub Pages cannot set headers at all, so this service worker
 * re-serves every response with them attached, which is enough for the browser to
 * treat the page as isolated. Without it the demo still works, single-threaded and
 * slower.
 *
 * Same idea as gzuidhof/coi-serviceworker, written out here so the page carries no
 * dependency it cannot read.
 */

if (typeof window === "undefined") {
  // ----- service worker side -----
  self.addEventListener("install", () => self.skipWaiting());
  self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

  self.addEventListener("fetch", (event) => {
    const request = event.request;
    if (request.cache === "only-if-cached" && request.mode !== "same-origin") return;

    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 0) return response;   // opaque: pass through untouched
          const headers = new Headers(response.headers);
          headers.set("Cross-Origin-Embedder-Policy", "require-corp");
          headers.set("Cross-Origin-Opener-Policy", "same-origin");
          return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers,
          });
        })
        .catch((error) => console.error("coi-serviceworker:", error)),
    );
  });
} else {
  // ----- page side -----
  (() => {
    if (window.crossOriginIsolated) return;            // headers already set by the host
    if (!window.isSecureContext) return;               // service workers need https or localhost
    if (!navigator.serviceWorker) return;

    navigator.serviceWorker
      .register(window.document.currentScript.src)
      .then((registration) => {
        registration.addEventListener("updatefound", () => window.location.reload());
        // A fresh registration does not control this page yet; one reload fixes that.
        if (registration.active && !navigator.serviceWorker.controller) window.location.reload();
      })
      .catch((error) => console.warn("coi-serviceworker registration failed:", error));
  })();
}
