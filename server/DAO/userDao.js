import sqlite from "sqlite3"
import { User } from "../model.js" 
import crypto from "crypto"
import db from "../database/db.js";

export const getUser = (username, password) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE username = ?"

    db.get(sql, [username], (err, row) => {
      if (err) {
        console.error(`[DAO] Error fetching user ${username}:`, err)
        reject(err)
      } 
      else if (row === undefined) {
        console.log(`[AUTH] User '${username}' not found.`)
        resolve(false)
      } 
      else {
        crypto.scrypt(password, row.salt, 32, (err, hashedPassword) => {
          if (err) {
            reject(err)
          }
          
          const storedHash = Buffer.from(row.hash, "hex")
          
          if (!crypto.timingSafeEqual(storedHash, hashedPassword)) {
            console.log(`[AUTH] Invalid password for user '${username}'.`)
            resolve(false)
          } 
          else {
            console.log(`[AUTH] User '${username}' successfully authenticated.`)
            const user = new User(row.id, row.username, row.hash, row.salt, row.bestScore)
            resolve(user)
          }
        })
      }
    })
  })
} 