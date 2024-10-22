import apiService from "@/app/services/api"
import { getUserName } from "@/app/services/token"
import ProfileDetails from "@/components/ProfileDetails"
import { useEffect } from "react"

const Profile = async ({params}:{params:{id:string}}) =>{
    const details = await apiService.get(`api/cv_details/${params.id}/`)
    const userName = await getUserName()
    if(details?.success){
        return(
            <>
            <main className="mt-10 ml-10">
                <h1 className="text-3xl">Welcome, <span className="font-bold text-primary">{userName}</span></h1>
                <div className="mt-12 flex justify-center">
                    <div className="bg-secondary w-[800px] py-5 px-5 rounded-sm">
                        <ProfileDetails content={details.content} /> 
                    </div>
                </div>   
            </main>
                   
            </>
        )
    }else{
        return(
            <div className="flex flex-col gap-5 justify-center items-center h-[500px]">
                <h1 className="text-5xl text-red-500">No Data</h1>    
                <a href="/">Get Back</a>
                
            </div>
        )
    }
    
}

export default Profile