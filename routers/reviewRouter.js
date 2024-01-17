const express = require('express');
const reviewRouter = express.Router();

const { getPlanReviews, createReview, updateReview, deleteReview } = require('../controllers/reviewContoller');
const { protectRoute } = require('../controllers/userController')


reviewRouter.use(protectRoute);
reviewRouter
    .route('/:gameId')
    .get((req, res) => {
        res.sendFile('D:/Programming/web dev/gameReviewHub/public/html/reviewPage.html');
    });

reviewRouter
    .route('/data/:gameId')
    .get(getPlanReviews)

reviewRouter
    .route('/create/:gameId')
    .post(createReview)

reviewRouter
    .route('/changes/:reviewId')
    .patch(updateReview)
    .delete(deleteReview)

module.exports = reviewRouter;