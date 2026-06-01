// imports
import express from "express";
import { getMap } from "./dao.js";

// init express
const app = new express();
const port = 3001;

// Stores the map in the server's cache since it will be the same for every player.
const map = await getMap();

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});