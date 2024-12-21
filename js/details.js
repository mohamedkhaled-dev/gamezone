"use strict";
// Class to store games details data for future instances
export class GameDetails {
  constructor(id, title, thumbnail, description) {
    this.id = id;
    this.title = title;
    this.thumbnail = thumbnail;
    this.description = description;
  }
  // Method to fetch games data using api
  async fetchGameDetails(gameId) {
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "155e2a3513msh0513b862debdbe8p192b3ajsn30e38270dfc2",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}
