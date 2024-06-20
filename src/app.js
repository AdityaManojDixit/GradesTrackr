import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; //Access cookies stored in user's brower using server and perform crud operations on them.
const app = express();

//app.use method is used in Express.js to mount middleware functions.
//CORS middleware adds the necessary HTTP headers to enable cross-origin requests. 
app.use(cors({
    origin : process.env.CORS_ORIGIN, //Specifies the allowed origins for requests. 
    credentials : true //Whether to include credentials such as cookies or authorization headers in cross-origin requests. 
}))

//Data arrives at backend from various sources i.e. URL, JSON, form, etc.
app.use(express.json({limit : '2000kb'})) //Middleware to parse JSON-encoded request bodies and make it available in req.body.Specifies the allowed limit for JSON data.
app.use(express.urlencoded({extended: true, limit: '20kb'})) //Middleware to parse URL-encoded request bodies.
app.use(express.static("public")) //Serving static files from a specified directory i.e. app.use(express.static('public')) would serve files from the public directory
app.use(cookieParser()) //It parses cookies attached to the client's request object (req.cookies) and makes them available for use in the application.
//app.use(bodyParser.json());
//Importing Routes
import userRouter from "./routes/user.routes.js";

//Routes Declaration
app.use("/api/v1", userRouter) //http://localhost:8000/api/v1/users/register


export { app };