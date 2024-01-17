const { json } = require('express');
const reviewModel = require('../model/reviewModel');
const gameModel = require('../model/gameModel');
const apiKey = '987ae294a9044676b06cb661c728d351';
const url = `https://api.rawg.io/api/games?key=${apiKey}&dates=2023-01-01,2023-06-30&ordering=-added`;
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;
module.exports.getPlanReviews = async function getPlanReviews(req, res) {
    try {
        const gameId = req.params.gameId;
        let reviews = await reviewModel.find();
        reviews = reviews.filter(review => review.game._id == gameId);

        return res.json(reviews)
    } catch (error) {
        res.json({
            message: error
        })
    }

}

module.exports.createReview = async function createReview(req, res) {
    try {
        const gameId = req.params.gameId;
        let token = req.cookies.login;
        console.log('yes');
        let payload = jwt.verify(token, JWT_KEY);
        const userId = payload.payload;
        const data = {
            review: req.body.review,
            rating: req.body.rating,
            user: userId,
            game: gameId
        }
        const review = await reviewModel.create(data);
        const game = await gameModel.findById(gameId);
        let myRating = Math.round((Number.parseInt(game.rating) + Number.parseInt(data.rating)) / (Number.parseInt(game.rateCount)  + 1));
        if(myRating>1){
            game.rating = myRating ;
        }
        else{
            game.rating=1;
        }
        game.rateCount = game.rateCount + 1;
        await game.save();
        return res.json({
            message: "review created successfully",
            reviewData: data
        })
    } catch (error) {
        res.json({
            message: error
        })
    }

}
module.exports.updateReview = async function updateReview(req, res) {
    try {
        const reviewId = req.params.reviewId;
        let review = await reviewModel.findById(reviewId);
        const updateData = req.body;
        let keys=[];
        for(let key in updateData){
            keys.push(key);
        }
        for(let i = 0;i<keys.length;i++){
            review[keys[i]] = updateData[keys[i]];
        }
        review.save();
        return res.json({
            message: "review updated successfully",
            reviewData: updateData
        })
    } catch (error) {
        res.json({
            message: error
        })
    }

}
module.exports.deleteReview = async function deleteReview(req, res) {
    try {
        const reviewId = req.params.reviewId;
        const review = await reviewModel.findByIdAndDelete(reviewId);
        return res.json({
            message: "review deleted successfully",
            reviewData: review
        })
    } catch (error) {
        res.json({
            message: error
        })
    }

}

