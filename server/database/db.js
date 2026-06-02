import sqlite from "sqlite3";

const db = new sqlite.Database("./database.sqlite", (err) => {
  if (err) {
    console.error("[DB] Failed to connect:", err);
    throw err;
  }
  console.log("[DB] Database connection established.");
});

export const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({error: "Not authorized"});
}


process.on('SIGINT', () => {
  db.close(() => {
    console.log('[DB] Connection closed.');
    process.exit(0);
  });
});

export default db;