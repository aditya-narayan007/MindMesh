import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/user.routes.js"
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT;
const server = createServer(app);
const io = connectToSocket(server);
app.use(cors());

app.use(express.json({limit : "40kb"}));
app.use(express.urlencoded({limit : "40kb",extended : true}));

app.use("/api/user", userRoutes);
main().catch(err => console.log(err));

async function main() {
  const connectiondb = await mongoose.connect(process.env.MONGO_URL);
  console.log(`MONGO connection host : ${connectiondb.connection.host}`);
}

app.get('/',(req,res) => {
    res.send("hello everyone !");
});

server.listen(port,() => {
    console.log(`app is listening at port : ${port}`);
});

