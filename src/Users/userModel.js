import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    fullName: { type: string, require: false },
    age: { type: string, require: false },  //01/02/21997
    gender: { type: string, require: false },
    mobileNum: { type: string, require: true, unique: true },
    avatar: { type: string, },
    address: { type: string, require: false },
    areaPin: { type: string, require: false },
    role: { type: string, require: false },
    accessToken: { type: string },
    isVerified: { type: Boolean }
})

const userModel = mongoose.model("user", userSchema)
export default userModel;


// 
//  making 
// 
// 