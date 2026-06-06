import { useScrollTrigger } from "@mui/material";
import React, { useRef } from "react";
import { useState ,useEffect } from "react";
import "../styles/videoComponent.css";
import {TextField , Button} from '@mui/material';


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


    const getPermission = async () =>{
        try{
            const videoPermission = await navigator.mediaDevices.getUserMedia({video : true});
            if(videoPermission){
                setVideoAvailable(true);
            }
            else{
                setVideoAvailable(false);
            }


            const audioPermission = await navigator.mediaDevices.getUserMedia({audio : true});
            if(audioPermission){
                setAudioAvailable(true);
            }
            else{
                setAudioAvailable(false);
            }


            if(navigator.mediaDevices.getDisplayMedia){
                setScreenAvailable(true);
            }
            else{
                setScreenAvailable(false);
            }


            if(videoAvailable || audioAvailable){
                const userMediaStream = await navigator.mediaDevices.getUserMedia({video : videoAvailable,audio : audioAvailable});
                if(userMediaStream){
                    window.localStream = userMediaStream;
                    if(localVideoRef.current){
                        localVideoRef.current.srcObject = userMediaStream;
                    }
                }

            }
        }catch(e){
            console.log(e);
        }
    }
    useEffect(() => {
        getPermission();
    })
    return(
        <div>
        { askForUsername === true ? 
            <div>
                <h2>Entyer into Lobby</h2>
                <TextField id="outlined-basic" label="Username" value = {username} onChange = {e => setUsername(e.target.value)} variant="outlined" />
                <Button variant="contained">Connect</Button> 


                <div>
                    <video ref={localVideoRef} autoPlay muted></video>
                </div>
            </div> : <></>
        }
        </div>
    )
}