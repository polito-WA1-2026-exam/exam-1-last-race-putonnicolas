// imports
import 'dotenv/config';
import express from "express";
import { getMap } from "./DAO/mapDao.js";
import fs from "fs";
import { getLeaderboard, getUser, getUserById, getUserRank } from "./DAO/userDao.js";
import { isLoggedIn } from './database/db.js'
import passport from "passport";
import session from 'express-session'
import './strategies/localStrategy.js'

// init express
const app = express();
const port = 3001;

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000 * 60,
    secure: false
  }
}));

app.use(passport.initialize())
app.use(passport.authenticate("session"));

// Stores the map in the server's cache since it will be the same for every player.


console.log("[SERVER] Loading map & valids stations pairs...");
const map = await getMap();

const validPairsRaw = fs.readFileSync('./valid_pairs.json', 'utf-8');
const validPairs = JSON.parse(validPairsRaw);
console.log(`[SERVER] ${validPairs.length} stations pairs loaded in memory.`);

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

/* ROUTES */
// -----------------------------------
// ----- Authentification routes -----

// POST /api/sessions
// Purpose: Authenticate the user and create a session
app.post('/api/sessions', passport.authenticate("local"), (req, res) => {
  return res.status(201).json(req.user);
});

// GET /api/sessions/current
// Purpose: Check if the user is currently logged in
app.get('/api/sessions/current', isLoggedIn, (req, res) => {
    res.json(req.user)
});

// DELETE /api/sessions/current
// Purpose: Logout the current user and destroy the session
app.delete('/api/sessions/current', (req, res) => {
  req.logout(() => {
    res.end()
  })
});

// --------------------------------
// ----- Game business routes -----

// GET /api/game/setup
// Purpose: Retrieve the static network map and random start/end stations
app.get('/api/game/setup', isLoggedIn, (req, res) => {
  try {
    const randomIndex = Math.floor(Math.random() * validPairs.length);
    const selectedPair = validPairs[randomIndex];

    res.json({
      network: map,
      startStation: selectedPair.startStation,
      endStation: selectedPair.endStation
    });

  } catch (err) {
    console.error("[ROUTE] Error game setup :", err);
    res.status(500).json({ error: "Impossible to setup the game." });
  }
});

// POST /api/game/submit
// Purpose: Validate the route, apply events, calculate and save score
app.post('/api/game/submit', isLoggedIn, (req, res) => {

});

// ------------------------------
// ----- Leaderboard routes -----

// GET /api/leaderboard
// Purpose: Retrieve the general ranking
app.get('/api/leaderboard', isLoggedIn, async (req, res) => {
  try{
    const nbTop = parseInt(req.query.nbTop, 10) || 10;
    const leaderboard = await getLeaderboard(nbTop)
    const rank = await getUserRank(req.user.bestScore)

    res.json({
      leaderboard: leaderboard,
      currentUserRank: rank,
    })
  }
  catch (err) {
    console.error("[ROUTE] Leaderboard error :", err);
    res.status(500).json({
      error: "Unable to retrieve the leaderboard."
    });
  }
});