import { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import '../css/Game.css';
import '../css/Button.css';

const MOCK_LEADERBOARD = [
  { id: 1, username: "RAPHAEL", score: 154, date: "2026-06-15" },
  { id: 2, username: "BASTIEN", score: 142, date: "2026-06-14" },
  { id: 3, username: "PIERRE_L", score: 128, date: "2026-06-16" },
  { id: 4, username: "SOPHIE", score: 95, date: "2026-06-10" },
  { id: 5, username: "GUEST_99", score: 87, date: "2026-06-16" },
];

const Leaderboard = () => {
  const navigate = useNavigate();
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setScores(MOCK_LEADERBOARD.slice(0, 5));
      setLoading(false);
    }, 800);
  }, []);

  const getRankStyle = (index) => {
    switch(index) {
      case 0: return { color: '#FFD700', textShadow: '0 0 10px rgba(255, 215, 0, 0.5)', icon: '🥇' }; 
      case 1: return { color: '#C0C0C0', textShadow: '0 0 10px rgba(192, 192, 192, 0.5)', icon: '🥈' }; 
      case 2: return { color: '#CD7F32', textShadow: '0 0 10px rgba(205, 127, 50, 0.5)', icon: '🥉' }; 
      default: return { color: '#00D1FF', textShadow: 'none', icon: `${index + 1}.` }; 
    }
  };

  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center p-2 p-md-4 overflow-hidden">

      <Card 
        className="bg-arcade-panel border-0 rounded-4 shadow-lg p-3 p-md-4 d-flex flex-column" 
        style={{ maxWidth: '800px', width: '100%', maxHeight: '95vh', borderTop: '4px solid #00D1FF' }}
      >
        <Card.Body className="d-flex flex-column align-items-center w-100 p-0 h-100">
          
          {/* HEADER */}
          <div className="text-center mb-3 flex-shrink-0">
            <h1 className="arcade-title fw-bold text-info mb-1" style={{ fontSize: '2.5rem', letterSpacing: '2px' }}>
              HIGH SCORES
            </h1>
            <p className="text-white-50 mb-0" style={{ fontSize: '0.9rem' }}>Les meilleurs voyageurs du réseau</p>
          </div>

          {/* SCORE LIST */}
          <div 
            className="w-100 rounded-4 p-3 mb-4 flex-grow-1 d-flex flex-column justify-content-between" 
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.25)', 
              boxShadow: 'inset 0px 4px 15px rgba(0,0,0,0.3)',
              border: '1px solid rgba(0, 209, 255, 0.15)'
            }}
          >
            
            {loading ? (
              <div className="text-center py-5 m-auto">
                <div className="spinner-border text-info" role="status"></div>
                <p className="text-info mt-3 fw-bold">Chargement...</p>
              </div>
            ) : (
              <div className="d-flex flex-column h-100 justify-content-evenly gap-2">
                
                <div className="d-flex justify-content-between px-3 pb-2 border-bottom flex-shrink-0" style={{ borderColor: 'rgba(255,255,255,0.1) !important' }}>
                  <span className="text-white-50 fw-bold text-center" style={{ fontSize: '0.8rem', width: '15%' }}>RANK</span>
                  <span className="text-white-50 fw-bold text-start" style={{ fontSize: '0.8rem', width: '55%' }}>PLAYER</span>
                  <span className="text-white-50 fw-bold text-end" style={{ fontSize: '0.8rem', width: '30%' }}>SCORE</span>
                </div>

                {scores.map((score, index) => {
                  const rankData = getRankStyle(index);
                  const isTop3 = index < 3;

                  return (
                    <div 
                      key={score.id} 
                      className="d-flex justify-content-between align-items-center p-2 px-md-3 rounded-3"
                      style={{ 
                        backgroundColor: isTop3 ? 'rgba(255,255,255,0.05)' : 'transparent',
                        border: isTop3 ? `1px solid ${rankData.color}40` : '1px solid transparent',
                        transition: 'background-color 0.2s',
                      }}
                    >
                      <span className="fw-bold fs-4 text-center" style={{ width: '15%', color: rankData.color }}>
                        {rankData.icon}
                      </span>
                      
                      <span className="fw-bold text-start text-white text-truncate px-2" style={{ width: '55%', fontSize: isTop3 ? '1.2rem' : '1.1rem', letterSpacing: '1px' }}>
                        {score.username}
                      </span>
                      
                      <span className="fw-bold text-end" style={{ width: '30%', color: rankData.color, textShadow: rankData.textShadow, fontSize: isTop3 ? '1.5rem' : '1.2rem' }}>
                        {score.score} <span style={{ fontSize: '1rem' }}>🪙</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Back Button */}
          <Button 
            className="btn-arcade-login w-100 py-3 rounded-pill text-uppercase fw-bold shadow-sm flex-shrink-0"
            onClick={() => navigate('/home')}
            style={{ fontSize: '1.1rem' }}
          >
            ➔ Retour au Menu
          </Button>

        </Card.Body>
      </Card>
    </Container>
  );
};

export default Leaderboard;