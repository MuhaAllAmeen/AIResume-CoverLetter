'use client'
import { resetAuthCookies } from "@/app/services/token"
import { useRouter } from "next/navigation"

const LogOutBtn = ()=>{
    const router = useRouter()
    async function onLogout(){
        await resetAuthCookies()
        router.push('/')
    }
    return(
        <>
            <button onClick={onLogout} className="text-blue-800 text-xl">LogOut</button>
        </>
    )
}
export default LogOutBtn