import { Container, Row, Col } from 'react-bootstrap'
import { STRINGS } from '@/constants/strings.js'
import mapImg from '@/assets/tcl-map.jpg'
import '@/components/landing/HowToPlay/HowToPlay.css'
import '@/styles/App.css'

const HowToPlay = () => {
  const { phasesSection, coinSystem, networkSection } = STRINGS.home

  return (
    <Container className="how-to-play-container my-5">
      <h2 className="section-main-title text-center mb-5">
        {STRINGS.home.rulesTitle}
      </h2>

      <Row className="g-4">
        <Col lg={8}>
          <div className="phases-panel p-4 p-md-5 h-100 grainy">
            <h3 className="phases-title mb-4">{phasesSection.title}</h3>

            <Row className="g-3">
              {['setup', 'planning', 'execution', 'result'].map((phaseKey) => {
                const phase = phasesSection[phaseKey]
                return (
                  <Col md={6} key={phaseKey}>
                    <div className="phase-mini-card p-4">
                      <span className="phase-num">{phase.num}</span>
                      <h4 className="phase-name">{phase.title}</h4>
                      <p className="phase-desc mb-0">{phase.description}</p>
                    </div>
                  </Col>
                )
              })}
            </Row>
          </div>
        </Col>

        <Col lg={4}>
          <div className="coin-panel p-4 p-md-5 d-flex flex-column h-100">
            <h3 className="coin-title mb-3">{coinSystem.title}</h3>
            <p className="coin-desc mb-4">{coinSystem.description}</p>

            <div className="coin-graphic mt-auto d-flex justify-content-center">
              <div className="giant-coin">
                <span>$</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs={12}>
          <div className="network-panel p-4 p-md-5 grainy">
            <Row className="align-items-center gx-5">
              <Col md={5} lg={4} className="mb-4 mb-md-0">
                <img src={mapImg} alt="Network Map" className="network-map-img img-fluid" />
              </Col>

              <Col md={7} lg={8}>
                <h3 className="network-title mb-3">{networkSection.title}</h3>
                <p className="network-desc mb-4">{networkSection.description}</p>

                <div className="network-badges d-flex flex-wrap gap-3">
                  <div className="network-badge">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                    </svg>
                    <span>{networkSection.badgeTime}</span>
                  </div>

                  <div className="network-badge">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M6.5 1.5a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM3 11.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm11 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
                      <path fillRule="evenodd" d="M2.5 1A1.5 1.5 0 0 0 1 2.5v9c0 .646.41 1.196 1 1.41V14a1 1 0 0 0 2 0v-1h8v1a1 1 0 0 0 2 0v-1.09c.59-.214 1-.764 1-1.41v-9A1.5 1.5 0 0 0 13.5 1h-11zM2 2.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5v2.5h-12v-2.5zM14 6H2v5.5a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5V6z"/>
                    </svg>
                    <span>{networkSection.badgeStations}</span>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default HowToPlay
