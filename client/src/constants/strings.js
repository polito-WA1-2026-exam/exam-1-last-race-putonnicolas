export const STRINGS = {
  header: {
    logout: "LOGOUT",
    launchGame : "LAUNCH A GAME"
  },
  home: {
    badge: "JOIN THE GAME NOW!",
    title: "DOMINATE THE SUBWAY NETWORK.",
    description: "Outsmart your rivals in the world's most chaotic underground race. Manage your tokens, plan your routes, and be the first to reach the terminal.",
    btnJoin: "JOIN THE RACE",
    startingCoins: "20 STARTING COINS",
    rulesTitle: "HOW TO PLAY?",
    
    phasesSection: {
      title: "THE 4 PHASES",
      setup: {
        num: "01",
        title: "Setup",
        description: "Gather your gear and check the map."
      },
      planning: {
        num: "02",
        title: "Planning",
        description: "90 seconds to lock in your path."
      },
      execution: {
        num: "03",
        title: "Execution",
        description: "Watch the trains move in real-time."
      },
      result: {
        num: "04",
        title: "Result",
        description: "Check your rank and collect coins."
      }
    },

    coinSystem: {
      title: "THE COIN SYSTEM",
      description: "Every racer starts with 20 golden coins. Spend them wisely on shortcuts, speed boosts, or sabotage!"
    },

    networkSection: {
      title: "THE NETWORK",
      description: "Navigate through 12 unique stations, each with its own transit speed and risks. Some stations are hubs for bonus coins, while others are notorious for delays. Study the map carefully during the planning phase!",
      badgeTime: "90 SEC LIMIT",
      badgeStations: "12 STATIONS"
    }
  },

  error: {
    title: "OOPS! WRONG STATION",
    description: "Looks like your racing career took a detour into the subway vents. This line is closed for repairs!",
    btnHome: "RETURN TO HOME STATION",
    btnBack: "PREVIOUS LAP"
  },
  game: {
    start: "STARTING STATION",
    end: "DESTINATION",
    availableSegments: "Available segments",
    submitPath: "Submit path",
    path: "Choosed path",
    noPath: "No path choosed yet... choose some stations!",
    startGame: "START THE GAME",
    readyToPlay: "READY TO PLAY?",
    readyToPlayDesc: "Look at the map and memorize it!\n\nOnce you're ready, start the timer you'll have 90 seconds to plan your route!",
    validPath: "Well done! You killed it 😎",
    unvalidPath: "Invalid route! This path does not comply with the network rules.",
    result: {
      newRecord: "🔥 New Record ! 🔥",
      victory: "Victory!",
      defeat: "You lose...",
      leaderboard: "See leaderboard ➔",
      tryAgain: "Try again !",
      continue: "Continue",
      finalScore: "Final score :"
    },
    events: {
      title: "Checking your path...",
      description: "Many events happen in this subway...\nMay the odds be in your favor!",
      continueButton: "Continue...",
      closeButton: "See the results ✨",
      station: "CURRENT STATION",
      eventTitle: "THE EVENT",
      win: "You got lucky! : +",
      lose: "Ohhh no... : ",
      finalStation: "You reached the final station! Well done!",
      terminus: "Terminus"    
    }
  }
};

export const GAME_PHASES = Object.freeze({
  SETUP: 'SETUP', // Full map with connections, no finish and start stations
  PLANNING: 'PLANNING', // Map without connections, player need to create path
  EXECUTION: 'EXECUTION', // Apply the events or show that path is unvalid
  RESULT: 'RESULT' // Pop-up with result (coins or lose) 
})