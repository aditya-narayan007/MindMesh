import { Server } from "socket.io";

let connections = {};
let messages = {};
let timeOnline = {};

export const connectToSocket = (server) =>{
    const io = new Server(server , {
        cors : {
            origin : "*",
            methods : ["GET","POST"],
            allowedHeaders : ["*"],
            credentials: true
        }
    });

    io.on("connection" , (socket) => {
        socket.on("join-call" , (path) => {
            // This function listens to an event listener from the frontend named - "join-call" when this event listener is encountered 
            // it connects the user to a room send messgae to all the user that this particular person has joined and send him/her all the previous messages
        
            if(connections[path] === undefined){ // check if that room (meeting room) existes or not if not
                connections[path] = []; // makes a room
            }
            connections[path].push(socket.id); // put the current user onto the room
            timeOnline[socket.id] = new Date(); // mark the time of connection

            for(let a = 0; a < connections[path].length; a++){ // send connection notification to all the user
                io.to(connections[path][a]).emit("user-joined" , socket.id , connections[path]); // sends other notification that new user has joined    
            }

            if(messages[path] !== undefined){ // sends previous messages to the user
                for(let a = 0;a < messages[path].length ; ++a){ 
                    io.to(socket.id).emit("chat-message" , messages[path][a]['data'] , messages[path][a]['sender'],messages[path][a]['socket-id-sender']);
                }
            }
        });

        socket.on("signal" , (toId , message) => {
            //When one user sends WebRTC connection data,forward it to another user
            io.to(toId).emit("signal",socket.id,message);
        });

        socket.on("chat-message" , (data , sender) => {
            // When a user sends a message:
            // 1. Find which room the user belongs to
            // 2. Save the message
            // 3. Send the message to everyone in that room
            const [matchingRoom , found] = Object.entries(connections) //Search all rooms and find which room contains current socket.id
            .reduce(([room , isFound] ,[roomKey , roomValue]) => {
                if(!isFound && roomValue.includes(socket.id)){
                    return [roomKey , true];
                }
                return [room , isFound];
            },['',false]);
            if(found === true){ //message saving
                if(messages[matchingRoom] === undefined){
                    messages[matchingRoom] = [];
                }
                messages[matchingRoom].push({'sender' : sender, 'data' : data, "socket-id-sender" : socket.id });
                console.log("message" , key, ":" , sender,data);
                connections[matchingRoom].forEach(element => { // sends message to all present in the room
                    io.to(element).emit("chat-message",data,sender,socket.id);
                });
            }
        });

        socket.on("disconnect" , () => {
            //"What should happen when a user leaves/disconnects?"
            // 1. Detect user left
            // 2. Find user's room
            // 3. Notify everyone
            // 4. Remove user from room
            // 5. Delete empty room
            var diffTime = Math.abs(timeOnline[socket.id] - new Date())
            var key;
            for(const [k,v] of Object.entries(connections)){
                for(let a = 0;a < v.length ; a++){
                    if(v[a] === socket.id){ // matches  which user left which room
                        key = k; 
                        for(let a = 0;a < connections[key].length ; a++){ // sends message to everyone on that room 
                            io.to(connections[key][a]).emit('user-left',socket.id);
                        }
                        var index = connections[key].indexOf(socket.id); // finding index to remove the user
                        connections[key].splice(index,1); // remove user from that room
                        if(connections[key].length === 0){ // remove the room if there is no user present in the room
                            delete connections[key];
                        }
                    }
                }
            } 
        });
    })

    return io;

};
