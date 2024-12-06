import createHttpError from "http-errors"
import userRegisterSchema from './Schema.js'
import Joi from "joi";

const RegisterUser = (req, res, next) => {
    try {
        // For the first Time User Register 
        //with OTP so i only need person Phone number not Other Details.
        // we will create Schema for the user only with their contact number..
        res.json({ msg: "Hello.." })
        const {
            fullName,
            mobileNum,
            age,
            gender,
            avatar,
            address,
            areaPin,
            role,
            accessToken,
            isVerified
        } = req.body;

        const userReqData = { fullName, mobileNum, age, gender, avatar, address, areaPin, role, accessToken, isVerified }

        const userData = Joi.validate(userReqData, userRegisterSchema);

        console.log(userData);

        return;

    } catch (error) {
        createHttpError(400, `Something went wrong on UserController ${error.message}`);
        return;
    }
}


export { RegisterUser }