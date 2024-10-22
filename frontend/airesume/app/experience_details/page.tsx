'use client'
import { useDetails } from "@/components/DetailsContext"
import ExperienceInput from "@/components/input/experienceInput"
import SpecialBtn from "@/components/specialbtn"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const ExperienceDetails = ()=>{
    const router = useRouter()
    const { details, setDetails } = useDetails();
    const [experienceInputList,setExperienceInputList] = useState([<ExperienceInput index={0} onChange={saveExperienceDetails}/>])
    const [experienceList,setExperienceList] = useState<Array<Map<string,string>>>([])
    
    

    function saveExperienceDetails(experienceDetails:Map<string,string>,index:number){
        if(experienceList.at(index)==null){
            setExperienceList((expList)=>[...expList, experienceDetails])     
        }else{
            setExperienceList((expList)=>{
                expList[index]=experienceDetails
                return expList
            })
        }
    }

    function onNextClicked(){
        const updatedDetails = new Map(details);
        if (experienceList.length > 0) {
            sessionStorage.setItem("ExperienceNumber",experienceList.length.toString())
            const experienceArray = experienceList.map(exp => {
                // const obj: Record<string, string> = {};
                exp.forEach((value, key) => {
                    // obj[key] = value;
                    updatedDetails.set(key,value)
                });
                // return obj;
            });
            // updatedDetails.set("Experiences", JSON.stringify(experienceArray));
            setDetails(updatedDetails);
            router.push('/project_details')
        } else {
            alert("Please press confirm")
        }
        
    }

    return (
        <>
            <div className="flex flex-col gap-4 justify-center items-center min-h-screen">
                <div className="border-2 bg-secondary rounded-xl shadow-xl shadow-black p-4 w-[1000px]">
                    {experienceInputList.map((expInput,index)=>{
                        return(
                            <div key={index}><ExperienceInput index={index} onChange={saveExperienceDetails}/></div>
                        )
                    })}
                    <button onClick={()=>setExperienceInputList((expList)=>[...expList,<ExperienceInput index={expList.length} onChange={saveExperienceDetails} />])} className="font-bold mt-5 ml-10 hover:bg-gray-500 px-4 rounded-md transition-colors">Add More</button>
                    <div className="relative float-right mt-20">
                        <SpecialBtn onClick={onNextClicked}  content="Next" type="button" id="next"/>                    
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default ExperienceDetails