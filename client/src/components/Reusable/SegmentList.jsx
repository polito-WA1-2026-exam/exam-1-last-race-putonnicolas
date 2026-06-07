import { Card } from "react-bootstrap";

const SegmentList = ({ segments, stations }) => {
  if (!segments || !stations) return null;

  const getStationById = (id) => stations.find((s) => s.id === id);

  const sortedSegments = [...segments].sort((a, b) => {
    const s1 = getStationById(a.station1Id)?.name || "";
    const s2 = getStationById(b.station1Id)?.name || "";
    return s1.localeCompare(s2);
  });

  return (
    <div className="d-flex flex-wrap gap-2">
      {sortedSegments.map((s) => {
        const startStation = getStationById(s.station1Id);
        const endStation = getStationById(s.station2Id);

        return (
          // Dans ton .map() :
          <Card
            key={s.id}
            className="bg-arcade-panel border-0 shadow-sm rounded-3"
            style={{ flex: "1 1 120px" }}
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
        );
      })}
    </div>
  );
};

export default SegmentList;
