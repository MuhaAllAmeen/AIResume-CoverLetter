'use client'
import { useDetails } from "@/components/DetailsContext"
import ExperienceInput from "@/components/input/experienceInput"
import SpecialBtn from "@/components/specialbtn"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const ExperienceDetails = ()=>{
    const router = useRouter()
    const { details, setDetails } = useDetails();
    const [experienceInputList,setExperienceInputList] = useState([<ExperienceInput onChange={saveExperienceDetails}/>])
    const [experienceList,setExperienceList] = useState<Array<Map<string,string>>>([])
    
    useEffect(()=>{
        console.log('expList',experienceList)
    },[experienceList])
    function saveExperienceDetails(experienceDetails:Map<string,string>){
        setExperienceList((expList)=>[...expList, experienceDetails])     
    }
    function onNextClicked(){
        console.log('e',experienceList,JSON.stringify(experienceList))
        const updatedDetails = new Map(details);
        if (experienceList.length > 0) {
            const experienceArray = experienceList.map(exp => {
                const obj: Record<string, string> = {};
                exp.forEach((value, key) => {
                    obj[key] = value;
                });
                return obj;
            });
            updatedDetails.set("Experiences", JSON.stringify(experienceArray));
            setDetails(updatedDetails);
            router.push('/project_details')
        } else {
            alert("Please press confirm")
        }
        console.log("upd",updatedDetails)
        
    }

    return (
        <>
            <div className="flex flex-col gap-4 justify-center items-center min-h-screen">
                <div className="border-2 bg-slate-400 rounded-xl shadow-xl shadow-black p-4 w-[1000px]">
                    {experienceInputList.map((expInput,index)=>{
                        return(
                            <div key={index}><ExperienceInput onChange={saveExperienceDetails}/></div>
                        )
                    })}
                    <button onClick={()=>setExperienceInputList((expList)=>[...expList,<ExperienceInput onChange={saveExperienceDetails} />])} className="font-bold mt-5 ml-10 hover:bg-gray-500 px-4 rounded-md transition-colors">Add More</button>
                    <div className="relative float-right mt-20">
                        <SpecialBtn onClick={onNextClicked} link="cv_details/additional_details" content="Next" type="button" id="next"/>                    
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default ExperienceDetails