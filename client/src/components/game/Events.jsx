import { Card, Button } from 'react-bootstrap'
import '@/styles/shared/Game.css'
import '@/styles/shared/Button.css'
import '@/styles/shared/Arcade.css'
import '@/components/game/Events.css'
import { STRINGS } from '@/constants/strings'
import { useState, useEffect, useRef, useCallback } from 'react'
import DynamicMetro from '@/components/game/DynamicMetro'

const Events = ({ journey, onClose, stations }) => {
  const [step, setStep] = useState(0)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  const handleNextStep = useCallback(() => {
    if (step < journey.length) {
      setStep((currentStep) => currentStep + 1)
    } else {
      onCloseRef.current()
    }
  }, [step, journey.length])

  useEffect(() => {
    if (!journey || journey.length === 0) return

    if (step >= journey.length) return

    const intervalId = setInterval(() => {
      setStep((currentStep) => {
        if (currentStep < journey.length) {
          return currentStep + 1
        }

        return currentStep
      })
    }, 3000)

    return () => clearInterval(intervalId)
  }, [journey, step])

  if (!journey || journey.length === 0) return null

  const isArrival = step === journey.length
  const progressPercent = (step / journey.length) * 100

  const isPositiveEffect = !isArrival && journey[step].effect >= 0
  const winLoseColorClass = isPositiveEffect ? 'text-success' : 'text-danger'
  const effectGlowClass = isPositiveEffect ? 'effect-glow-success' : 'effect-glow-danger'

  const currentStationId = isArrival
    ? journey[journey.length - 1].toStationId
    : journey[step].fromStationId

  const station = stations.find((s) => s.id === currentStationId)
  const stationName = station?.name ?? STRINGS.game.events.unknownStation

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center arcade-overlay">
      <Card className="bg-arcade-panel border-0 rounded-4 shadow-lg p-5 arcade-modal-card">
        <Card.Body className="d-flex flex-column align-items-center w-100 p-0">
          <div className="text-center arcade-content-narrow">
            <h2 className="arcade-title mb-2 fw-bold text-info arcade-title-md">
              {STRINGS.game.events.title}
            </h2>
            <p className="text-white-50 mb-0 event-subtitle">
              {STRINGS.game.events.description}
            </p>
          </div>

          <div className="w-100 m-4 px-2">
            <DynamicMetro journey={journey} step={step} progressPercent={progressPercent} />
          </div>

          <div className="d-flex flex-column w-100 arcade-content-narrow">
            <div className="rounded-4 p-4 mb-4 arcade-inset-panel">
              <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-3 arcade-section-divider">
                <div className="text-start">
                  <span className="text-uppercase text-info fw-bold d-block arcade-label-sm">
                    {isArrival ? STRINGS.game.events.terminus : STRINGS.game.events.station}
                  </span>
                  <span className="text-white fw-bold fs-5">
                    {stationName}
                  </span>
                </div>

                <div className="text-end">
                  {!isArrival && (
                    <>
                      <span className="text-uppercase text-white-50 fw-bold d-block event-impact-label">
                        {STRINGS.game.events.impact}
                      </span>
                      <span className={`fw-bold fs-4 ${winLoseColorClass} ${effectGlowClass}`}>
                        {isPositiveEffect ? '+' : ''}{journey[step].effect} 🪙
                      </span>
                    </>
                  )}
                </div>
              </div>

              <p className="text-white mb-0 text-center event-description">
                {isArrival
                  ? STRINGS.game.events.finalStation
                  : `"${journey[step].eventDescription}"`}
              </p>
            </div>

            <Button
              className="btn-arcade-login w-100 py-3 rounded-pill text-uppercase fw-bold shadow-sm arcade-btn-lg"
              onClick={handleNextStep}
            >
              {step < journey.length
                ? STRINGS.game.events.continueButton
                : STRINGS.game.events.closeButton}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Events
