import metroIcon from '../../assets/metro-icon.png'

const DynamicMetro = ({journey, progressPercent, step}) => {
  const numberOfStations = journey.length + 1;
  return (
    <div className="w-100 position-relative mb-2 mt-4" style={{ height: '40px' }}>
      
      {/* Rail */}
      <div 
        className="position-absolute top-50 start-0 w-100 translate-middle-y"
        style={{ height: '4px', backgroundColor: '#2E294E', borderRadius: '2px' }}
      ></div>

      {/* Progress line */}
      <div 
        className="position-absolute top-50 start-0 translate-middle-y"
        style={{ 
          height: '4px', 
          backgroundColor: '#00D1FF', 
          width: `${progressPercent}%`,
          transition: 'width 0.6s ease-in-out'
        }}
      ></div>

      {/* Points for each station*/}
      {Array.from({ length: numberOfStations }).map((_, index) => (        
      <div 
          key={index}
          className="position-absolute top-50 translate-middle"
          style={{ 
            left: `${(index / (journey.length)) * 100}%`,
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            backgroundColor: index <= step ? '#00D1FF' : '#2E294E',
            border: '3px solid #1A1433',
            transition: 'background-color 0.3s ease-in-out 0.3s',
            zIndex: 2
          }}
        ></div>
      ))}

      {/* Metro icon */}
      <div 
        className="position-absolute top-50"
        style={{ 
          left: `${progressPercent}%`, 
          transition: 'left 0.6s ease-in-out',
          transform: 'translate(-50%, -130%)',
          zIndex: 10
        }}
      >
        <img 
          src={metroIcon} 
          alt="Métro" 
          style={{ 
            width: '50px',
            height: 'auto',
            filter: 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.5))'
          }} 
        />
      </div>
      
    </div>
  )
}

export default DynamicMetro