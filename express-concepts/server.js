import dotenv from "dotenv"
import express from "express"
import { configureCors } from "./corsConfig/corsConfig.js"
import { addTimeStamp, requestLogger } from "./middleware/customMiddleware.js"
import { globalErrorHandler, ApiError } from "./middleware/errorHandler.js"
import { urlVersioning, headerVersioning, contentTypeVersion } from "./middleware/apiVersioning.js"
import { createRateLimit } from "./middleware/rateLimit.js"
import itemRoutes from "./routes/item-routes.js"

//By doing so you can able to acess the env things
dotenv.config()
const PORT = process.env.PORT || 2000

const app = express()

//Limit
app.use(createRateLimit(100, 15*60*1000)) // 100 request per 15 min

//Using our custom middleware here
app.use(requestLogger)
app.use(addTimeStamp)

//Using express.json() middleware thing
//What it does ? -> Actually parse the data so we can easily acess the req.body thing
//Whenever frontend share the JSON data to backend
app.use(express.json())

//----> detail explanation of cors go to corsConfig
app.use(configureCors())

//Api versioning
app.use(urlVersioning('v1'))

app.use('/api/v1', itemRoutes)

//this will handle unknown routes
app.use((req, res, next) => {
    // This will only run if no previous route matched
    next(new ApiError(`Route ${req.originalUrl} not found`, 404));
});

//Using our error handler
app.use(globalErrorHandler)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})