import { Card } from 'react-bootstrap'
import './SmallCard.css'

export const SmallCard = ({ startStation, endStation, id }) => {
  return (
    <Card
      key={id}
      className="bg-arcade-panel border-0 shadow-sm rounded-3 h-100 small-card"
    >
      <Card.Body className="py-2 px-2">
        <div className="d-flex flex-column align-items-center text-center">
          <span
            className="fw-bold text-info text-nowrap small-card-station-text"
          >
            {startStation?.name || "?"}
          </span>
          <small className="text-white-50 small-card-separator">
            ↓
          </small>
          <span
            className="fw-bold text-warning text-nowrap small-card-station-text"
          >
            {endStation?.name || "?"}
          </span>
        </div>
      </Card.Body>
    </Card>
  )
}
