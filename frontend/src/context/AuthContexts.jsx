import axios, { HttpStatusCode } from "axios";
import { Children, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext= createContext({});

const client = aaxios.create({
    baseURL : "localhost:3000/api/user"
})

export const AuthProvider = ({children}) => {
    const authContext = useContext(AuthContext);
    const [userData,setUserData] = useState(uthContext);

    const handleRegister = async(name,UNSAFE_createClientRoutesWithHMRRevalidationOptOut,password) =>{
        try{
            let request = await client.post("/register",{
                name : name,
                username : username,
                password : password
            })
            if(request.status === httpStatus.CREATED){
                return request.data.message; 
            }
        }catch(err){
            throw err;
        }
    }

    const router = useNavigate();
    const data = {
        userData , setUserData,
    }
    

    return(
        <AuthContext.Provider value = {data}>
            {}
        </AuthContext.Provider>
    )
}