import { BASE_URL } from './client.js'

export async function getLeaderboard() {
  const response = await fetch(`${BASE_URL}/api/leaderboard`, {
    credentials: "include"
  })

  if (response.ok) {
    return await response.json()
  } else {
    throw new Error("Unable to retrieve leaderboard and user rank.")
  }
}
