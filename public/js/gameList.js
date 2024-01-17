
let gameList = document.querySelector(".games");




async function loadGames() {
    const response = await axios.get('/games/data');
    const games = response.data;
    console.log("yes");
    console.log(games);
    games.forEach(game => {
        const gameItem = `
    <div class="box">
        <div class="img"><img src="${game.gameImage}" alt="${game.name}"></div>
        <div class="otherDetails">
            <div class="nameAndPort">
                <span class="name">${game.name}</span>
                <span class="port">${game.platformName}</span>
            </div>
            <div class="rating">
                <i class='bx bxs-star'></i>
                <span>${game.rating}</span>
            </div>
    
        </div>
        <div class="seeReviews">
            <div>
                <a href="/review/${game._id}" value="${game._id}">See Reviews</a>
                <i class='bx bx-right-arrow-circle'></i>
            </div>
    
        </div>
    </div>
    `
        gameList.insertAdjacentHTML("beforeend", gameItem);

    });
}


loadGames();