"use strict";
import { Game } from "./games.js";
import { GameDetails } from "./details.js";
import { loadingPage } from "./index.js";
const gamesRow = document.getElementById("gamesRow");
const gameImage = document.getElementById("gameImage");
const gameTitle = document.getElementById("gameTitle");
const gameDescription = document.getElementById("gameDescription");
const navbarNav = document.getElementById("navbarNav");

// Class to handle the user interface of home page
export class UIHandler {
  //  Method to get the game data by category
  async getGameDataByCategory() {
    const categoryBtn = document.querySelectorAll(".nav-link");
    categoryBtn.forEach((btn) => {
      btn.addEventListener("click", async () => {
        categoryBtn.forEach((btn) => {
          btn.classList.remove("active");
        });
        btn.classList.add("active");
        navbarNav.classList.remove("show");
        // Scroll to the top of the page immediately
        window.scrollTo({
          top: 0,
          behavior: "smooth", 
        });

        const category = btn.getAttribute("data-category");
        loadingPage.classList.remove("d-none");
        await this.displayGamesData(category);
        loadingPage.classList.add("d-none");
      });
    });
    await this.displayGamesData("MMORPG");
  }

  //  Method to display all games data
  async displayGamesData(category) {
    const gameObject = new Game();
    const gamesData = await gameObject.fetchGames(category);

    const games = gamesData.map(
      (gameData) =>
        new Game(
          gameData.id,
          gameData.title,
          gameData.thumbnail,
          gameData.short_description,
          gameData.game_url,
          gameData.genre,
          gameData.platform
        )
    );

    let container = "";
    let header = `<h2 class="mb-4">${category}</h2>`;
    games.forEach((game) => {
      const platform = game.platform
        .split(" ")
        .find((word) => word.toUpperCase() === "PC");

      container += `
    <div class="col-xl-3 col-lg-4 col-md-6 mb-4">
        <div class="card game-card bg-dark bg-opacity-75 border-0 shadow text-white h-100" data-id="${
          game.id
        }">
            <picture class="d-block">
                <img
                    src="${game.thumbnail}"  
                    class="card-img-top"
                    alt="${game.title} Image"
                    />
            </picture>
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${game.title}</h5>
                <div class="card-labels d-flex gap-1">
                    <span class="label price-label">Free</span>
                    <span class="label category-label">${game.genre}</span>
                    <span class="label type-label">${
                      platform || game.platform
                    }</span>
                </div>
                <p class="card-text pt-3">${game.shortDescription}</p>
                <a href="${
                  game.gameUrl
                }" target="_blank" class="btn btn-primary btn-play mt-auto">Play Now</a>
            </div>
        </div>
    </div>
        `;
    });

    gamesRow.innerHTML = header + container;
  }

  //  Method to display each game details
  async displayGameDetails(gameId) {
    const gameDetailsObject = new GameDetails();
    const gameDetailsData = await gameDetailsObject.fetchGameDetails(gameId);
    gameTitle.innerHTML = gameDetailsData.title;
    gameDescription.innerHTML = gameDetailsData.description;
    gameImage.src = gameDetailsData.thumbnail;
  }
}
