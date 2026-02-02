import {asyncHandler} from "../utils/asyncHandler.js";
import  { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
const registerUser = asyncHandler(async(req,res) => {
    //get user deatils from frontend
    //vakiadtion - not empty
    //cehck if user already eixsts
    const {fullname,email,username,password} = req.body
    console.log("email:", email);
    if([fullname,email,username,password].some(field => field?.trim() === "")){
        throw new ApiError(400,"All fields are required")
    }
    const existedUser = await User.findOne({
        $or : [{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"User already exists")
    }
   const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverimage[0]?.path;
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar is required")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage =  await uploadOnCloudinary(coverImageLocalPath)
    if(!avatar){
        throw new ApiError(401,"Avatar file is required")
    }
    const user = await User.create({
        fullname,
        email,
        username,
        password,
        avatar : avatar.url,
        coverImage : coverImage?.url,
    })
    
    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    if(!createdUser){
        throw new ApiError(500,"User registration failed")
    }
    return res.status(201).json(new ApiResponse(200, createdUser, "User created successfully"));
})

export { registerUser }
