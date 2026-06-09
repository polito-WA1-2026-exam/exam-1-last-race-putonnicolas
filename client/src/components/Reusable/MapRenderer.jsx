export default function MapRenderer({ network, startStation, endStation }) {
  const getStationById = (id) => network.stations.find(s => s.id === id)
  const {width, height} = {width: 800, height: 600}

  return (
    <div className="map-viewport">
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet" className="map-svg">
        
        {network.segments.map((segment) => {
          const station1 = getStationById(segment.station1Id)
          const station2 = getStationById(segment.station2Id)
          const line = network.lines.find(l => l.id === segment.lineId)

          if (!station1 || !station2) return null

          return (
            <line
              key={segment.id}
              x1={station1.x}
              y1={station1.y}
              x2={station2.x}
              y2={station2.y}
              stroke={line ? line.color : "#FFFFFF"}
              strokeWidth="8"
              opacity="0.8"
            />
          )
        })}

        {network.stations.map((station) => {
          const isStart = station.id === startStation.id
          const isEnd = station.id === endStation.id
          
          let circleColor = "#FFFFFF"
          let circleRadius = "12"
          
          if (isStart) {
            circleColor = "#00D1FF"
            circleRadius = "16"
          } else if (isEnd) {
            circleColor = "#FF3366"
            circleRadius = "16"
          }

          return (
            <g key={station.id}>
              <circle
                cx={station.x}
                cy={station.y}
                r={circleRadius}
                fill={circleColor}
                stroke="#1A1433"
                strokeWidth="4"
              />
              <text
                x={station.x}
                y={station.y - 20}
                fill="#E2DDF8"
                fontSize="14"
                fontWeight="bold"
                fontFamily="sans-serif"
                textAnchor="middle"
              >
                {station.name}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}