import axios from "axios";

import { auth } from "../firebase/firebase.config";

const api = axios.create({
  baseURL:
    "https://a11-server-lake.vercel.app",
});

api.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;

    if (user) {
      const token = await user.getIdToken();

      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => Promise.reject(error)
);

export default api;