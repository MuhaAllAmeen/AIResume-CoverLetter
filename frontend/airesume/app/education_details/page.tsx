'use client'
import { useDetails } from "@/components/DetailsContext";
import EducationInput from "@/components/input/educationInput";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const EducationDetails = ()=>{
    const router = useRouter()
    const { details, setDetails } = useDetails();
    function saveEducationDetails(educationDetails:Map<string,string>){
        console.log(educationDetails)
        const updatedDetails = new Map(details);
        educationDetails.forEach((value, key) => {
            updatedDetails.set(key, value);
        });
        setDetails(updatedDetails);
        router.replace('/additional_details')

        
    }
    // useEffect(()=>{
    //     if(details.size>15){
    //         details.forEach((value,key)=>{
    //             sessionStorage.setItem(key,value)
    //         })
    //         router.replace('/additional_details')
    //     }
        
    // },[details])
    return (
        <>
            <div className="flex flex-col gap-4 justify-center items-center min-h-screen">
                <div className="border-2 bg-slate-400 rounded-xl shadow-xl shadow-black p-4 w-[1000px]">
                    <EducationInput onChange={saveEducationDetails} />
                </div>
                
            </div>
            
                {/* <ExperienceInput />   
                <ProjectInput />
                <EducationInput />
                    */}
        </>
    )
}

export default EducationDetails