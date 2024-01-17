const mongoose = require('mongoose');
const db_link = process.env.DB_LINK;//create your mongodb link
mongoose.connect(db_link)
.then(function(db) {
    // console.log(db);
    console.log("game db connected");
})
.catch(function(err) {
    console.log(err);
})

const gameSchema = mongoose.Schema({
    gameImage:{
        type:String,
        default:'D:/Programming/web dev/gameReviewHub/public/img/bg1.jpeg'
    },
    name:{
        type:String,
        required:true
    },
    platformName:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    rateCount:{
        type:Number,
        default:1
    }
})

const gameModel = mongoose.model('gameModel',gameSchema);
module.exports = gameModel;