import express from "express"
import { RegisterUser } from './userController.js'
const Route = express.Router();

// Create new User
Route.post('/user', RegisterUser)

// 


export default Route;
