const BASE = import.meta.env.VITE_API_URL ?? "";

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${BASE}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch {
    throw new Error("Can't reach the server. Please email me directly.");
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || "Something went wrong.");
    error.fieldErrors = data.errors || {};
    throw error;
  }
  return data;
}

export const sendContactMessage = (payload) =>
  request("/api/contact", { method: "POST", body: JSON.stringify(payload) });