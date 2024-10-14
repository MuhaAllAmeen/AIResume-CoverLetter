'use client'
import SpecialBtn from "@/components/specialbtn"
import { useState } from "react"
import apiService from "../services/api"
import { useRouter, useSearchParams } from "next/navigation"

const JobSummary = ()=>{
    const router = useRouter()
    const [summary,setSummary] = useState('')
    const [isLoading,setIsLoading] = useState(false)
    const searchParams = useSearchParams()
    const action = searchParams.get("action")
    async function onNext(){
        console.log("summary",summary)
        if(summary!=""){
            setIsLoading(true)
            if(action == "Cover Letter"){
                const response = await apiService.postContent("api/cv_details/job/",JSON.stringify({action:"cover letter",job_summary:summary}))
                if(response.success){
                    localStorage.setItem("cover_letter",response.content)
                    setIsLoading(false)
                    router.push("/cover_letter")
                } 
            }else{
                const response = await apiService.postContent("api/cv_details/job/",JSON.stringify({action:"resume",job_summary:summary}))
                if(response.success){
                    localStorage.setItem("resume",response.content)
                    setIsLoading(false)
                    router.push("/resume")
                }  
            }
              
        }
    }
    return(
        <>
            <div className=" h-screen flex flex-col justify-center items-center">
                <h1 className="text-3xl mb-7">Paste the Job Summary here</h1>
                <textarea onChange={(e)=>setSummary(e.target.value)} className="resize-none p-2 w-[800px] h-[400px] border-2 border-black rounded-md" name="job" id="job"></textarea>
                <div className="mt-10">
                    <SpecialBtn content={isLoading?"Loading...":"Next"} disabled={isLoading} id="next" onClick={onNext}  />
                </div>
            </div>
        </>
    )
}

export default JobSummary