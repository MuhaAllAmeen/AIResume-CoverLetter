'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import apiService from "../services/api";
import { handleLogin } from "../services/token";
import CredentialsInput from "@/components/input/credentialsInput";
import SpecialBtn from "@/components/specialbtn";
import Image from 'next/image'
import plant from "../../assets/plant.png"
import fall from "../../assets/autumn.png"
import trainer from "../../assets/trainer.png"
import fairy from "../../assets/fairy.png"





const Login=()=>{
    const router = useRouter();
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setErrors]= useState<String[]>([])
    const [isLoading,setIsLoading] = useState(false)
    const sendLogin = async(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        setIsLoading(true)
        const formData = {
            username:username,
            email: email,
            password: password,
        }
        const response = await apiService.postWithoutToken('api/auth/login/',JSON.stringify(formData))
        if(response.access){
            await handleLogin(response.user.pk, response.access, response.refresh,response.user.username)
            setIsLoading(false)
            router.push('/')
        }else{
            setIsLoading(false)
            const tmpErrors: string[] = Object.values(response).map((error: any)=>{
                return error;
            })
            setErrors(tmpErrors)
        }
    }
    
    return (
        <>
            <div className="flex justify-evenly  h-screen w-full">
                <div className="flex flex-col justify-between ">
                    <Image className="" src={fall}  alt={"fall"} width={155} height={125}></Image>
                    <Image className="mb-10" src={plant}  alt={"plant"} width={200} height={125}></Image>
                </div>
                <div className="justify-self-center flex flex-col justify-center gap-10 bg-white">
                    <h1 className="text-6xl text-primary font-bold">Login.</h1>
                    <form onSubmit={sendLogin}>
                        <div className="flex flex-col gap-4 items-center">
                            <CredentialsInput onChange={(e)=> setUsername(e.target.value)} placeholder="Username" name="username" type="text" id="username"/>
                            <CredentialsInput onChange={(e)=> setEmail(e.target.value)} placeholder="Email" name="email" type="email" id="email"/>
                            <CredentialsInput onChange={(e)=> setPassword(e.target.value)} placeholder="Password" name="password" type="password" id="password" />
                            <div className="mt-10">
                                <SpecialBtn disabled={isLoading} onClick={()=>{}} type="submit"  content={isLoading?"Logging In..." : "Login"} id="register" />
                            </div>
                        </div>
                    </form>  
                </div>
                <div className=" mb-10 self-end">
                    <Image className="fixed top-0 right-0" src={fairy}  alt={"fall"} width={220} height={125}></Image>
                    <Image className="" src={trainer}  alt={"fall"} width={200} height={125}></Image>
                </div>
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