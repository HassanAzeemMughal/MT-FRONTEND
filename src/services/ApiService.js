const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  "https://mt-server-eta.vercel.app";
const BASE_URL = `${API_BASE_URL}/api/v1`;

/**
 * Utility to join URL parts and remove duplicate slashes
 */
function buildUrl(endpoint) {
  // remove any leading slash from endpoint
  const cleanEndpoint = endpoint.replace(/^\/+/, "");
  return `${BASE_URL}/${cleanEndpoint}`.replace(/([^:]\/)\/+/g, "$1");
}

async function getApi(endpoint) {
  const url = buildUrl(endpoint);
  try {
    const response = await fetch(url, {
      credentials: "include", // if your backend uses cookies for auth
    });
    if (!response.ok) {
      throw new Error(`GET ${url} failed: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function postApi(endpoint, body, isMultipart = false) {
  const url = buildUrl(endpoint);
  const headers = {};

  if (!isMultipart) {
    headers["Content-Type"] = "application/json";
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers,
      body: isMultipart ? body : JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`POST ${url} failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
}

async function delApi(endpoint) {
  const url = buildUrl(endpoint);
  try {
    const response = await fetch(url, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`DELETE ${url} failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
}

async function postFile(endpoint, body) {
  const url = buildUrl(endpoint);
  try {
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      body,
    });

    if (!response.ok) {
      throw new Error(`POST file ${url} failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error posting file:", error);
    throw error;
  }
}

export { getApi, postApi, delApi, postFile };
