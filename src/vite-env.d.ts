/// <reference types="vite/client" />

// Allow side-effect SCSS / CSS imports anywhere in the app.
declare module "*.scss";
declare module "*.css";

// Swiper ships its own CSS bundles; declare them as side-effect modules.
declare module "swiper/css";
declare module "swiper/css/pagination";

// Leaflet's CSS file (used by react-leaflet).
declare module "leaflet/dist/leaflet.css";
