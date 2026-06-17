import 'dotenv/config';
import crypto from "crypto";
import db from "../database/db.js"; 

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hashedPassword = crypto.scryptSync(password, salt, 32).toString('hex');
  return { salt, hashedPassword };
}

export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    // try to see if the database is empty or not
    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='users'", (err, row) => {
      if (err) {
        console.error("[DB] Error checking database state:", err);
        return reject(err);
      }

      if (row) {
        console.log("[DB] Database already initialized. Skipping creation to keep your scores safe.");
        return resolve(); 
      }


      // if empty, then seed it.
      db.serialize(() => {
        console.log("[DB] No existing database found. Creating new tables...");
                
        db.run(`CREATE TABLE users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE NOT NULL,
          hash TEXT NOT NULL,
          salt TEXT NOT NULL,
          bestScore INTEGER DEFAULT 0
        )`);

        db.run(`CREATE TABLE events (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          description TEXT NOT NULL,
          effect INTEGER NOT NULL
        )`);

        db.run(`CREATE TABLE lines (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          color TEXT NOT NULL
        )`);

        db.run(`CREATE TABLE stations (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          x INTEGER NOT NULL,
          y INTEGER NOT NULL
        )`);

        db.run(`CREATE TABLE segments (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          station1Id INTEGER NOT NULL,
          station2Id INTEGER NOT NULL,
          lineId INTEGER NOT NULL,
          FOREIGN KEY(station1Id) REFERENCES stations(id) ON DELETE CASCADE,
          FOREIGN KEY(station2Id) REFERENCES stations(id) ON DELETE CASCADE,
          FOREIGN KEY(lineId) REFERENCES lines(id) ON DELETE CASCADE
        )`);

        console.log("[DB] Database seeding...");

        // --- USERS ---
        const insertUser = db.prepare(`INSERT INTO users (username, hash, salt, bestScore) VALUES (?, ?, ?, ?)`);

        const marc = hashPassword('iLovecats2' + process.env.PEPPER);
        insertUser.run('Marc', marc.hashedPassword, marc.salt, 24); 

        const raphael = hashPassword('paris' + process.env.PEPPER);
        insertUser.run('Raphael', raphael.hashedPassword, raphael.salt, 15); 

        const nicolo = hashPassword('1l#jf3]' + process.env.PEPPER);
        insertUser.run('Nicolo', nicolo.hashedPassword, nicolo.salt, 23); 

        const pwdBastien = hashPassword('test1234' + process.env.PEPPER);
        insertUser.run('Bastien', pwdBastien.hashedPassword, pwdBastien.salt, 0); 

        const pwdLucie = hashPassword('test1234' + process.env.PEPPER);
        insertUser.run('Lucie', pwdLucie.hashedPassword, pwdLucie.salt, 0);

        const pwdSophie = hashPassword('test1234' + process.env.PEPPER);
        insertUser.run('Sophie', pwdSophie.hashedPassword, pwdSophie.salt, 0);

        const pwdLouis = hashPassword('test1234' + process.env.PEPPER);
        insertUser.run('Louis', pwdLouis.hashedPassword, pwdLouis.salt, 12);

        const pwdHugo = hashPassword('test1234' + process.env.PEPPER);
        insertUser.run('Hugo', pwdHugo.hashedPassword, pwdHugo.salt, 5);

        insertUser.finalize();

        // --- LINES ---
        const insertLine = db.prepare(`INSERT INTO lines (name, color) VALUES (?, ?)`);
        const lines = [
          ['A', '#E2001A'],
          ['B', '#005CA9'],
          ['C', '#F29400'],
          ['D', '#00953A']
        ];
        lines.forEach(l => insertLine.run(l[0], l[1]));
        insertLine.finalize();

        // --- STATIONS ---
        const insertStation = db.prepare(`INSERT INTO stations (name, x, y) VALUES (?, ?, ?)`);
        const stations = [
            { name: 'Charpennes', x: 550, y: 180 },
            { name: 'République', x: 650, y: 160 },
            { name: 'Hôtel de Ville', x: 420, y: 220 },
            { name: 'Bellecour', x: 400, y: 350 },
            { name: 'Perrache', x: 380, y: 480 },
            { name: 'Part-Dieu', x: 580, y: 300 },
            { name: 'Saxe-Gambetta', x: 550, y: 400 },
            { name: 'Jean Macé', x: 550, y: 500 },
            { name: 'Croix-Rousse', x: 400, y: 120 },
            { name: 'Cuire', x: 380, y: 50 },
            { name: 'Vieux Lyon', x: 300, y: 350 },
            { name: 'Gorge de Loup', x: 150, y: 250 }
        ]
        stations.forEach(s => insertStation.run(s.name, s.x, s.y));
        insertStation.finalize();

        // --- SEGMENTS ---
        const insertSegment = db.prepare(`INSERT INTO segments (station1Id, station2Id, lineId) VALUES (?, ?, ?)`);
        const segments = [
          [5, 4, 1], [4, 3, 1], [3, 1, 1], [1, 2, 1],
          [1, 6, 2], [6, 7, 2], [7, 8, 2],
          [3, 9, 3], [9, 10, 3],
          [12, 11, 4], [11, 4, 4], [4, 7, 4]
        ];
        segments.forEach(seg => insertSegment.run(seg[0], seg[1], seg[2]));
        insertSegment.finalize();

        // --- EVENTS ---
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
          if (err) {
            console.error("[DB] Error during final seeding:", err);
            reject(err);
          } else {
            console.log("[DB] Events inserted. Database initialization complete.");
            resolve();
          }
        });
      });
    });
  });
};