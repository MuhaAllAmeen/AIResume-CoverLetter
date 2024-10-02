'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import apiService from "../services/api";
import { handleLogin } from "../services/token";
import CredentialsInput from "@/components/input/credentialsInput";
import SpecialBtn from "@/components/specialbtn";

const Login=()=>{
    const router = useRouter();
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setErrors]= useState<String[]>([])
    const sendLogin = async() =>{
        const formData = {
            username:username,
            email: email,
            password: password,
        }
        const response = await apiService.postWithoutToken('api/auth/login/',JSON.stringify(formData))
        console.log(response)
        if(response.access){
            await handleLogin(response.user.pk, response.access, response.refresh,response.user.username)
            router.push('/')
        }else{
            const tmpErrors: string[] = Object.values(response).map((error: any)=>{
                return error;
            })
            setErrors(tmpErrors)
            console.log(error)
        }
    }
    return (
        <>
            <div className="flex items-center just justify-center bg-slate-400 mt-48 ">
                <h1 className="text-6xl justify-self-center">Login</h1>
                <form action={sendLogin}>
                    <div className="flex flex-col gap-4 items-center">
                        <CredentialsInput onChange={(e)=> setUsername(e.target.value)} placeholder="Username" name="username" type="text" id="username"/>
                        <CredentialsInput onChange={(e)=> setEmail(e.target.value)} placeholder="Email" name="email" type="email" id="email"/>
                        <CredentialsInput onChange={(e)=> setPassword(e.target.value)} placeholder="Password" name="password" type="password" id="password" />
                        <SpecialBtn onClick={()=>{}} type="submit" link="/register/cv_details" content="Login" id="register" />
                    </div>
                </form>
                
            </div>
            {error.map((error,index)=>{
                    return (
                        <div key={`error_${index}`} className="p-2 z-2 absolute bottom-0 bg-slate-600 w-fit text-white rounded-xl opacity-80">
                            {error}
                        </div>
                    )
                })}
            
               
        </>  
    )
}

export default Login