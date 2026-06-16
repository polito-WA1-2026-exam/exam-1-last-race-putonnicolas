export async function getLeaderboard() {
  const response = await fetch(`http://localhost:3001/api/leaderboard`, {
    credentials: "include"
  });
  
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Unable to retrieve leaderboard and user rank.");
  }
}