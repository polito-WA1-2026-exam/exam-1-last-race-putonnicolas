// imports
import express from "express";
import { getMap } from "./DAO/mapDao.js";
import { getUser } from "./DAO/userDao.js";
import passport from "passport";
import session from 'express-session'

// init express
const app = new express();
const port = 3001;

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000 * 60
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