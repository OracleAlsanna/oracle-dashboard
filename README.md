# Oracle — URL Shortener Dashboard

![React](https://img.shields.io/badge/react-18+-61DAFB?style=flat-square)
![Vite](https://img.shields.io/badge/vite-4+-646CFF?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)
![Part](https://img.shields.io/badge/series-3%20of%205-purple?style=flat-square)

Web dashboard for the Oracle URL shortener. Part 3 of a 5-part series.

This is a single-page React application that communicates with the Project 2
FastAPI backend. It lets you create, view, and delete short links entirely
from a browser interface.

---

## Series Roadmap

| Part | Project | Description |
|------|---------|-------------|
| 1 | oracle-url-shortener | CLI tool — create, get, list, delete short links from the terminal |
| 2 | oracle-rest-api | REST API — FastAPI backend, SQLite persistence, redirect logic |
| **3** | **oracle-dashboard** | **Web dashboard — React frontend for managing links** |
| 4 | oracle-analytics | Analytics — click tracking with timestamp, referrer, and device data |
| 5 | oracle-cache | Cache & rate limiter — Redis caching and rate limiting for scale |

---

## Prerequisites

**Project 2 (oracle-api) must be running before starting the dashboard.**

The dashboard has no backend of its own. Every action — listing links,
creating links, deleting links — talks directly to the Project 2 API at
`http://localhost:8000`. If that server is not running, the dashboard will
show an error and no data will load.

---

## Setup

### 1. Start the Project 2 API

From the `oracle-api` directory (your Project 2 folder):

```bash
uvicorn main:app --reload
```

Confirm it is running by visiting `http://localhost:8000/docs` in your browser.

### 2. Install dashboard dependencies

From this directory (`oracle-dashboard`):

```bash
npm install
```

### 3. Start the dashboard

```bash
npm run dev
```

The dashboard will be available at `http://localhost:5173`.

---

## Running Both Together

Open two terminal windows:

**Terminal 1 — API**
```bash
cd path/to/oracle-api
uvicorn main:app --reload
```

**Terminal 2 — Dashboard**
```bash
cd path/to/oracle-dashboard
npm run dev
```

Then open `http://localhost:5173`.

---

## Features

- **Create links** — paste any URL and click Shorten to generate a 4-character alphanumeric short link
- **Custom codes** — optionally choose your own code instead of a random one, via the "options" toggle on the form
- **Link expiration** — optionally set a link to expire after a number of hours
- **Password protection** — optionally require a password before a link redirects
- **View links** — table of all active links with name, original URL, creation date, and badges for protected/expiring links
- **QR codes** — generated entirely client-side (no third-party API call, no leaking destination URLs)
- **Analytics** — a chart of top links by click count and a feed of recent clicks, pulled live from the backend
- **Delete links** — inline confirmation on each row before deletion; no modals. Only the browser that created a link can delete it (see Security)
- **Toast notifications** — success and error feedback that auto-dismisses after 3 seconds

---

## Project Structure

```
oracle-dashboard/
  index.html              HTML entry point
  vite.config.js          Vite configuration
  package.json
  src/
    main.jsx              React entry point
    App.jsx               Root component and layout
    App.css
    index.css             Global styles and CSS variables
    api.js                All fetch calls to the backend
    components/
      BottomBar.jsx       Bottom navigation bar with popout panels
      BottomBar.css
      LinkForm.jsx        URL input and submit button
      LinkForm.css
      LinkTable.jsx       Table of all links with QR code column
      LinkTable.css
      LinkRow.jsx         Single row with inline delete confirmation
      LinkRow.css
      Panel.jsx           Reusable sliding popout panel
      Panel.css
      QRModal.jsx         QR code modal overlay
      QRModal.css
      Sidebar.jsx         Side navigation
      Sidebar.css
      Starfield.jsx       Animated star background
      Starfield.css
      Toast.jsx           Success/error notifications
      Toast.css
```

---

## Configuration

The API base URL is set in `src/api.js`:

```js
const BASE_URL = 'http://localhost:8000';
```

Change this if your Project 2 API runs on a different host or port.

---

## Build for Production

```bash
npm run build
```

Output is written to `dist/`. Serve it with any static file server. Note that
the dashboard still needs the API to be reachable at the configured `BASE_URL`.
