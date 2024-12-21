"use strict";
// Class to store games data for future instances
export class Game {
  constructor(
    id,
    title,
    thumbnail,
    shortDescription,
    gameUrl,
    genre,
    platform
  ) {
    this.id = id;
    this.title = title;
    this.thumbnail = thumbnail;
    this.shortDescription = shortDescription;
    this.gameUrl = gameUrl;
    this.genre = genre;
    this.platform = platform;
  }

  // Method to fetch games data using api
  async fetchGames(category) {
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
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
      return [];
    }
  }
}
