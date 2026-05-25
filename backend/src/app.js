import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import { connectToSocket } from "./controllers/socketManager.js";


const app = express();
const port = 3000;
const server = createServer(app);
const io = connectToSocket(server);
app.use(cors);

app.use(express.json({limit : "40kb"}));
app.use(express.urlencoded({limmit : "40kb",extended : true}));


main().catch(err => console.log(err));

async function main() {
  const connectiondb = await mongoose.connect('mongodb+srv://2005adityagoswami_db_user:nAIU2tzcANO9D0SI@mindmesh.kjm6gko.mongodb.net/?appName=MindMesh');
  console.log(`MONGO connection host : ${connectiondb.connection.host}`);
}

app.get('/',(req,res) => {
    res.send("hello everyone !");
});

server.listen(port,() => {
    console.log(`app is listening at port : ${port}`);
});

