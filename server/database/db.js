import sqlite from "sqlite3";

const db = new sqlite.Database("./database.sqlite", (err) => {
  if (err) {
    console.error("[DB] Failed to connect:", err);
    throw err;
  }
  console.log("[DB] Database connection established.");
});


process.on('SIGINT', () => {
  db.close(() => {
    console.log('[DB] Connection closed.');
    process.exit(0);
  });
});

export default db;