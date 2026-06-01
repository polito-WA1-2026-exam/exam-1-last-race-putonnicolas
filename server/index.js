// imports
import express from "express";

// init express
const app = new express();
const port = 3001;

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

/* ROUTES */
// -----------------------------------
// ----- Authentification routes -----

// POST /api/sessions
// Purpose: Authenticate the user and create a session
app.post('/api/sessions', (req, res) => {
  
});

// GET /api/sessions/current
// Purpose: Check if the user is currently logged in
app.get('/api/sessions/current', (req, res) => {

});

// DELETE /api/sessions/current
// Purpose: Logout the current user and destroy the session
app.delete('/api/sessions/current', (req, res) => {

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