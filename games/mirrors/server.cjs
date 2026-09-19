var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_vite = require("vite");
var DB_FILE = import_path.default.join(process.cwd(), "data", "db.json");
function loadDb() {
  try {
    if (import_fs.default.existsSync(DB_FILE)) {
      const data = import_fs.default.readFileSync(DB_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading db.json:", err);
  }
  return { users: [], scores: [] };
}
function saveDb(db) {
  try {
    const dir = import_path.default.dirname(DB_FILE);
    if (!import_fs.default.existsSync(dir)) {
      import_fs.default.mkdirSync(dir, { recursive: true });
    }
    import_fs.default.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing db.json:", err);
  }
}
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json());
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
  });
  app.post("/api/auth/signup", (req, res) => {
    const { name, email } = req.body;
    if (!name || !email || typeof name !== "string" || typeof email !== "string") {
      res.status(400).json({ error: "Name and email are required to register." });
      return;
    }
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    if (!cleanEmail.includes("@") || cleanEmail.length < 5) {
      res.status(400).json({ error: "Please provide a valid email address." });
      return;
    }
    const db = loadDb();
    let existingUser = db.users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existingUser) {
      existingUser.name = cleanName;
      saveDb(db);
      res.json({ user: existingUser, message: "Welcome back!" });
      return;
    }
    const newUser = {
      id: "u-" + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      name: cleanName,
      email: cleanEmail,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    db.users.push(newUser);
    saveDb(db);
    res.json({ user: newUser, message: "Registration successful!" });
  });
  app.get("/api/auth/me", (req, res) => {
    const userId = req.query.userId;
    if (!userId) {
      res.status(400).json({ error: "userId parameter is required." });
      return;
    }
    const db = loadDb();
    const user = db.users.find((u) => u.id === userId);
    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }
    res.json({ user });
  });
  app.get("/api/daily-challenge", (_req, res) => {
    const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    res.json({
      date: today,
      challengeId: `daily-${today}`,
      name: `Daily Challenge \u2014 ${today}`,
      rules: "Illuminate all optical sensors in the minimum time. One global puzzle per day."
    });
  });
  app.get("/api/leaderboard", (req, res) => {
    const levelId = req.query.levelId || `daily-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}`;
    const limit = parseInt(req.query.limit || "50", 10);
    const db = loadDb();
    const filtered = db.scores.filter((s) => s.levelId === levelId).sort((a, b) => {
      if (a.timeMs !== b.timeMs) return a.timeMs - b.timeMs;
      return a.moves - b.moves;
    });
    const ranked = filtered.slice(0, limit).map((entry, index) => ({
      ...entry,
      rank: index + 1
    }));
    res.json({
      levelId,
      totalEntries: filtered.length,
      leaderboard: ranked
    });
  });
  app.post("/api/scores/submit", (req, res) => {
    const {
      levelId,
      levelName,
      userId,
      userName,
      userEmail,
      timeMs,
      moves,
      itemsUsed
    } = req.body;
    if (!levelId || typeof timeMs !== "number" || typeof moves !== "number") {
      res.status(400).json({ error: "Invalid submission data." });
      return;
    }
    const db = loadDb();
    let user = db.users.find((u) => u.id === userId);
    if (!user && userEmail && userName) {
      user = {
        id: "u-" + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
        name: userName.trim(),
        email: userEmail.trim().toLowerCase(),
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      db.users.push(user);
    }
    if (!user) {
      res.status(401).json({
        error: "Sign up is required to post scores to the public leaderboard. You can play anonymously or sign up with your name and email.",
        requiresSignup: true
      });
      return;
    }
    const existingScoreIndex = db.scores.findIndex(
      (s) => s.levelId === levelId && s.userId === user.id
    );
    let isNewBest = false;
    const newEntry = {
      id: "s-" + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      levelId,
      levelName: levelName || levelId,
      userId: user.id,
      userName: user.name,
      timeMs,
      moves,
      itemsUsed: itemsUsed || 0,
      date: (/* @__PURE__ */ new Date()).toISOString()
    };
    if (existingScoreIndex >= 0) {
      const existing = db.scores[existingScoreIndex];
      if (timeMs < existing.timeMs) {
        db.scores[existingScoreIndex] = newEntry;
        isNewBest = true;
      }
    } else {
      db.scores.push(newEntry);
      isNewBest = true;
    }
    saveDb(db);
    const ranked = db.scores.filter((s) => s.levelId === levelId).sort((a, b) => a.timeMs - b.timeMs);
    const userRank = ranked.findIndex((s) => s.userId === user.id) + 1;
    res.json({
      success: true,
      isNewBest,
      rank: userRank,
      totalEntries: ranked.length,
      entry: newEntry
    });
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Laser Mirrors Server running on http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
