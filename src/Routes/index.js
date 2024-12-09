import express from "express";
import { CheckAvailability, setAvailability } from '../AvailibiltyCheck/areaPinController.js'
import { RegisterUser, UpdateUser } from "../Users/userController.js";



// Router...
const Route = express.Router();

// Check status through PIN CODE
Route.post('/check-status', CheckAvailability)

// Set New area PIN code via Admin..
Route.post('/checkAvail', setAvailability)



// USERS....
// Register with otp..
Route.post('/users/otp', RegisterUser)  //register user and send OTP..
Route.patch('/user/update/:userID', UpdateUser)  //Complete / Update user data..

export default Route;