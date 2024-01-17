const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const db_link = process.env.DB_LINK;
mongoose.connect(db_link)
.then(function(db) {
    // console.log(db);
    console.log("review db connected");
})
.catch(function(err) {
    console.log(err);
})

const reviewSchema = mongoose.Schema({
    review:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'userModel',
        required:true
    },
    game:{
        type:mongoose.Schema.ObjectId,
        ref:'gameModel',
        required:true
    }

})

reviewSchema.pre(/^find/,function(next){
    this.populate({
        path:"user",
        select:"email"
    }).populate("game");
    next();
})

const reviewModel = mongoose.model('reviewModel',reviewSchema);

module.exports = reviewModel;