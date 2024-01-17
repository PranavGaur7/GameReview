const express = require('express');
const gameRouter = express.Router();
const { getAllGames, postAllGames, deleteAllGames } = require("../controllers/gamesController")

gameRouter.route('/')
    .get((req, res) => {
        res.sendFile('D:/Programming/web dev/gameReviewHub/public/html/gameList.html')
    })

gameRouter.route('/data')
    .get(getAllGames)

gameRouter.route('/uploadGames')
    .get(deleteAllGames)
    .post(postAllGames)

module.exports = gameRouter;