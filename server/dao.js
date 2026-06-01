import sqlite from "sqlite3";
import crypto from "crypto";

import { Station, Line, Segment } from "./model.js"

const db = new sqlite.Database("questions.sqlite", (err) => {
  if (err) throw err;
});


// ----- Utils ------
const fetchAll = (query) => {
  return new Promise((resolve, reject) => {
    db.all(query, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// ----- MAP ------
export const getMap = async () => {
  try {
    const stationsRows = await fetchAll("SELECT * FROM stations");
    const linesRows = await fetchAll("SELECT * FROM lines");
    const segmentsRows = await fetchAll("SELECT * FROM segments");

    const stations = stationsRows.map((s) => new Station(s.id, s.name));
    const lines = linesRows.map((l) => new Line(l.id, l.name, l.color));
    const segments = segmentsRows.map((s) => new Segment(s.id, s.station1Id, s.station2Id, s.lineId));

    return {
      lines: lines,
      stations: stations,
      segments: segments,
    };
  } catch (err) {
    throw err; 
  }
};