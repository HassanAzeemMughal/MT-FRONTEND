const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

// Function to handle GET requests
async function getApi(endpoint) {
  const url = `${BASE_URL}/${endpoint}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// Function to handle POST requests
async function postApi(endpoint, body, isMultipart = false) {
  const url = `${BASE_URL}/${endpoint}`;
  const headers = {};

  // Only set Content-Type for non-multipart data
  if (!isMultipart) {
    headers["Content-Type"] = "application/json";
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: isMultipart ? body : JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error posting data:", error.message);
    throw new Error(error);
  }
}

async function delApi(endpoint) {
  const url = `${BASE_URL}/${endpoint}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting data:", error.message);
    throw new Error(error);
  }
}
async function postFile(endpoint, body) {
  const url = `${BASE_URL}/${endpoint}`;
  try {
    const response = await fetch(url, {
      method: "POST",
      body,
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error posting data:", error.message);
    throw new Error(error);
  }
}

export { getApi, postApi, delApi, postFile };
