'use client'
import SpecialBtn from "@/components/specialbtn"
import { useState } from "react"
import apiService from "../services/api"
import { useRouter } from "next/navigation"

const JobSummary = ()=>{
    const router = useRouter()
    const [summary,setSummary] = useState('')
    async function onNext(){
        console.log("summary",summary)
        if(summary!=""){
            const response = await apiService.postContent("api/cv_details/job/",JSON.stringify({job_summary:summary}))
            if(response.success){
                localStorage.setItem("cover_letter",response.content)
                router.push("/cover_letter")
            }
            
        }
    }
    return(
        <>
            <div className=" h-screen flex flex-col justify-center items-center">
                <h1 className="text-3xl mb-7">Paste the Job Summary here</h1>
                <textarea onChange={(e)=>setSummary(e.target.value)} className="resize-none p-2 w-[800px] h-[400px] border-2 border-black rounded-md" name="job" id="job"></textarea>
                <div className="mt-10">
                    <SpecialBtn content="Next" id="next" onClick={onNext} link="" />
                </div>
            </div>
            
        </>
    )
}

export default JobSummary