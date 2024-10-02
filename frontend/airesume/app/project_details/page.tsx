'use client'
import { useDetails } from "@/components/DetailsContext";
import ProjectInput from "@/components/input/projectInput";
import { cookies } from "next/dist/client/components/headers";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProjectDetails = ()=>{
    const router = useRouter()
    const { details, setDetails } = useDetails();
    function saveProjectDetails(projectDetails:Map<string,string>){
        console.log(projectDetails)
        const updatedDetails = new Map(details);
        projectDetails.forEach((value, key) => {
            updatedDetails.set(key, value);
        });
        setDetails(updatedDetails);
        router.replace('/education_details')
        
    }
    // useEffect(()=>{
    //     if(details.size>11){
    //         details.forEach((value,key)=>{
    //             sessionStorage.setItem(key,value)
    //         })
    //         router.replace('/education_details')
    //     }
        
    // },[details])
    return (
        <>
            <div className="flex flex-col gap-4 justify-center items-center min-h-screen">
                <div className="border-2 bg-slate-400 rounded-xl shadow-xl shadow-black p-4 w-[1000px]">
                    <ProjectInput onChange={saveProjectDetails} />
                </div>
                
            </div>
            
                {/* <ExperienceInput />   
                <ProjectInput />
                <EducationInput />
                    */}
        </>
    )
}

export default ProjectDetails
