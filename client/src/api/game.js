import { BASE_URL } from './client.js'

export async function getGameSetup(getMap) {
  const response = await fetch(`${BASE_URL}/api/game/setup?sendMap=${getMap}`, {
    credentials: "include"
  })

  if (response.ok) {
    return await response.json()
  }

  throw new Error("Unable to retrieve the game map and setup.")
}

export async function submitPath(routeArray) {
  const response = await fetch(`${BASE_URL}/api/game/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: "include",
    body: JSON.stringify({ route: routeArray })
  })

  if (response.ok) {
    return await response.json()
  }

  const errorData = await response.json().catch(() => ({}))
  throw new Error(errorData.error || "Unable to validate the chosen path.")
}
