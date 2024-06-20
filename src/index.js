import React from 'react';
import ReactDOM from 'react-dom/client';
import connectDB from "./db/conn.js";
import dotenv from "dotenv";
import {app} from "./app.js";

dotenv.config({ path: ".env" });


//Connecting with MongoDB.
connectDB() //Async function. Returns a promise handled with .then & .catch methods.
.then(()=>{
    //Event listener on "error" event.
    app.on("error", (error)=>{
        console.log("ERRR:", error);
        throw error;
    })
    // "app.listen" method is used to start a server and listen for incoming connections on a specified port.
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running at port ${process.env.PORT }`);
    })
})
.catch((err)=>{
    console.log('MongoDB connection failed!', err)
})


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );






