import  express  from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import {config} from "dotenv";
import cors from "cors";
import userRoutes from "./Router/user.js"
import vidioroutes from "./Router/Vidio.js";
import comentsRoutes from "./Router/Coment.js"

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
config({
  path: "config.env",
});
const connect = ()=>{
  mongoose.connect(process.env.MONGO_URL,{
    dbName: "Youtube",
  }).then(()=>{
    console.log("Moongodb is connected");
  })
}

app.use("/api/auth", userRoutes);
app.use("/api/vidio",vidioroutes);
app.use("/api",comentsRoutes);

app.listen(process.env.PORT,()=>{
  connect();
  console.log(`App listening on port ${process.env.PORT}`);
})