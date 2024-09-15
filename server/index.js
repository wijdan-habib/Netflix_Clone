import express from 'express';
import authRoute from './routes/auth.route.js'
import mongoose from 'mongoose';
import movieRoute from "./routes/movie.route.js"
import tvRoute from "./routes/tv.route.js"
import searchRoute from "./routes/search.route.js"
import cookieParser from 'cookie-parser';
import { protectedRoute } from './middleware/protectedRoute.js';
// import { ENV_VARS } from './config/enVars.js';
const app = express();
const port = 3000

mongoose.connect("mongodb://localhost:27017/Netflix-Clone")
.then(() => {
    console.log('mongodb connected')
}).catch((err) => {
    console.log(err)
})
app.use(express.json())
app.use(cookieParser())
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/movie",protectedRoute, movieRoute)
app.use("/api/v1/tv",protectedRoute, tvRoute)
app.use("/api/v1/search",protectedRoute, searchRoute)


app.listen(port,() => {
    console.log(`server started successfully at server ${port}`)
})


