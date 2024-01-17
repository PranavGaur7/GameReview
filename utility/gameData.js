const apiKey = process.env.API_KEY_GAME;
const url = `https://api.rawg.io/api/games?key=${apiKey}&dates=2023-01-01,2023-06-30&ordering=-added`;
let nextGameListUrl = null; 
function getPlatform(game){
    let platForms = "";
    let platFormList = game.parent_platforms;
    platFormList.forEach(element => {
        platForms = platForms + element.platform.name +",";
    });
    platForms = platForms.slice(0,-1);
    return platForms;
}

const gameData=[];

async function loadGames(url) {
    await fetch(url)
        .then(response => response.json())
        .then(data => {
            nextGameListUrl = data.next ? data.next : null;
            const games = data.results;
            games.forEach(game => {
                let gameItem ={
                    gameImage:game.background_image,
                    name:game.name,
                    platformName:getPlatform(game),
                    rating:game.rating
                }
                gameData.push(gameItem);
                
            });
            
        })

}
async function fetchDataAndExport() {
    await loadGames(url);
    console.log(gameData);
    module.exports = gameData;
}

fetchDataAndExport();

