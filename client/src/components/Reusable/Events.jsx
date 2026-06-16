import { Card, Button } from 'react-bootstrap'
import '../../css/Game.css'
import '../../css/Button.css'
import { STRINGS } from '../../constants/strings'
import { useState, useEffect, useRef } from 'react'
import DynamicMetro from './DynamicMetro'

const Events = ({ journey, onClose, stations }) => {
  const [step, setStep] = useState(0)
  const intervalRef = useRef(null)

  const handleNextStep = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    if (step < journey.length) {
      setStep(step + 1)
    } else {
      onClose()
    }
  }
  
  useEffect(() => {
    if (!journey || journey.length === 0) return

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    if (step >= journey.length) return

    intervalRef.current = setInterval(() => {
      setStep(prev => {
        if (prev < journey.length) return prev + 1
        return prev
      })
    }, 3000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [journey, step])

  if (!journey || journey.length === 0) return null

  const isArrival = step === journey.length
  const progressPercent = (step / journey.length) * 100
  
  const isPositiveEffect = !isArrival && journey[step].effect >= 0
  const winLoseColorClass = isPositiveEffect ? "text-success" : "text-danger"

  const currentStationId = isArrival 
    ? journey[journey.length - 1].toStationId 
    : journey[step].fromStationId

  const stationName = stations.find(s => s.id === currentStationId).name || "Station inconnue"

  return (
    <div 
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ 
        backgroundColor: "rgba(15, 10, 31, 0.8)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        zIndex: 9999
      }}
    >
      <Card 
        className="bg-arcade-panel border-0 rounded-4 shadow-lg p-3 p-md-4" 
        style={{ maxWidth: '800px', width: '95%', borderTop: '4px solid #00D1FF' }}
      >
        <Card.Body className="d-flex flex-column align-items-center w-100 p-0">
          
          <div className="text-center" style={{ maxWidth: '500px' }}>
            <h2 className="arcade-title mb-2 fw-bold text-info" style={{ fontSize: '2.2rem', letterSpacing: '1px' }}>
              {STRINGS.game.events.title || "RAPPORT DE TRAJET"}
            </h2>
            <p className="text-white-50 mb-0" style={{ fontSize: '1rem' }}>
              {STRINGS.game.events.description || "Voici ce qu'il s'est passé en route..."}
            </p>
          </div>

          <div className="w-100 my-4 px-2 px-md-4">
             <DynamicMetro journey={journey} step={step} progressPercent={progressPercent}/>
          </div>

          <div className="d-flex flex-column w-100" style={{ maxWidth: '500px' }}>
            
            <div 
              className="rounded-4 p-4 mb-4" 
              style={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.25)', 
                boxShadow: 'inset 0px 4px 15px rgba(0,0,0,0.3)'
              }}
            >
              
              <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-3" style={{ borderColor: 'rgba(255,255,255,0.1) !important' }}>
                <div className="text-start">
                   <span className="text-uppercase text-info fw-bold d-block" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>
                     {isArrival ? STRINGS.game.events.terminus : STRINGS.game.events.station}
                   </span>
                   <span className="text-white fw-bold fs-5">
                     {stationName}
                   </span>
                </div>
                
                <div className="text-end">
                  {!isArrival && (
                    <>
                      <span className="text-uppercase text-white-50 fw-bold d-block" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>
                        IMPACT
                      </span>
                      <span className={`fw-bold fs-4 ${winLoseColorClass}`} style={{ textShadow: isPositiveEffect ? '0 0 10px rgba(25, 135, 84, 0.5)' : '0 0 10px rgba(220, 53, 69, 0.5)' }}>
                        {isPositiveEffect ? "+" : ""}{journey[step].effect} 🪙
                      </span>
                    </>
                  )}
                </div>
              </div>

              <p className="text-white mb-0 text-center" style={{ fontSize: '1.1rem', fontStyle: 'italic' }}>
                 {isArrival 
                    ? STRINGS.game.events.finalStation
                    : `"${journey[step].eventDescription}"`
                 }
              </p>

            </div>

            <Button 
              className="btn-arcade-login w-100 py-3 rounded-pill text-uppercase fw-bold shadow-sm"
              onClick={handleNextStep}
              style={{ fontSize: '1.1rem', letterSpacing: '1px' }}
            >
              {step < journey.length 
                ? (STRINGS.game.events.continueButton) 
                : (STRINGS.game.events.closeButton)
              }
            </Button>

          </div>
          
        </Card.Body>
      </Card>
    </div>
  )
}

export default Events