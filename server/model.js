class User {
  constructor(id, username, hash, salt, bestScore) {
    this.id = id;
    this.username = username;
    this.hash = hash;
    this.salt = salt;
    this.bestScore = bestScore;
  }
}

class Line {
  constructor(id, name, color) {
    this.id = id;
    this.name = name;
    this.color = color;
  }
}

class Station {
  constructor(id, name, x, y) {
    this.id = id;
    this.name = name;
    this.x = x,
    this.y = y
  }
}

class Segment {
  constructor(id, station1Id, station2Id, lineId) {
    this.id = id;
    this.station1Id = station1Id;
    this.station2Id = station2Id;
    this.lineId = lineId;
  }
}

class Event {
  constructor(id, description, effect) {
    this.id = id;
    this.description = description;
    this.effect = effect;
  }
}

export { User, Line, Station, Segment, Event };