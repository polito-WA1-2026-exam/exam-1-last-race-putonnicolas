import db from "../database/db.js";

export const getAllEvents = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM events", [], function(err, rows) {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

