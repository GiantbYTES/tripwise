import { API_BASE_URL } from "./config";
let isRefreshing = false;
let refreshSubscribers = [];

function subscribeTokenRefresh(callback) {
  refreshSubscribers.push(callback);
}

function onRefreshed() {
  refreshSubscribers.forEach((callback) => callback());
  refreshSubscribers = [];
}

export async function apiFetch(endpoint, options = {}) {
  const doFetch = async () => {
    console.log(`${API_BASE_URL}${endpoint}`)
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    if (res.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh`, {
            method: "POST",
            credentials: "include",
          });

          if (!refreshRes.ok) throw new Error("Refresh failed");
          isRefreshing = false;
          onRefreshed();
        } catch (err) {
          isRefreshing = false;
          throw err;
        }
      }

      return new Promise((resolve) => {
        subscribeTokenRefresh(() => resolve(doFetch()));
      });
    }

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Something went wrong");
    }

    return res.json();
  };

  return doFetch();
}
