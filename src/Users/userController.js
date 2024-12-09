import createHttpError from "http-errors";
import Joi from "joi";
import userModel from './userModel.js'
import otpModel from './otpSchema.js'
import userRegisterSchema from "./userRegisterValidateSchema.js";




const RegisterUserValidateSchema = Joi.object({
    mobileNum: Joi.string().length(10).pattern(/^[0-9]+$/).required()
});


// Register User with Mobile Number..
const RegisterUser = async (req, res, next) => {
    try {
        const { mobileNum } = req.body;

        const { error, reqData } = RegisterUserValidateSchema.validate(req.body)

        if (error) {
            next(createHttpError(400, "Please fill the form carefully"))
            return
        }


        // On Success...
        //   Dummy OTP forUser verification..
        function generateOTP() {
            const newOtp = Math.floor(1000 + Math.random() * 9000);
            return newOtp.toString()
        }
        const newOtp = generateOTP()

        const isUserExists = await userModel.findOne({ userModel })
        if (isUserExists) {
            const newUserOtp = await otpModel.create({ otp: newOtp, userId: isUserExists.id })
            isUserExists.otp = newUserOtp.id;
            await isUserExists.save();

            return res.status(200).json({
                success: true,
                id: newUserOtp.id,
            });
        }

        // for new User store user details and genrate OTP..

        const _newOtp = await otpModel.create({ otp: newOtp, userId: null })
        const user = await userModel.create({ mobileNum, otp: _newOtp.id });
        _newOtp.userId = user.id;
        await _newOtp.save()


        return res.json(
            {
                success: true,
                user: user,
                otp: _newOtp
            }
        )

    } catch (error) {
        console.log(error);
        return
    }



    //  insert user Mobile number into Db..
    //  Genrate OTP using MAth obj
    //  store otp into db 
    // if all is good return success


}


// Validate SChema for OTP

const otpValidateSchema = Joi.object({
    id: Joi.string().required(),
    mobileNum: Joi.string().required()
})


const verifyOTP = async (req, res, next) => {
    try {
        //get otp ID and mobileNum from client 

        const { id, mobileNum } = req.body;

        const { error, reqData } = otpValidateSchema.validate(req.body);

        // validate otp data types 
        if (error) {
            return next(createHttpError(401, "Please fill the form carefully.."))
        }


        //  validate otp from database

        const otpFromDB = await otpModel.findById({ id })
        if (!otpFromDB) {
            return next(createHttpError(401, "Invalid Otp"))
        }

        // On success of Otp..


        //  validate mobile number from database too

        const user = await userModel.findOne({ mobileNum })
        if (!user) {
            return next(createHttpError(401, "Invalid Otp"))
        }




        // also verify otp Expire time 

        // after login user in our system..




    } catch (error) {

    }
}






const UpdateUser = async (req, res, next) => {
    // isVerified => if user all data Like (Name,age,gender,address, areaPin, role)

    const userID = req.params.userID;
    const { fullName, age, gender, address, role, areaPin } = req.body;

    const { error, value } = userRegisterSchema.validate(req.body)

    if (error) {
        next(createHttpError(401, "Please fill the form craefully.."))
    }

    if (!userID) {
        next(createHttpError(401, "User Id Required.."))
    }

    try {
        const isExistingUser = await userModel.findById(userID)
        if (!isExistingUser) {
            next(createHttpError(401, "User Id Not found...."))
        }

        // Update all the details..
        isExistingUser.fullName = fullName;
        isExistingUser.age = age;
        isExistingUser.gender = gender;
        isExistingUser.address = address;
        isExistingUser.role = role;
        isExistingUser.areaPin = areaPin;

        if (isExistingUser.fullName &&
            isExistingUser.age &&
            isExistingUser.gender &&
            isExistingUser.address &&
            isExistingUser.role &&
            isExistingUser.areaPin
        ) {
            isExistingUser.isVerified = true;
        }

        await isExistingUser.save();


        // Temp..
        res.json({
            success: "true",
            msg: "Successfully user data updated..",
            user: isExistingUser

        })
    } catch (error) {
        next(createHttpError(401, `${error.message}`))
    }

}






export { RegisterUser, UpdateUser }

