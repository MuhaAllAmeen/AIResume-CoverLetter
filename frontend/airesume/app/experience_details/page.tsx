'use client'
import { useDetails } from "@/components/DetailsContext"
import BasicDetailsInput from "@/components/input/basicDetailsInput"
import EducationInput from "@/components/input/educationInput"
import ExperienceInput from "@/components/input/experienceInput"
import ProjectInput from "@/components/input/projectInput"
import SpecialBtn from "@/components/specialbtn"
import { cookies } from "next/dist/client/components/headers"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const ExperienceDetails = ()=>{
    const router = useRouter()
    const { details, setDetails } = useDetails();

    function saveExperienceDetails(experienceDetails:Map<string,string>){
        console.log(experienceDetails)
        const updatedDetails = new Map(details);
        experienceDetails.forEach((value, key) => {
            updatedDetails.set(key, value);
        });
        setDetails(updatedDetails);
        router.replace('/project_details')
        
    }
    // useEffect(()=>{
    //     if (details.size>5){
    //         details.forEach((value,key)=>{
    //             sessionStorage.setItem(key,value)
    //         })
    //         router.replace('/project_details')
    //     }
        
    // },[details])
    return (
        <>
            <div className="flex flex-col gap-4 justify-center items-center min-h-screen">
                <div className="border-2 bg-slate-400 rounded-xl shadow-xl shadow-black p-4 w-[1000px]">
                    <ExperienceInput onChange={saveExperienceDetails} />
                </div>
                
            </div>
            
                {/* <ExperienceInput />   
                <ProjectInput />
                <EducationInput />
                    */}
        </>
    )
}

export default ExperienceDetails