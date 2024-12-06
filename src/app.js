import express from "express";
import Route from "./Users/userRoute.js";
const app = express();



// Register User...
app.use('/api', Route)
app.get('/', (req, res, next) => {
    res.json({ msg: "working...." })
})

export default app