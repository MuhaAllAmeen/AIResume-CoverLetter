import apiService from "@/app/services/api"
import { getUserName } from "@/app/services/token"
import ProfileDetails from "@/components/ProfileDetails"
import { useEffect } from "react"

const Profile = async ({params}:{params:{id:string}}) =>{
    const details = await apiService.get(`api/cv_details/${params.id}`)
    const userName = await getUserName()
    return(
        <>
        <main className="mt-10 ml-10">
            <h1 className="text-3xl">Welcome, <span className="font-bold text-green-700">{userName}</span></h1>
            <div className="mt-12 flex justify-center">
                <div className="bg-green-200 w-[800px] py-5 px-5 rounded-sm">
                    <ProfileDetails content={details.content} /> 
                </div>
            </div>   
        </main>
               
        </>
    )
}

export default Profile