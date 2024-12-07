import express from "express";
import Route from "./Routes/index.js";
import globalErrorHandler from "./middleware/ErrorHandler.js";
const app = express();
app.use(express.json())


//Client_API
app.use('/api', Route)


app.get('/', (req, res, next) => {
    res.json({ msg: "working...." })
})

// Error handling middleware
app.use(globalErrorHandler);

export default app