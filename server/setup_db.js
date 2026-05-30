import sqlite3 from "sqlite3";

const sqlite = sqlite3.verbose();
const DATABASE = "./database.sqlite";

const db = new sqlite.Database(DATABASE, (err) => {
  if (err) throw err;
  console.log("[DB] Connected to the database.");
});

db.serialize(() => {
  console.log("[DB] Dropping old tables...");
  
  db.run(`DROP TABLE IF EXISTS segments`);
  db.run(`DROP TABLE IF EXISTS stations`);
  db.run(`DROP TABLE IF EXISTS lines`);
  db.run(`DROP TABLE IF EXISTS events`);
  db.run(`DROP TABLE IF EXISTS users`);

  console.log("[DB] Creating new tables...");

  db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    hash TEXT NOT NULL,
    salt TEXT NOT NULL,
    bestScore INTEGER DEFAULT 0
  )`, (err) => { if(!err) console.log("[DB] Table users created."); });

  db.run(`CREATE TABLE events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    effect INTEGER NOT NULL
  )`, (err) => { if(!err) console.log("[DB] Table events created."); });

  db.run(`CREATE TABLE lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )`, (err) => { if(!err) console.log("[DB] Table lines created."); });

  db.run(`CREATE TABLE stations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )`, (err) => { if(!err) console.log("[DB] Table stations created."); });

  db.run(`CREATE TABLE segments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    station1Id INTEGER NOT NULL,
    station2Id INTEGER NOT NULL,
    lineId INTEGER NOT NULL,
    FOREIGN KEY(station1Id) REFERENCES stations(id) ON DELETE CASCADE,
    FOREIGN KEY(station2Id) REFERENCES stations(id) ON DELETE CASCADE,
    FOREIGN KEY(lineId) REFERENCES lines(id) ON DELETE CASCADE
  )`, (err) => { if(!err) console.log("[DB] Table segments created."); });

});

db.close((err) => {
  if (err) throw err;
  console.log("[DB] Database initialized and connection closed.");
});