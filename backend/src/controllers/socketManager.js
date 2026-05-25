import { Server } from "socket.io";

export const connectToSocket = (server) =>{
    return  new Server(server);
};
