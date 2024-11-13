// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

const CACHE_NAME = "CV Salma";
const urlsToCache = [
  "/",
  "/assets/css/style.css",
  "/assets/css/swiper-bundle.min.css",
  "/assets/js/main.js",
  "/assets/js/swiper-bundle.min.js",
  "/assets/img/icon-192x192.png",
  "/assets/img/icon-512x512.png",
  "/assets/img/about.jpg",
  "/assets/img/favicon_edited.png",
  "/assets/img/informatika.jpg",
  "/assets/img/jepang.png",
  "/assets/img/salma.png",
  "/assets/img/shopee.png",
  "/assets/img/tiktok.png",
  "/assets/img/Sertifikat ukom Office.jpg",
  "/assets/img/sertifikat oracel.jpg",
  "/assets/img/sertifikat oracel 2.jpg",
];

// Install event: PWA
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error("Failed to cache:", error);
      })
  );
});

// Activate event: hapus cache lama
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cache) => {
            if (cache !== CACHE_NAME) {
              return caches.delete(cache);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
      .catch((error) => {
        console.error("Failed to activate:", error);
      })
  );
});

// Fetch event: static assets
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyBC2tWFeQqhQfkY_VOna1xdAhwrGVxDafs",
  authDomain: "portofoliosall.firebaseapp.com",
  projectId: "portofoliosall",
  storageBucket: "portofoliosall.firebasestorage.app",
  messagingSenderId: "227116829534",
  appId: "1:227116829534:web:0481736d12e2f828f81dcf",
  measurementId: "G-ELDYJMRH20",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Website Portofolio";
  const notificationOptions = {
    body: "Website Portofolio Salma",
    icon: "/assets/img/icon background.jpg",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
