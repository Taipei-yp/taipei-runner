/* eslint-disable no-restricted-globals */

const APP_CACHE = "taipei-runner-v1";

const putIntoAppCache = async (
  request: RequestInfo,
  response: Response,
): Promise<void> => {
  const cache = await caches.open(APP_CACHE);
  return cache.put(request, response);
};

const canBeCached = (request: Request) =>
  request.method === "GET" &&
  request.url.startsWith("http") &&
  !request.url.includes("sockjs-node");

// no type definitions for the event :(
self.addEventListener("fetch", (event: any) => {
  if (!canBeCached(event.request)) {
    return event.respondWith(fetch(event.request));
  }

  event.respondWith(
    (async () => {
      try {
        const fetchedResponse = await fetch(event.request);
        if (fetchedResponse.ok) {
          putIntoAppCache(event.request, fetchedResponse.clone());
        }
        return fetchedResponse;
      } catch {
        return caches.match(event.request);
      }
    })(),
  );
});

/* eslint-enable no-restricted-globals */
