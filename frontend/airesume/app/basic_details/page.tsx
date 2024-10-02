'use client'
import { useDetails } from "@/components/DetailsContext"
import BasicDetailsInput from "@/components/input/basicDetailsInput"
import EducationInput from "@/components/input/educationInput"
import ExperienceInput from "@/components/input/experienceInput"
import ProjectInput from "@/components/input/projectInput"
import SpecialBtn from "@/components/specialbtn"
import { useRouter } from "next/navigation"
import { useCallback, useEffect } from "react"

const CVDetails = ()=>{
    const router = useRouter()
    const { details, setDetails } = useDetails();
    
    function saveBasicDetails(basicDetails:Map<string,string>){
        console.log(basicDetails)
        setDetails(basicDetails)
        router.replace('/experience_details');

    }
    // useEffect(() => {
    //     if (details.size > 0) {
    //         details.forEach((value, key) => {
    //             sessionStorage.setItem(key, value);
    //         });
    //         router.replace('/experience_details');
    //     }
    // }, [details]);
    return (
        <>
            <div className="flex flex-col gap-4 justify-center items-center min-h-screen">
                <div className="border-2 bg-slate-400 rounded-xl shadow-xl shadow-black p-4 w-[1000px]">
                    <BasicDetailsInput onChange={saveBasicDetails} />
                </div>
                
            </div>
        </>
    )
}

export default CVDetails