"use strict";
import { UIHandler } from "./ui.js";
const uiHandlerObject = new UIHandler();
const gameModal = document.getElementById("gameModal");
const modalCloseBtn = document.getElementById("modalCloseBtn");
export const loadingPage = document.getElementById("loadingPage");

// Event Listener to load the games data on start
document.addEventListener("DOMContentLoaded", async () => {
  await uiHandlerObject.getGameDataByCategory();
  loadingPage.classList.add("d-none");
});

// Event Listener to display each game details on game-card click
gamesRow.addEventListener("click", async (e) => {
  const card = e.target.closest(".game-card");
  if (card) {
    loadingPage.classList.remove("d-none");
    const gameId = card.getAttribute("data-id");
    const uiHandler = new UIHandler();
    await uiHandler.displayGameDetails(gameId);
    loadingPage.classList.add("d-none");

    gameModal.classList.remove("fade");
    gameModal.classList.add("d-block");
  } else {
    loadingPage.classList.remove("d-none");
  }
});

modalCloseBtn.addEventListener("click", () => {
  gameModal.classList.add("fade");
  gameModal.classList.remove("d-block");
});
