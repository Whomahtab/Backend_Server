import express from "express";
// Import all the controller and place them 
import { CheckAvailability, setAvailability } from '../AvailibiltyCheck/areaPinController.js'



// Router...
const Route = express.Router();

// Check status through PIN CODE
Route.get('/checkAvail', CheckAvailability)

// Set New area PIN code via Admin..
Route.post('/checkAvail', setAvailability)


Route.get('/', (req, res, next) => {
    res.json({ msg: "...." })
})


export default Route;