import { useScrollTrigger } from "@mui/material";
import React, { useRef } from "react";
import { useState } from "react";
import "../styles/videoComponent.css";


const server_url = "https://localhost:3000";
var connections = {};
const peerConfigConnections = {
    "iceServer" : [
        {"url" : "stun:stun.l.google.com:19302"}
    ]
}


export default function VideoMeet(){
    var socketRef = useRef();
    let socketIdRef = useRef();
    let localVideoRef = useRef();
    let [videoAvailable, setVideoAvailable] = useState(true);
    let [audioAvailable, setAudioAvailable] = useState(true);
    let [video,setVideo] = useState();
    let [audio,setAudio] = useState();
    let [screen,setScreen] = useState();
    let [showModal,setModal] = useState();
    let [screenAvailable,setScreenAvailable] = useState();
    let [messages,setMessages] = useState([]);
    let [message,setMessage] = useState("");
    let [newMessages,setNewMessages] = useState(0);
    let [askForUsername,setAskForUsername] = useState(true);
    let [username,setUsername] = useState("");

    const videoRef = useRef([]);
    let [videos,setVideos] = useState([]);

    return(
        <div>
        { askForUsername === true ? 
            
        }
        </div>
    )
}