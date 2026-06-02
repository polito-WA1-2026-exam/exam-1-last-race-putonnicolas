// imports
import 'dotenv/config';
import express from "express";
import { getMap } from "./DAO/mapDao.js";
import { getUser, getUserById } from "./DAO/userDao.js";
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
const map = await getMap();

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
app.get('/api/sessions/current', (req, res) => {
  if(req.isAuthenticated()) {
    res.json(req.user)
  }
  else {
    res.status(401).json({error: "Not authentificated"})
  }
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
app.get('/api/game/setup', (req, res) => {

});

// POST /api/game/submit
// Purpose: Validate the route, apply events, calculate and save score
app.post('/api/game/submit', (req, res) => {

});

// ------------------------------
// ----- Leaderboard routes -----

// GET /api/leaderboard
// Purpose: Retrieve the general ranking
app.get('/api/leaderboard', (req, res) => {

});