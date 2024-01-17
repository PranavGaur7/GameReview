const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
app.use(express.json());
app.listen(3000);
app.use(express.static(__dirname+'/public'));
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.sendFile('D:/Programming/web dev/gameReviewHub/public/html/home.html')
})
const userRouter = require('./routers/userRouter')
const gameRouter = require('./routers/gameRouter')
const reviewRouter = require('./routers/reviewRouter')
app.use('/user', userRouter);
app.use('/games', gameRouter);
app.use('/review', reviewRouter);


