const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchVideos = async (query = "New") => {
  const endpoint = `${API_BASE_URL}/videos?q=${encodeURIComponent(query)}`;
  const response = await fetch(endpoint);

  const data = await response.json();
  return data.items || [];
};

export const fetchVideoDetail = async (id) => {
  const endpoint = `${API_BASE_URL}/video/${id}`;
  const response = await fetch(endpoint);

  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error(`Expected JSON, but got: ${await response.text()}`);
  }

  const data = await response.json();
  return data || null; // backend returns single object
};
