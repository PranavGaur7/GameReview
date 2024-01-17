const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;
module.exports.createUser = async function createUser(req,res){
    try {
        const data = req.body;
        const userData = await userModel.create(data);
        if(userData){
            return res.json({
                message:"signUp successfull",
                data:userData
            })
        }
        else{
            res.json({
                message:"send user data"
            })
        }
    } catch (error) {
        res.json({
            message:error
        })
    }
}

module.exports.loginUser = async function loginUser(req,res){
    try {
        const data = req.body;
        if(data.email){
            let user = await userModel.findOne({email: data.email});
            if(user){
                if(user.password == data.password){
                    let uid = user['_id'];//uid
                    let token = jwt.sign({ payload: uid }, JWT_KEY);
                    res.cookie('login', token, { httpOnly: true });
                    return res.json({
                        message:"user loggedin successfully",
                        data:data
                    })
                }
                else{
                    res.json({
                        message:"incorrect credentials"
                    })
                }
            }
            else{
                res.json({
                    message:"user not found"
                })
            }
        }
        else{
            res.json({
                message:"send an email"
            })
        }
    } catch (error) {
        res.json({
            message:error
        })
    }
}

module.exports.protectRoute = async function protectRoute(req, res, next) {
    let token;
    if (req.cookies.login) {
        token = req.cookies.login;
        let payload = jwt.verify(token, process.env.JWT_KEY);
        if (payload) {

            const user = await userModel.findById(payload.payload)
            req.role = user.role;
            req.id = user.id;
            next();
        }
        
    }
    else {
        res.redirect('/user/signUp');
    }
}

module.exports.getCookie = async function getCookie(req,res){
    let token = req.cookies.login;
    let userId = jwt.verify(token, process.env.JWT_KEY);
    return res.json(userId);
}

module.exports.isLoggedin = async function isLoggedin(req,res){
    let token;
    if (req.cookies.login) {
        token = req.cookies.login;
        let payload = jwt.verify(token, process.env.JWT_KEY);
        if (payload) {
            res.json({success:true});
        }
        
    }
}

module.exports.logout = function logout(req,res){
    res.cookie('login',' ',{maxAge:1});
}