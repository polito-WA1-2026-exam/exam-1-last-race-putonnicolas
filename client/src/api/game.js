export async function getGameSetup() {
  const response = await fetch('http://localhost:3001/api/game/setup', {
    credentials: "include"
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Impossible de récupérer la map et le setup du jeu.");
  }
}