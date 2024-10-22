'use client'
import { useDetails } from "@/components/DetailsContext";
import EducationInput from "@/components/input/educationInput";
import SpecialBtn from "@/components/specialbtn";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EducationDetails = ()=>{
    const router = useRouter()
    const { details, setDetails } = useDetails();
    const [educationInputList,setEducationInputList] = useState([<EducationInput index={0} onChange={saveEducationDetails}/>])
    const [educationList,setEducationList] = useState<Array<Map<string,string>>>([])

    function saveEducationDetails(educationDetails:Map<string,string>,index:number){
        if(educationList.at(index)==null){
            setEducationList((eduList)=>[...eduList, educationDetails])     
        }else{
            setEducationList((eduList)=>{
                eduList[index]=educationDetails
                return eduList
            })
        }
        
    }

    function onNextClicked(){
        const updatedDetails = new Map(details);
        if (educationList.length > 0) {
            sessionStorage.setItem("EducationNumber",educationList.length.toString())
            const educationArray = educationList.map(exp => {
                // const obj: Record<string, string> = {};
                exp.forEach((value, key) => {
                    updatedDetails.set(key,value)
                    // obj[key] = value;
                });
                // return obj;
            });
            // updatedDetails.set("Education", JSON.stringify(educationArray));
            setDetails(updatedDetails);
            router.replace('/additional_details')
        } else {
            alert("Please press confirm")
        }    

    }
    // useEffect(()=>{
        
    // },[details])
    return (
        <>
            <div className="flex flex-col gap-4 justify-center items-center min-h-screen">
                <div className="border-2 bg-secondary rounded-xl shadow-xl shadow-black p-4 w-[1000px]">
                    {educationInputList.map((eduInput,index)=>{
                        return(
                            <div key={index}>{eduInput}</div>
                        )
                    })}
                    <button onClick={()=>setEducationInputList((expList)=>[...expList,<EducationInput index={expList.length} onChange={saveEducationDetails} />])} className="font-bold mt-5 ml-10 hover:bg-gray-500 px-4 rounded-md transition-colors">Add More</button>
                    <div className="relative float-right mt-20">
                        <SpecialBtn onClick={onNextClicked} content="Next" type="button" id="next"/>                    
                    </div>
                </div>      
            </div>
        </>
    )
}

export default EducationDetails