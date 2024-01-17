const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const db_link = process.env.DB_LINK;    

mongoose.connect(db_link)
.then(function(db) {
    // console.log(db);
    console.log("db connected");
})
.catch(function(err) {
    console.log(err);
})


const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        validate:function(){
            return emailValidator.validate(this.email);
        }
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:8,
        validate:function(){
            return this.confirmPassword==this.password;
        }
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    profileImage:{
        type:String,
        default:'img/users/default.jpeg'
    },
    resetToken:String
});

userSchema.pre('save',function(){
    console.log('before saving in database');   
    this.confirmPassword=undefined;
})



// userSchema.methods.createResetToken=function(){
//     const resetToken = crypto.randomBytes(32).toString("hex");
//     this.resetToken = resetToken;
//     return resetToken;
// }
// userSchema.methods.resetPasswordHandler=function(password,confirmPassword){
//     this.password = password;
//     this.confirmPassword = confirmPassword;
//     this.resetToken = undefined;
// }



const userModel = mongoose.model('userModel',userSchema);
module.exports=userModel;