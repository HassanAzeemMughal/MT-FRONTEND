// const API_BASE_URL =
//   process.env.NEXT_PUBLIC_API_URL;
const API_BASE_URL = "https://mt-server-eta.vercel.app";
const BASE_URL = `${API_BASE_URL}/api/v1`;

function buildUrl(endpoint) {
  return `${BASE_URL}/${endpoint}`.replace(/([^:]\/)\/+/g, "$1");
}

async function handleResponse(response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(
      errorData.message || `Request failed: ${response.status}`
    );
    error.status = response.status;
    throw error;
  }
  return response.json();
}

async function getApi(endpoint) {
  const url = buildUrl(endpoint);
  try {
    const response = await fetch(url, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("❌ GET Error:", error);
    throw error;
  }
}

async function postApi(endpoint, body, isMultipart = false) {
  const url = buildUrl(endpoint);
  const headers = {};
  let payload = body;

  if (!isMultipart) {
    headers["Content-Type"] = "application/json";
    payload = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers,
      body: payload,
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("❌ POST Error:", error);
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
    return await handleResponse(response);
  } catch (error) {
    console.error("❌ DELETE Error:", error);
    throw error;
  }
}

export { getApi, postApi, delApi };
