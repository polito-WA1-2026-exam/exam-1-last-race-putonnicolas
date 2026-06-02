import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import { getUser, getUserById } from "../DAO/userDao.js"

passport.use(new LocalStrategy(
  async (username, password, done) => { 
    try {
      const user = await getUser(username, password)

      if (!user) {
        console.log(`[AUTH] Failed login attempt for user: ${username}`)
        return done(null, false, { message: "Invalid username or password." })
      }

      console.log(`[AUTH] LocalStrategy successful for user: ${username}`)
      return done(null, user)

    } catch (err) {
      console.error("[AUTH] Server error during authentication:", err)
      return done(err)
    }
  }
))

passport.serializeUser((user, done) => {
  done(null, user.id) 
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserById(id)
    done(null, user)
  } catch (err) {
    done(err, null)
  }
})