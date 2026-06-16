export async function getGameSetup(getMap) {
  const response = await fetch(`http://localhost:3001/api/game/setup?sendMap=${getMap}`, {
    credentials: "include"
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Impossible de récupérer la map et le setup du jeu.");
  }
}

export async function submitPath(routeArray) {
  const response = await fetch('http://localhost:3001/api/game/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: "include",
    body: JSON.stringify({ route: routeArray })
  });

  if (response.ok) {
    return await response.json();
  } else {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Impossible to validate the choosed path.");
  }
}