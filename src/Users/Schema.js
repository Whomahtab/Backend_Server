import Joi from "joi";


const userRegisterSchema = Joi.object({
    // fullName: Joi.string().min(3).max(),
    // mobileNum: Joi.string().min(3).max(),
    // age: Joi.string().mx(25),
    // gender: Joi.string().max(15),
    // avatar: Joi.string().max(100),
    // address: Joi.string().max(150),
    // areaPin: Joi.string().max(20),
    // role: Joi.string(),
    // accessToken: Joi.string(),
    // isVerified: Joi.boolean()
}, { timestamps: true });

export default userRegisterSchema

// 01/02/2024