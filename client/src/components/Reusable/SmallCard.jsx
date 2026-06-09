import { Card } from 'react-bootstrap'

export const SmallCard = ({startStation, endStation, id}) => {
  return (
    <Card
            key={id}
            className="bg-arcade-panel border-0 shadow-sm rounded-3 h-100"
            style={{ userSelect: "none" }}
          >
      <Card.Body className="py-2 px-2">
        <div className="d-flex flex-column align-items-center text-center">
          <span
            className="fw-bold text-info text-nowrap"
            style={{ fontSize: "0.75rem" }}
          >
            {startStation?.name || "?"}
          </span>
          <small className="text-white-50" style={{ fontSize: "0.6rem" }}>
            ↓
          </small>
          <span
            className="fw-bold text-warning text-nowrap"
            style={{ fontSize: "0.75rem" }}
          >
            {endStation?.name || "?"}
          </span>
        </div>
      </Card.Body>
    </Card>
  )
}
