import metroIcon from '@/assets/metro-icon.png'
import '@/components/game/DynamicMetro.css'

const DynamicMetro = ({ journey, progressPercent, step }) => {
  const numberOfStations = journey.length + 1

  return (
    <div className="w-100 position-relative mb-2 mt-4 metro-container">
      <div className="position-absolute top-50 start-0 w-100 translate-middle-y metro-track"></div>

      <div
        className="position-absolute top-50 start-0 translate-middle-y metro-progress"
        style={{ width: `${progressPercent}%` }}
      ></div>

      {Array.from({ length: numberOfStations }).map((_, index) => (
        <div
          key={index}
          className={`position-absolute top-50 translate-middle metro-station-dot ${index <= step ? 'metro-station-dot-active' : 'metro-station-dot-inactive'}`}
          style={{ left: `${(index / journey.length) * 100}%` }}
        ></div>
      ))}

      <div
        className="position-absolute top-50 metro-train"
        style={{ left: `${progressPercent}%` }}
      >
        <img
          src={metroIcon}
          alt="Metro train"
          className="metro-icon"
        />
      </div>
    </div>
  )
}

export default DynamicMetro
