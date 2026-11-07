import axios from "axios";

// One configured instance for the whole app.
// In development baseURL is empty, so Vite's /api proxy handles requests.
// In production, set VITE_API_URL to your deployed backend.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "",
  headers: { "Content-Type": "application/json" },
  timeout: 30000, // generous: free-tier backends can take a while to wake up
});

// Turn every axios failure into a plain Error the UI can show directly.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error.response?.data;

    let message = data?.message;
    if (!message) {
      if (error.code === "ECONNABORTED") message = "The server took too long to respond. Please try again.";
      else if (error.response) message = "Something went wrong.";
      else message = "Can't reach the server. Please email me directly.";
    }

    const normalized = new Error(message);
    normalized.status = error.response?.status;
    normalized.fieldErrors = data?.errors || {};
    return Promise.reject(normalized);
  },
);

export async function sendContactMessage(payload) {
  const { data } = await api.post("https://api.web3forms.com/submit", { ...payload, access_key: import.meta.env.VITE_FORM_ACCESS_KEY });
  return data;
}