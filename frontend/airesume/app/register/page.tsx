'use client'
import CredentialsInput from "@/components/input/credentialsInput";
import SpecialBtn from "@/components/specialbtn";
import { useRouter } from "next/navigation";
import { useState } from "react";
import apiService from "../services/api";
import { handleLogin } from "../services/token";

export default function Register(){
    const router = useRouter();
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('');
    const [password1,setPassword1] = useState('');
    const [password2,setPassword2] = useState('');
    const [error,setErrors]= useState<String[]>([])
    const handleRegister = async() =>{
        const formData = {
            username:username,
            email: email,
            password1: password1,
            password2: password2
        }
        const response = await apiService.postWithoutToken('api/auth/register/',JSON.stringify(formData))
        console.log(response)
        if(response.access){
            await handleLogin(response.user.pk, response.access, response.refresh,response.user.username)
            router.push('/basic_details')
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
                <h1 className="text-6xl justify-self-center">Register</h1>
                <form action={handleRegister}>
                    <div className="flex flex-col gap-4 items-center">
                        <CredentialsInput onChange={(e)=> setUsername(e.target.value)} placeholder="Username" name="username" type="text" id="username"/>
                        <CredentialsInput onChange={(e)=> setEmail(e.target.value)} placeholder="Email" name="email" type="email" id="email"/>
                        <CredentialsInput onChange={(e)=> setPassword1(e.target.value)} placeholder="Password" name="password" type="password" id="password" />
                        <CredentialsInput onChange={(e)=> setPassword2(e.target.value)} placeholder="Re-enter Password" name="password2" type="password" id="password2" />
                        <SpecialBtn onClick={()=>{}} type="submit" link="/register/cv_details" content="Register" id="register" />
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