import 'dotenv/config'
import sqlite from "sqlite3"
import { User } from "../model.js" 
import crypto from "crypto"
import db from "../database/db.js"

export const getUser = (username, password) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE username = ?"

    db.get(sql, [username], function(err, row) {
      if (err) {
        console.error(`[DAO] Error fetching user ${username}:`, err)
        reject(err)
      } 
      else if (row === undefined) {
        console.log(`[AUTH] User '${username}' not found.`)
        resolve(false)
      } 
      else {
        const pepperedPassword = password + process.env.PEPPER
        crypto.scrypt(pepperedPassword, row.salt, 32, (err, hashedPassword) => {
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

export const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE id = ?"

    db.get(sql, [id], function(err, row) {
      if (err) {
        console.error(`[DAO] Error fetching user with id ${id}:`, err)
        reject(err)
      } 
      else if (row === undefined) {
        console.log(`[AUTH] User with id '${id}' not found.`)
        resolve(false)
      } 
      else {
            console.log(`[AUTH] User '${id}' successfully retrieved.`)
            const user = new User(row.id, row.username, row.hash, row.salt, row.bestScore)
            resolve(user)
        }
      })
  })
} 


export const getLeaderboard = (nbTop = 10) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT username, bestScore FROM users ORDER BY bestScore DESC LIMIT ?"

    db.all(sql, [nbTop], function(err, rows) {
      if (err) {
        console.error(`[DAO] Error fetching leaderboard`, err)
        reject(err)
      }
      else {
        resolve(rows)
      }
    })
  })
}

export const getUserRank = (userScore) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT COUNT(*) + 1 AS userRank FROM users WHERE bestScore > ?"

    db.get(sql, [userScore], function(err, row) {
      if (err) {
        console.error(`[DAO] Error fetching user rank`, err)
        reject(err)
      } 
      else {
        resolve(row.userRank)
      }
    })
  })
}

export const updateBestScore = (userId, newScore) => {
  return new Promise((resolve, reject) => {
    let sql = "UPDATE users SET bestScore = ? WHERE id = ?"
    db.run(sql, [newScore, userId], function(err) {
      if (err)
        reject(err);
      else
        resolve(userId);
    });
  });
}