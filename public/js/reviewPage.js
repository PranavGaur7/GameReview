const welcomBox = document.querySelector(".welcomBox");
const path = window.location.pathname;
const segments = path.split('/');
const gameId = segments[segments.length - 1];
const allReviews = document.querySelector('.allReviews');

//to load the page
async function loadPage() {
    const response = await axios.get('/games/data');
    let games = response.data;

    const resp = await axios.get(`/review/data/${gameId}`)
    let reviews = resp.data;
    console.log(reviews);
    const resp2 = await axios.get("/user/getCookie");
    let userId = resp2.data;
    loadGames(games);
    loadReviews(reviews, userId);

    reviews.forEach(review => {
        if (userId.payload === review.user._id) {
            let reviewId = review._id;
            wipeReview(reviewId);
        }
    });
}

// to load the welcome intro of the game

function loadGames(games) {
    games.forEach(game => {
        if (gameId === game._id) {
            let myGame = game;
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
                welcomeStar[index].classList.add('gold');
            }
            for (let index = myGame.rating; index < 5; index++) {

                welcomeStar[index].classList.add('white');
            }
        }
    });
}

//to get review data

function loadReviews(reviews, userId) {
    let reviewExist = false;
    reviews.forEach(review => {
        if (userId.payload === review.user._id) {
            reviewExist = true;
            const reviewItem = `
            <div class="userReview">
            <div class="toCreate hide">
                <div class="giveReviewHere">
                    <span>You can give review here </span>
                </div>
                <div class="reviewForm">
                    <form action="">
                        <input type="text" placeholder="Write your opinion on the game">
                        <div class="giveRating" value="5">
                            <i class='bx bxs-star' value="1"></i>
                            <i class='bx bxs-star' value="2"></i>
                            <i class='bx bxs-star' value="3"></i>
                            <i class='bx bxs-star' value="4"></i>
                            <i class='bx bxs-star' value="5"></i>
                        </div>
                        <button>Submit</button>
                    </form>
                </div>
            </div>
            <div class="afterReview ">
                <h1>Your Review</h1>
                <span >${review.review}</span>
                <div class="afterGiveRating" >
                    <div class="aft">
                        <i class='bx bxs-star' ></i>
                    </div>
                    <div class="aft">
                        <i class='bx bxs-star' ></i>
                    </div>
                    <div class="aft">
                        <i class='bx bxs-star' ></i>
                    </div>
                    <div class="aft">
                        <i class='bx bxs-star' ></i>
                    </div>
                    <div class="aft">
                        <i class='bx bxs-star' ></i>
                    </div>
                </div>
                <div class="btns">
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </div>
            </div>
        </div>`
            welcomBox.insertAdjacentHTML("afterend", reviewItem);
            let afterStar = document.querySelectorAll(".aft");
            for (let index = 0; index < review.rating; index++) {
                afterStar[index].classList.add('gold');
            }
            for (let index = review.rating; index < 5; index++) {

                afterStar[index].classList.add('white');
            }
        }
        else {
            const reviewItem = `
            <div class="otherReviews">
                <span >${review.review}</span>
                <div class="otherRating">
                    <div class="oth">
                        <i class='bx bxs-star' ></i>
                    </div>
                    <div class="oth">
                        <i class='bx bxs-star' ></i>
                    </div>
                    <div class="oth">
                        <i class='bx bxs-star' ></i>
                    </div>
                    <div class="oth">
                        <i class='bx bxs-star' ></i>
                    </div>
                    <div class="oth">
                        <i class='bx bxs-star' ></i>
                    </div>
                </div>
            </div>`
            allReviews.insertAdjacentHTML('afterend', reviewItem);
            let otherStar = document.querySelectorAll(".oth");
            for (let index = 0; index < review.rating; index++) {
                otherStar[index].classList.add('gold');
            }
            for (let index = review.rating; index < 5; index++) {

                otherStar[index].classList.add('white');
            }
        }
    });
    if (!reviewExist) {
        const reviewItem = `
            <div class="userReview">
            <div class="toCreate">
                <div class="giveReviewHere">
                    <span>You can give review here </span>
                </div>
                <div class="reviewForm">
                    <form action="">
                        <input type="text" placeholder="Write your opinion on the game">
                        <div class="giveRating" data-value="5">
                            <div class="createStar white" data-value="1">
                                <i class='bx bxs-star' ></i>
                            </div>
                            <div class="createStar white" data-value="2">
                                <i class='bx bxs-star' ></i>
                            </div>
                            <div class="createStar white" data-value="3">
                                <i class='bx bxs-star' ></i>
                            </div>
                            <div class="createStar white" data-value="4">
                                <i class='bx bxs-star' ></i>
                            </div>
                            <div class="createStar white" data-value="5">
                                <i class='bx bxs-star' ></i>
                            </div>
                        </div>
                        <button>Submit</button>
                    </form>
                </div>
            </div>
            <div class="afterReview hide">
                <h1>Your Review</h1>
                <span ></span>
                <div class="afterGiveRating" >
                    <div class="aft">
                        <i class='bx bxs-star' ></i>
                    </div>
                    <div class="aft">
                        <i class='bx bxs-star' ></i>
                    </div>
                    <div class="aft">
                        <i class='bx bxs-star' ></i>
                    </div>
                    <div class="aft">
                        <i class='bx bxs-star' ></i>
                    </div>
                    <div class="aft">
                        <i class='bx bxs-star' ></i>
                    </div>
                </div>
                <div class="btns">
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
        </div>`
        welcomBox.insertAdjacentHTML("afterend", reviewItem);
        let input = document.querySelector('.reviewForm form input');
        let createStar = document.querySelectorAll('.createStar');
        let submit = document.querySelector('.reviewForm form button')
        createStar.forEach(star => {
            star.addEventListener('click', (e) => {
                let review = input.value;
                let rating = star.getAttribute('data-value');

                for (let index = 0; index < rating; index++) {
                    createStar[index].classList.remove('white');
                    createStar[index].classList.add('gold');
                }
                for (let index = rating; index < 5; index++) {

                    createStar[index].classList.add('white');
                }
                submit.addEventListener('click', (e) => {
                    e.preventDefault();
                    postReview(review, rating, userId, gameId);
                })

            })
        })

    }
}

//to delete review

async function wipeReview(reviewId) {
    const del = document.querySelector('.delete');
    del.addEventListener('click', (e) => {
        e.preventDefault();
        deleteReview(reviewId);
    })
}

loadPage();

async function deleteReview(reviewId) {
    await axios.delete(`/review/changes/${reviewId}`);
    location.reload();
}
async function postReview(review, rating, userId, gameId) {
    const response = await axios.post(`/review/create/${gameId}`, {
        review: review,
        rating: rating
    });
    location.reload();
}



loginCheck();

