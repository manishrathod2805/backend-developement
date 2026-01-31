import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrpt from "bcryptjs";
const userSchema = new Schema (
        {
            username : 
            {type:String,
             required : true,
             unique : true,
             lowercase : true,
             trim : true,
             index : true,
            },
            email : 
            {type:String,
             required : true,
             unique : true,
             lowercase : true,
             trim : true,
            },
            fullname : 
            {type:String,
             required : true,
             trim : true,
             index : true,
            },
            avatar : 
            {
                type : String,
                required : true,
            },
            coverImage : {
                type : String,

            },
            watchHistory : [
                    {
                     type : Schema.Types.ObjectId,
                      ref: "Video",

                      }
                            ],  
            password : 
            {
                type :String,
                required : [true, "Password is required"]
            },
            refreshTokens : 
            {
                type : String,

            }             


        },
        {timestamps : true}
    )
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrpt.hash(this.password, 10);
    next();
})
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrpt.compare(password, this.password);
}
userSchema.methods.generateAccessToken = function (){
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET, // Make sure to set JWT_SECRET in your environment variables
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m' } // Token expiry time
    );
} 
userSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET, // Make sure to set JWT_SECRET in your environment variables
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d' } // Token expiry time
    );
} 
export const User = mongoose.model("User", userSchema);