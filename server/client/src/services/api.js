import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE ||
    (import.meta.env.PROD ? "/api" : "http://127.0.0.1:5000/api"),
});

export const createValentine = (data) =>
  API.post("/valentine/create", data);

export const getValentine = (slug) =>
  API.get(`/valentine/${slug}`);

export const storeSpecialPassword = (data) =>
  API.post("/special-passwords", data);
