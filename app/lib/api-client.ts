import axios from "axios";

/**
 * Pre-configured Axios instance. The app currently serves a local mock dataset
 * (see news.ts), but this client is the single seam to swap in a live news API
 * — set NEWS_API_BASE_URL and route the service functions through it.
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_NEWS_API_BASE_URL ?? "/api",
  timeout: 10_000,
  headers: { Accept: "application/json" },
});
