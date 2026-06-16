import { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import '../css/Game.css';
import '../css/Button.css';
import { getLeaderboard } from '../../src/api/leaderboard.js';
import { STRINGS } from '../constants/strings.js';

const Leaderboard = () => {
  const navigate = useNavigate();
  const [scores, setScores] = useState([]);
  const [error, setError] = useState('');
  const [userRank, setUserRank] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => 
  {
    getLeaderboard()
      .then((data) => 
      {
        console.log(data);
        
        setScores(data.leaderboard)
        setUserRank(Number(data.currentUserRank))
      })
      .catch(
        (err) => setError(err.message)
      )
      .finally(() => {
        setLoading(false)
      })
  }, [])

   if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-light" role="status"></div>
      </div>
    ) 
  }

  if (error) {
    return <div className="text-danger text-center mt-5">{error}</div>
  }

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
              {STRINGS.leaderboard.title}
            </h1>
            <p className="text-white-50 mb-0" style={{ fontSize: '0.9rem' }}>
              {STRINGS.leaderboard.description}
            </p>
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
                <p className="text-info mt-3 fw-bold">
                  {STRINGS.leaderboard.loading}
                </p>
              </div>
            ) : (
              <div className="d-flex flex-column h-100 justify-content-evenly gap-2">
                
                <div className="d-flex justify-content-between px-3 pb-2 border-bottom flex-shrink-0" style={{ borderColor: 'rgba(255,255,255,0.1) !important' }}>
                  <span className="text-white-50 fw-bold text-center" style={{ fontSize: '0.8rem', width: '15%' }}>
                    {STRINGS.leaderboard.rank}
                  </span>
                  <span className="text-white-50 fw-bold text-start" style={{ fontSize: '0.8rem', width: '55%' }}>
                    {STRINGS.leaderboard.player}
                  </span>
                  <span className="text-white-50 fw-bold text-end" style={{ fontSize: '0.8rem', width: '30%' }}>
                    {STRINGS.leaderboard.score}
                  </span>
                </div>

                {scores.map((score, index) => {
                  const rankData = getRankStyle(index);
                  const isTop3 = index < 3;

                  console.log(index);
                  
                  const isUser = (index + 1) === userRank; 

                  let backgroundColor = 'transparent';
                  if (isTop3) backgroundColor = 'rgba(255,255,255,0.05)';
                  if (isUser) backgroundColor = 'rgba(58, 197, 134, 0.25)';

                  return (
                    <div 
                      key={`${score.username}-${score.score}`} 
                      className="d-flex justify-content-between align-items-center p-2 px-md-3 rounded-3"
                      style={{ 
                        border: isTop3 ? `1px solid ${rankData.color}40` : '1px solid transparent',
                        backgroundColor: backgroundColor,
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
                        {score.bestScore} <span style={{ fontSize: '1rem' }}>🪙</span>
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
            {STRINGS.leaderboard.back}
          </Button>

        </Card.Body>
      </Card>
    </Container>
  );
};

export default Leaderboard;