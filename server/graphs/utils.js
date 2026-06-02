import fs from 'fs';
import { getMap } from '../DAO/mapDao.js';

// BFS algorithm to find shortest distance between two stations
export const getDistance = (map, startId, endId) => {
  if (startId === endId) return 0

  const queue = [{ id: startId, distance: 0 }]
  const visited = new Set([startId])

  while (queue.length > 0) {
    const current = queue.shift()

    // all the segments arround this station
    const connectedSegments = map.segments.filter(
      seg => seg.station1Id === current.id || seg.station2Id === current.id
    )

    // all the neighbor stations ids
    const neighbors = connectedSegments.map(seg => 
      seg.station1Id === current.id ? seg.station2Id : seg.station1Id
    )

    for (let neighborId of neighbors) {
      if (neighborId === endId) {
        return current.distance + 1
      }
      
      if (!visited.has(neighborId)) {
        visited.add(neighborId)
        queue.push({ id: neighborId, distance: current.distance + 1 })
      }
    }
  }

  // Stations unreachable
  return -1
}

// Function to save the valid pairs of stations in a file
export const generateAndSave = async () => {
  try {
    console.log("[SCRIPT] Fetch map...")
    const map = await getMap()
    const stations = map.stations
    const validPairs = []

    console.log("[SCRIPT] Calculating distance...")
    for (let i = 0; i < stations.length; i++) {
      for (let j = 0; j < stations.length; j++) {
        if (i !== j) {
          const dist = getDistance(map, stations[i].id, stations[j].id)
          if (dist >= 3) {
            validPairs.push({ 
              startStation: stations[i], 
              endStation: stations[j] 
            });
          }
        }
      }
    }

    fs.writeFileSync(
      './valid_pairs.json', 
      JSON.stringify(validPairs, null, 2),
      'utf-8'
    );
    
    console.log(`[SUCCÈS] Fichier valid_pairs.json généré avec ${validPairs.length} couples !`)
    process.exit(0)
  } catch (err) {
    console.error("[ERROR]", err)
    process.exit(1)
  }
}

export const isRouteValid = (map, route, startId, endId) => 
{
  if(!route || route.length < 1) {
    console.log(`[VALIDATION] Route empty or too small`);
    return false
  }
  if(!(route[0] == startId && route[route.length - 1] == endId)){
    console.log(`[VALIDATION] Route's start or end point is wrong`);
    return false
  }

  let currentLine = null
  for (let i = 0; i < route.length - 1; i++)
  {
    const fromStationId = route[i]
    const toStationId = route[i+1]

    const segment = map.segments.find(seg => 
      (seg.station1Id === fromStationId && seg.station2Id === toStationId) ||
      (seg.station2Id === fromStationId && seg.station1Id === toStationId)
    )
    
    if (!segment)  {
      console.log(`[VALIDATION] Such segment does not exist : ${fromStationId} - ${toStationId}`);
      return false
    }
    if (currentLine !== null && currentLine != segment.lineId)
    {
      const station = map.stations.find(s => s.id === fromStationId)

      if (!station || !isInterchangeStation(map, station))
      {
        console.log(`[VALIDATION] Illegal line change at ${station.name}`);
        return false;
      }
    }
    
    currentLine = segment.lineId
  }

  return true
}

const isInterchangeStation = ( map, station ) => {
    const connectedSegments = map.segments.filter(seg => 
    seg.station1Id === station.id || seg.station2Id === station.id
  )

  const uniqueLines = new Set(connectedSegments.map(seg => seg.lineId))

  return uniqueLines.size >= 2
}
