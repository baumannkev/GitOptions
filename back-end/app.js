import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import "dotenv/config"
import optionRouter from "./routes/options.js"
import cors from "cors"
const app = express();

app.use(cors())

app.use(bodyParser.json())

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, () => {
        console.log("connected to DB")
    })
    //listen to the server

//     const allowedOrigins = ['http://127.0.0.1:5173']
//     const corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

app.use(function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});
app.use('/api', optionRouter)
app.listen(3002, function() {
    console.log('Hey server is running on port 3002');
})