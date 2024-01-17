const express = require('express');
const userRouter = express.Router();
const app = express();
const { createUser, loginUser, getCookie, isLoggedin, logout } = require('../controllers/userController')
userRouter.route("/signUp")
    .get((req, res) => {
        res.sendFile('D:/Programming/web dev/gameReviewHub/public/html/register.html')
    })
    .post(createUser)


userRouter.route("/login")
    .get((req, res) => {
        res.sendFile('D:/Programming/web dev/gameReviewHub/public/html/login.html')
    })
    .post(loginUser)


userRouter.route("/getCookie")
    .get(getCookie)


userRouter.route('/isLoggedin')
    .get(isLoggedin)

userRouter.route('/logOut')
    .get(logout)

module.exports = userRouter;