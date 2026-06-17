import { SmallCard } from '@/components/ui/SmallCard'
import '@/styles/shared/Game.css'

const SegmentList = ({ segments, stations, onAdd }) => {
  if (!segments || !stations) return null

  const stationMap = stations.reduce((acc, s) => ({ ...acc, [s.id]: s }), {})

  const sortedSegments = [...segments].sort((a, b) => {
    const s1 = stationMap[a.station1Id]?.name || ""
    const s2 = stationMap[b.station1Id]?.name || ""
    return s1.localeCompare(s2)
  })

  return (
    <div className="segment-grid">
      {sortedSegments.map((s) => (
        <div key={s.id} onClick={() => onAdd(s)} style={{ cursor: 'pointer' }}>
          <SmallCard
            startStation={stationMap[s.station1Id]}
            endStation={stationMap[s.station2Id]}
            id={s.id}
          />
        </div>
      ))}
    </div>
  )
}

export default SegmentList
