import { Alert, Space } from "antd";

var DYNAMIC_CACHE_VERSION = "daynamic_1";
var STATIC_CACHE_VERSION = "static_1";

STATIC_CACHE_VERSION = [
  "/",
  "/index.html",
  "/logo192.png",
  "./logo512.png",
  "/src/Hook/UsePhotos.tsx",
];

// install mode
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open("static_1")
      .then((cache) => {
        return cache.addAll(STATIC_CACHE_VERSION);
      })
      .catch((error) =>
        console.log("Error in cache open during installation: " + error)
      )
  );
});

let deferredPrompt;
window.addEventListener("beforeinstallprompt", (e) => {
  // Prevents the default mini-infobar or install dialog from appearing on mobile
  e.preventDefault();
  // Save the event because you'll need to trigger it later.
  deferredPrompt = e;
  // Show your customized install prompt for your PWA
  // Your own UI doesn't have to be a single element, you
  // can have buttons in different locations, or wait to prompt
  // as part of a critical journey.
  showInAppInstallPromotion(
    <Space direction="vertical" style={{ width: "100%" }}>
      <Alert
        message="Install Pwa Application"
        description="Do you Want install App On Your Device ???"
        type="info"
      />
    </Space>
  );
});

//activate mode
// 1- this function  controlled old cache
function CleanCache() {
  caches.keys().then((keys) => {
    return Promise.all(
      keys.map((key) => {
        if (key !== STATIC_CACHE_VERSION && key !== DYNAMIC_CACHE_VERSION) {
          console.log("old cache removed", key);
          return caches.delete(key);
        }
      })
    );
  });
}
// -2 call function in activate
self.addEventListener("activete", (event) => {
  event.waituntill(CleanCache());
});

// fetch mode
self.addEventListener("fetch", (event) => {
  const request = event.request;
  event.respondWith(
    caches.match(request).then((response) => {
      const updateResponse = fetch(request)
        .then((newRes) => {
          const clonedResponse = newRes.clone();
          caches.open(DYNAMIC_CACHE_VERSION).then((cache) => {
            cache.put(request, clonedResponse);
          });
          return newRes;
        })
        .catch(() => caches.match(request));
      return response || updateResponse;
    })
  );
});
