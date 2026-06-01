import sqlite from "sqlite3";
import crypto from "crypto";

import { Station, Line, Segment } from "./model.js"

const db = new sqlite.Database("database.sqlite", (err) => {
  if (err) {
    console.error("[DAO] Failed to connect to the database:", err);
    throw err;
  }
  console.log("[DAO] Connected to the database.");
});


// ----- Utils ------
const fetchAll = (query) => {
  return new Promise((resolve, reject) => {
    db.all(query, [], (err, rows) => {
      if (err) 
      {
        console.error(`[DAO] Error executing query: ${query}`);
        reject(err);
      }
      else resolve(rows);
    });
  });
};

// ----- MAP ------
export const getMap = async () => {
  console.log("[DAO] Fetching network map data...");
  try {
    const stationsRows = await fetchAll("SELECT * FROM stations");
    const linesRows = await fetchAll("SELECT * FROM lines");
    const segmentsRows = await fetchAll("SELECT * FROM segments");

    const stations = stationsRows.map((s) => new Station(s.id, s.name));
    const lines = linesRows.map((l) => new Line(l.id, l.name, l.color));
    const segments = segmentsRows.map((s) => new Segment(s.id, s.station1Id, s.station2Id, s.lineId));

    console.log(`[DAO] Map successfully retrieved: ${stations.length} stations, ${lines.length} lines, ${segments.length} segments.`);
    
    return {
      lines: lines,
      stations: stations,
      segments: segments,
    };
  } catch (err) {
    console.error("[DAO] Error retrieving map data:", err);
    throw err; 
  }
};