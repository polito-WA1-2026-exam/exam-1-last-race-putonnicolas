import subwayImg from '../../assets/subway.png'
import {STRINGS} from '../../constants/strings.js'
import { Button, Col, Row } from 'react-bootstrap'

const HomeHero = () => {
  return (
    <Row className="align-items-center mb-5 gx-5">
      <Col lg={6} className="mb-5 mb-lg-0">
      <div className="season-badge">
        {STRINGS.home.badge}
      </div>

      <h1 className="hero-title my-4">
        {STRINGS.home.title}
      </h1>
      
      <p className="hero-description mb-5">
        {STRINGS.home.description}
      </p>
      
      <div className="hero-actions d-flex flex-wrap align-items-center gap-3">
        <Button className="btn-join-race">
          {STRINGS.home.btnJoin}
        </Button>
        
        <div className="starting-coins-badge">
          <span className="coin-icon-small">$</span>
          {STRINGS.home.startingCoins}
        </div>
      </div>
    </Col>

    <Col lg={6}>
      <img 
        src={subwayImg} 
        alt="Neon Subway" 
        className="hero-image img-fluid" 
      />
    </Col>
  </Row>
  )
}


export default HomeHero