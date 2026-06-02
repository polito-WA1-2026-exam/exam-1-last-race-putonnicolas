// imports
import 'dotenv/config';
import express from "express";
import { getMap } from "./DAO/mapDao.js";
import { getUser, getUserById } from "./DAO/userDao.js";
import passport from "passport";
import session from 'express-session'
import './strategies/localStrategy.js'

// init express
const app = new express();
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
app.use(passport.session())

// Stores the map in the server's cache since it will be the same for every player.
const map = await getMap();

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

getUser("Marc", "iLovecats2").then((user) => console.log(user))



/* ROUTES D'AUTHENTIFICATION */

// 1. LOGIN
// passport.authenticate va automatiquement appeler ta LocalStrategy
app.post('/api/sessions', passport.authenticate('local'), (req, res) => {
  // Si on arrive ici, c'est que le login a réussi ! 
  // Passport a automatiquement attaché les infos du joueur dans 'req.user'
  res.json({ id: req.user.id, username: req.user.username });
});

// 2. VÉRIFIER QUI EST CONNECTÉ
app.get('/api/sessions/current', (req, res) => {
  // req.isAuthenticated() est une fonction magique ajoutée par Passport
  if (req.isAuthenticated()) {
    res.json({ id: req.user.id, username: req.user.username });
  } else {
    res.status(401).json({ error: "Non authentifié" });
  }
});

// 3. LOGOUT
app.delete('/api/sessions/current', (req, res) => {
  // req.logout est aussi fourni par Passport
  req.logout((err) => {
    if (err) return res.status(500).json({ error: "Erreur lors de la déconnexion" });
    res.status(200).json({ message: "Déconnexion réussie" });
  });
});