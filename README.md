# Exam #1: "Exam Title"
## Student: s362538 PUTON Nicolas 

## React Client Application Routes

- Route `/` : Home page. Displays the game instructions for anonymous users, and provides a button to launch a new game for authenticated users.
- Route `/login` : Login page containing the authentication form
- (Protected) Route `/game` : Main game board. Dynamically manages the 4 phases of a single game session without reloading: Setup, Planning, Execution, and Result.
- (Protected) Route `/leaderboard` : General ranking page. Displays the best results of all registered users.
- Route `*` : Catch-all route. Displays a "404 Not Found" error page to handle invalid URLs cleanly.

## API Server

### Authentication
- POST `/api/sessions`
  - request parameters and request body content: 
    ```json
    {
      "username": "player1",
      "password": "password"
    }
    ```
  - response body content: 
    ```json
    {
      "id": 1,
      "username": "player1"
    }
    ```
  - status codes: `200 OK`, `401 Unauthorized`

- GET `/api/sessions/current`
  - request parameters: None
  - response body content: 
    ```json
    {
      "id": 1,
      "username": "player1",
      "bestScore": 20
    }
    ```
  - status codes: `200 OK`, `401 Unauthorized`

- DELETE `/api/sessions/current`
  - request parameters: None
  - response body content: Empty body
  - status codes: `200 OK`

### Game

- GET `/api/game/setup`
  - request parameters: None
  - response body content: 
    ```json
    {
      "network": {
        "stations": [...],
        "lines": [...]
      },
      "startStation": "Charpennes",
      "destinationStation": "Vieux-Lyon"
    }
    ```
  - status codes: `200 OK`, `401 Unauthorized`, `500 Internal Server Error`

- POST `/api/game/submit`
  - request parameters and request body content: 
    ```json
    {
      "route": [
        "Charpennes",
        "Bellecour",
        "Vieux-Lyon"
      ]
    }
    ```
  - response body content: 
    ```json
    {
      "valid": true,
      "finalScore": 21,
      "journeySteps": [
        {
          "step": 1,
          "event": "Kind passenger",
          "effect": 1
        }
      ],
      "isNewRecord": true
    }
    ```
  - status codes: `200 OK`, `400 Bad Request`, `401 Unauthorized`, `500 Internal Server Error`

### Leaderboard 

- GET `/api/leaderboard`
  - request parameters: None
  - response body content: 
    ```json
    {
      "leaderboard": [
        {
          "username": "player1",
          "bestScore": 25
        },
        {
          "username": "player2",
          "bestScore": 18
        }
      ],
      "currentUserRank": 4
    }
    ```
  - status codes: `200 OK`, `401 Unauthorized`, `500 Internal Server Error`

## Database Tables

- Table `users` - contains id, username, password, bestScore
- Table `events` - contains id, description, effect
- Table `lines` - contains id, name
- Table `stations` - contains id, name
- Table `segments` - contains id, station1Id, station2Id, lineId

## Main React Components

- `ListOfSomething` (in `List.js`): component purpose and main functionality
- `GreatButton` (in `GreatButton.js`): component purpose and main functionality
- ...

(only _main_ components, minor ones may be skipped)

## Screenshot

![Screenshot](./img/screenshot.jpg)

## Users Credentials

- username, password (plus any other requested info)
- username, password (plus any other requested info)

## Use of AI Tools
- Generate data
- Verify syntax
- Defining game's events
- Debugging
- Explaination of concepts
- Redaction of this README document