const BASE_URL = 'http://localhost:8000';
const TOKEN_STORE_KEY = 'oracle_delete_tokens';

function saveDeleteToken(name, token) {
  try {
    const store = JSON.parse(localStorage.getItem(TOKEN_STORE_KEY) || '{}');
    store[name] = token;
    localStorage.setItem(TOKEN_STORE_KEY, JSON.stringify(store));
  } catch (_) {}
}

function getDeleteToken(name) {
  try {
    const store = JSON.parse(localStorage.getItem(TOKEN_STORE_KEY) || '{}');
    return store[name] || null;
  } catch (_) {
    return null;
  }
}

export function hasDeleteToken(name) {
  return !!getDeleteToken(name);
}

export async function getLinks() {
  const res = await fetch(`${BASE_URL}/links`);
  if (!res.ok) {
    throw new Error(`Failed to fetch links: ${res.status}`);
  }
  return res.json();
}

export async function createLink(url, options = {}) {
  const body = { url };
  if (options.code) body.code = options.code;
  if (options.expiresIn) body.expires_in_hours = options.expiresIn;
  if (options.password) body.password = options.password;

  const res = await fetch(`${BASE_URL}/links`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    let message = `Error ${res.status}`;
    try {
      const data = await res.json();
      message = data.detail ?? message;
    } catch (_) {}
    throw new Error(message);
  }
  const data = await res.json();
  if (data.delete_token) {
    saveDeleteToken(data.name, data.delete_token);
  }
  return data;
}

export async function deleteLink(name) {
  const token = getDeleteToken(name);
  const url = token
    ? `${BASE_URL}/links/${encodeURIComponent(name)}?token=${encodeURIComponent(token)}`
    : `${BASE_URL}/links/${encodeURIComponent(name)}`;

  const res = await fetch(url, { method: 'DELETE' });
  if (!res.ok) {
    let message = `Error ${res.status}`;
    try {
      const data = await res.json();
      message = data.detail ?? message;
    } catch (_) {}
    throw new Error(message);
  }
}

export async function getAnalyticsSummary() {
  const res = await fetch(`${BASE_URL}/analytics`);
  if (!res.ok) {
    throw new Error(`Failed to fetch analytics: ${res.status}`);
  }
  return res.json();
}

export async function getRecentClicks() {
  const res = await fetch(`${BASE_URL}/analytics/recent`);
  if (!res.ok) {
    throw new Error(`Failed to fetch recent clicks: ${res.status}`);
  }
  return res.json();
}
