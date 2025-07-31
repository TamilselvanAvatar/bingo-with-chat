# 🎯 Bingo Game with Chat

A real-time **Bingo Game** with built-in **Chat** functionality — built using **React (Vite)** and **WebSocket**.

---

## 🚀 Features

* 🎮 Play Bingo interactively in real time
* 💬 Integrated live chat between players
* ⚡ Fast and lightweight architecture using Vite and WebSocket
* 🔤 Simple and intuitive UI for learning or demo purposes

---

## 🛠️ Getting Started

### 🛆 Dependencies

* [React](https://reactjs.org/)
* [Vite](https://vitejs.dev/)
* [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
* [Node.js](https://nodejs.org/) (for the WebSocket server)

---

## ⚙️ Project Initialization (React + Vite + WebSocket)

You can start from scratch or add React to an existing folder:

### 📁 1. React App Setup in Existing Folder

**Option A: Manual Setup**

```bash
npm init -y
npm install react react-dom
npm install -D vite @vitejs/plugin-react
```

**Option B: Vite Template Setup**

```bash
npm create vite@latest client -- --template react
```

If using an existing folder:

```bash
cd your-folder
npm create vite@latest . -- --template react
```
---

## 🗂️ Folder Structure (Minimal Example)

```
bingo-chat/
├── client/             # React app (Vite)
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── main.jsx
│       └── App.jsx
├── server/             # WebSocket server
│   ├── package.json
│   └── server.js
├── README.md
```

> 💡 **Note:**  
> You can structure your project with both `client` (React app) and `server` (WebSocket server) inside the same root folder, and use a **shared `package.json`** at the root to manage scripts and dependencies more easily.

---

## 🔧 Minimal Required Files

### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Bingo Chat</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

### `vite.config.js`

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
```

### `src/main.jsx`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### `src/App.jsx`

```jsx
import React from 'react';

function App() {
  return <h1>Bingo Chat App</h1>;
}

export default App;
```

### `package.json` Scripts

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

---

## ▶️ How to Run

### React App

```bash
cd client
npm install
npm run dev
```

### WebSocket Server

```bash
cd server
npm install
node server.js
```

---

## 🔀 Git Setup

Assuming you’ve already created a GitHub repository:

```bash
cd your-project-folder
git init
git branch -m master main       # Optional

# Add and commit
git add .
git commit -m "Initial commit"

# Link and push
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

To sync:

```bash
git pull origin main   # or git push origin main
```

> 💡 **Note:**  
> After the first push using `git push -u origin main`, Git links your local `main` branch to the remote `main` on `origin`.  
> From then on, you can simply use `git push` or `git pull` without specifying branch and remote names.


---

## 🌐 Optional (VS Code Remote Dev): View App on Internet

If using **GitHub Codespaces**, **Remote SSH**, or **VS Code Tunnels**:

### 🔄 Forward Ports

* 🔵 React App: `5173`
* 🟢 WebSocket Server: `3001`

Make sure ports are set to **Public** or **Shared** to access the app externally via browser.

---

## 🐞 Debug WebSocket Server in VS Code (Quick Steps)

1. **Open Project in VS Code** (with `server/` folder inside).
2. **Go to Run & Debug** (`Ctrl+Shift+D`) → Create `launch.json`.
3. **Use this config:**
   ```json
   {
     "type": "node",
     "request": "launch",
     "name": "Debug WebSocket Server",
     "program": "${workspaceFolder}/server/server.js"
   }
   ```
4. Set breakpoints in server.js if needed.
5. Run Debug with F5 (`ensure server isn’t running in terminal`).

---

Happy Coding! 🎉
