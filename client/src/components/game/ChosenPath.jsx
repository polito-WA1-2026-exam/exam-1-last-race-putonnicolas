import { STRINGS } from '@/constants/strings'
import { SmallCard } from '@/components/ui/SmallCard'
import './ChosenPath.css'

const ChosenPath = ({ segments, stations, onRemove }) => {
  const getStationById = (id) => stations?.find((s) => s.id === id)

  return (
    <div className="d-flex flex-row align-items-center gap-2 overflow-auto py-1 w-100 chosen-path-scroll">
      {segments.length === 0 ? (
        <span className="text-white-50 p-2">{STRINGS.game.noPath}</span>
      ) : (
        segments.map((s) => {
          const startStation = getStationById(s.station1Id)
          const endStation = getStationById(s.station2Id)

          return (
            <div key={s.id} onClick={() => onRemove?.(s.id)} className="chosen-path-segment">
              <SmallCard
                startStation={startStation}
                endStation={endStation}
                id={s.id}
              />
            </div>
          )
        })
      )}
    </div>
  )
}

export default ChosenPath
