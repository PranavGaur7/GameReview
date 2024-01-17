const gamesModel = require('../model/gameModel');
// const apiKey = GAME_API;
const apiKey = process.env.API_KEY_GAME;
const url = `https://api.rawg.io/api/games?key=${apiKey}&dates=2023-01-01,2023-06-30&ordering=-added`;
let nextGameListUrl = null;
function getPlatform(game) {
    let platForms = "";
    let platFormList = game.parent_platforms;
    platFormList.forEach(element => {
        platForms = platForms + element.platform.name + ",";
    });
    platForms = platForms.slice(0, -1);
    return platForms;
}

const gameData = [];

module.exports.deleteAllGames = async function deleteAllGames(req,res){
    try {
        await gamesModel.deleteMany();
        return res.json({
            message:"all Games Deleted succesfully"
        })
    } catch (error) {
        res.json({
            message:error
        })
    }
}

module.exports.postAllGames = async function postAllGames(req, res) {

    try {
        await fetch(url)
            .then(response => response.json())
            .then(data => {
                nextGameListUrl = data.next ? data.next : null;
                const games = data.results;
                games.forEach(game => {
                    let gameItem = {
                        gameImage: game.background_image,
                        name: game.name,
                        platformName: getPlatform(game),
                        rating: Math.round(game.rating)
                    }
                    gameData.push(gameItem);

                });

            })
        if (gameData) {
            await Promise.all(gameData.map(async (game) => {
                await gamesModel.create(game);
            }));
        }
    } catch (error) {
        res.json({
            message: error
        })
    }
}

module.exports.getAllGames = async function getAllGames(req, res) {
    try {
        const gamesData = await gamesModel.find();
        if (gamesData) {
            return res.json(gamesData);
        }
        else {
            res.json({
                message: "unable to retrieve data"
            })
        }
    } catch (error) {
        res.json({
            message: error
        })
    }
}