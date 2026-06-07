import { useEffect, useState } from "react"
import MapRenderer from "./Reusable/MapRenderer.jsx"
import {getGameSetup} from '../../src/api/game.js'

const Game = () => {
  const [gameData, setGameData] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getGameSetup()
      .then((data) => {
        console.log("Données des stations :", data.network.stations)
        setGameData(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [])

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-light" role="status"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-danger text-center mt-5">{error}</div>;
  }

  return (
    <div className="game-container p-4">
      <div className="game-hud mb-4 text-white text-center">
        <h2>Mission Active</h2>
        <p>
          Aller de <strong>{gameData.startStation.name}</strong> à <strong>{gameData.endStation.name}</strong>
        </p>
      </div>

      <MapRenderer 
        network={gameData.network} 
        startStation={gameData.startStation}
        endStation={gameData.endStation}
      />
    </div>
  )
}

export default Game