const welcomBox = document.querySelector(".welcomBox");
const path = window.location.pathname;
const segments = path.split('/');
const gameId = segments[segments.length - 1];
// to load the welcome intro of the game
let myGame;
let games;
async function loadGames() {
    const response = await axios.get('/games/data');
    games = response.data;
    games.forEach(game => {
        if (gameId === game._id) {
            myGame = game;
            const gameItem = `
            <div class="box">
                <span class="welcomeIntro">
                    Welcome to GameZone, the hub for gamers to share their insights on their favorite
                    games. We've created a dynamic community where gamers from all walks of life can express their
                    thoughts
                    and critiques about gaming experiences. Whether you're a pro or casual player, our platform welcomes
                    your unique perspective.
                    <br><br>
                    Our user-friendly interface makes it easy to share reviews, rate games, and engage in discussions.
                    Discover new titles, revisit classics, and join the conversation about the gaming world. Your
                    opinions
                    count, and we can't wait to hear your thoughts on the games that matter to you. So, grab your
                    controller, sit back, and let's explore the gaming universe together at GameZone. Your
                    voice is essential in our gaming community!
                </span>
                <div class="img"><img src="${myGame.gameImage}" alt="${myGame.name}"></div>
                <div class="otherDetails">
                    <div class="nameAndPort">
                        <span class="name">${myGame.name}</span>
                        <span class="port">You can play it on ${myGame.platformName}</span>
                        <span class="details">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis saepe
                            laborum maxime numquam magnam expedita, alias harum quam nihil, molestiae iste esse deleniti
                            consectetur? Similique ducimus exercitationem voluptatibus voluptate iste rem doloremque
                            explicabo deleniti quaerat ullam, reprehenderit repellat fuga? Odio ducimus voluptates
                            excepturi earum omnis nisi sint voluptatibus hic, numquam debitis, expedita asperiores quas
                            dicta molestiae labore laborum corrupti repudiandae iure! Dolor amet facilis quod et
                            officiis est a possimus optio beatae nostrum quis ad suscipit vel provident, accusantium
                            neque nihil sed. Expedita deleniti veniam vero sapiente esse voluptas, nisi, repellendus
                            iste fuga odio repellat quia. Enim a quasi ipsa!</span>
                    </div>
                    <div class="rating">
                        <div class="allStars">
                            <div class="wel">
                                <i class='bx bxs-star'></i>
                            </div>
                            <div class="wel">
                                <i class='bx bxs-star'></i>
                            </div>
                            <div class="wel">
                                <i class='bx bxs-star'></i>
                            </div>
                            <div class="wel">
                                <i class='bx bxs-star'></i>
                            </div>
                            <div class="wel">
                                <i class='bx bxs-star'></i>
                            </div>

                        </div>
                        <span>Rating: ${myGame.rating}</span>
                    </div>

                </div>
            </div>
    `

            welcomBox.insertAdjacentHTML("afterbegin", gameItem);
            let welcomeStar = document.querySelectorAll(".wel");
            for (let index = 0; index < myGame.rating; index++) {
                console.log("yes");
                welcomeStar[index].classList.add('gold');
            }
            for (let index = myGame.rating; index < 5; index++) {
                
                welcomeStar[index].classList.add('white');
            }
        }
    });
}
loadGames();

//to get review data


