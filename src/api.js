const BASE_URL = 'http://localhost:8000';

export async function getLinks() {
  const res = await fetch(`${BASE_URL}/links`);
  if (!res.ok) {
    throw new Error(`Failed to fetch links: ${res.status}`);
  }
  return res.json();
}

export async function createLink(url) {
  const res = await fetch(`${BASE_URL}/links`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });
  if (!res.ok) {
    let message = `Error ${res.status}`;
    try {
      const data = await res.json();
      message = data.detail ?? message;
    } catch (_) {}
    throw new Error(message);
  }
  return res.json();
}

export async function deleteLink(name) {
  const res = await fetch(`${BASE_URL}/links/${encodeURIComponent(name)}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    let message = `Error ${res.status}`;
    try {
      const data = await res.json();
      message = data.detail ?? message;
    } catch (_) {}
    throw new Error(message);
  }
}
