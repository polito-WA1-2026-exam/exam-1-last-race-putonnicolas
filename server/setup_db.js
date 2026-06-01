import sqlite3 from "sqlite3";
import crypto from "crypto";

const sqlite = sqlite3.verbose();
const DATABASE = "./database.sqlite";

// Setup --------------------------------------------------------
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hashedPassword = crypto.scryptSync(password, salt, 32).toString('hex');
  return { salt, hashedPassword };
}

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
    name TEXT NOT NULL,
    color TEXT NOT NULL
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

  // Seeding --------------------------------------------------------
  // Users
  console.log("[DB] Database seeding...");

  const insertUser = db.prepare(`INSERT INTO users (username, hash, salt, bestScore) VALUES (?, ?, ?, ?)`);

  const marc = hashPassword('iLovecats2');
  insertUser.run('Marc', marc.hashedPassword, marc.salt, 24); 

  const raphael = hashPassword('paris');
  insertUser.run('Raphaël', raphael.hashedPassword, raphael.salt, 15); 

  const nicolo = hashPassword('1l#jf3]');
  insertUser.run('Nicolo', nicolo.hashedPassword, nicolo.salt, 0); 

  insertUser.finalize((err) => {
    if (!err)
      console.log("[DB] Users inserted.")
    else
      console.log("[DB] Error while inserting the users.")
  });

  // Metro lines
  const insertLine = db.prepare(`INSERT INTO lines (name, color) VALUES (?, ?)`);
  const lines = [
    ['A', '#E2001A'],
    ['B', '#005CA9'],
    ['C', '#F29400'],
    ['D', '#00953A']
  ];
  lines.forEach(l => insertLine.run(l[0], l[1]));
  insertLine.finalize((err) => {
    if (!err)
      console.log("[DB] Lines inserted.")
    else
      console.log("[DB] Error while inserting the Lines.")
  });

  // Stations
  const insertStation = db.prepare(`INSERT INTO stations (name) VALUES (?)`);
  const stations = [
    'Charpennes',         // 1
    'République',         // 2
    'Hôtel de Ville',     // 3
    'Bellecour',          // 4
    'Perrache',           // 5
    'Part-Dieu',          // 6
    'Saxe-Gambetta',      // 7
    'Jean Macé',          // 8
    'Croix-Rousse',       // 9
    'Cuire',              // 10
    'Vieux Lyon',         // 11
    'Gorge de Loup'       // 12
  ];

  stations.forEach(s => insertStation.run(s));
  insertStation.finalize((err) => {
    if (!err)
      console.log("[DB] Stations inserted.")
    else
      console.log("[DB] Error while inserting the Stations.")
  })

  // Segments
  const insertSegment = db.prepare(`INSERT INTO segments (station1Id, station2Id, lineId) VALUES (?, ?, ?)`);
  const segments = [
    // interchange stations are shown in capitalize : BELLECOUR, HOTEL DE VILLE, CHARPENNES, SAXE-GAMBETTA

    // Line A (1) : Perrache(5) <> BELLECOUR(4) <> HOTEL DE VILLE(3) <> CHARPENNES(1) <> République(2)
    [5, 4, 1], [4, 3, 1], [3, 1, 1], [1, 2, 1],
    // Line B (2) : CHARPENNES(1) <> Part-Dieu(6) <> SAXE-GAMBETTA(7) <> Jean Macé(8)
    [1, 6, 2], [6, 7, 2], [7, 8, 2],
    // Line C (3) : HOTEL DE VILLE(3) <> Croix-Rousse(9) <> Cuire(10)
    [3, 9, 3], [9, 10, 3],
    // Line D (4) : Gorge de Loup(12) <> Vieux Lyon(11) <> BELLECOUR(4) <> SAXE-GAMBETTA(7)
    [12, 11, 4], [11, 4, 4], [4, 7, 4]
  ];

  segments.forEach(seg => insertSegment.run(seg[0], seg[1], seg[2]));
  insertSegment.finalize((err) => {
    if (!err)
      console.log("[DB] Segments inserted.")
    else
      console.log("[DB] Error while inserting the Segments.")
  })

  // events
  const insertEvent = db.prepare(`INSERT INTO events (description, effect) VALUES (?, ?)`);
  const events = [
    ["Friendly TCL inspector, you save a ticket.", 2],
    ["Electrical fault on your metro, you take a detour.", -3],
    ["You find some coins on your seat.", 2],
    ["Massive crowd on the escalators, you drop a coin.", -1],
    ["You help a lost guy, he gives you a tip.", 3],
    ["You forgot to validate your TCL card, inspector fines you!", -4],
    ["Found a comfortable seat immediately during rush hour!", 1],
    ["Someone plays a beautiful violin cover in the metro, you tip them.", -1]
  ];
  events.forEach(e => insertEvent.run(e[0], e[1]));
  insertEvent.finalize((err) => {
    if (!err)
      console.log("[DB] Events inserted.")
    else
      console.log("[DB] Error while inserting the Events.")
  })
});

// Close --------------------------------------------------------
db.close((err) => {
  if (err) throw err;
  console.log("[DB] Database initialized and connection closed.");
});