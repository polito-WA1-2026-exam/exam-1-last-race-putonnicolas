import { STRINGS } from '../../constants/strings';
import { SmallCard } from './SmallCard'

const ChoosedPath = ({ segments, stations, onRemove }) => {
  const getStationById = (id) => stations?.find((s) => s.id === id);

  return (
    <div 
      className="d-flex flex-row align-items-center gap-2 overflow-auto py-1 w-100" 
      style={{ minHeight: '90px' }} 
    >
      {segments.length === 0 ? (
        <span className="text-white-50 p-2">{STRINGS.game.noPath}</span>
      ) : (
        segments.map((s) => {
          const startStation = getStationById(s.station1Id);
          const endStation = getStationById(s.station2Id);

          return (
            <div key={s.id} onClick={() => onRemove && onRemove(s.id)} style={{ cursor: 'pointer' }}>
              <SmallCard 
                startStation={startStation} 
                endStation={endStation} 
                id={s.id} 
              />
            </div>
          );
        })
      )}
    </div>
  );
};

export default ChoosedPath;