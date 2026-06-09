import sqlite from "sqlite3";
import crypto from "crypto";
import db from "../database/db.js";
import { Station, Line, Segment } from "../model.js"

// ----- Utils ------
const fetchAll = (query) => {
  return new Promise((resolve, reject) => {
    db.all(query, [], function(err, rows) {
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

    const stations = stationsRows.map((s) => new Station(s.id, s.name, s.x, s.y));
    const lines = linesRows.map((l) => new Line(l.id, l.name, l.color));
    
    const segments = [];
    
    segmentsRows.forEach((s) => {
      segments.push(new Segment(s.id, s.station1Id, s.station2Id, s.lineId));
      segments.push(new Segment(-s.id, s.station2Id, s.station1Id, s.lineId));
    });

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