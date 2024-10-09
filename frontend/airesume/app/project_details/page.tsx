'use client'
import { useDetails } from "@/components/DetailsContext";
import ProjectInput from "@/components/input/projectInput";
import SpecialBtn from "@/components/specialbtn";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProjectDetails = ()=>{
    const router = useRouter()
    const { details, setDetails } = useDetails();
    const [projectInputList,setProjectInputList] = useState([<ProjectInput onChange={saveProjectDetails}/>])
    const [projectList,setProjectList] = useState<Array<Map<string,string>>>([])

    function saveProjectDetails(projectDetails:Map<string,string>){
        console.log(projectDetails)
        setProjectList((projList)=>[...projList,projectDetails])
    }

    function onNextClicked(){
        const updatedDetails = new Map(details);
        if (projectList.length > 0) {
            const projectArray = projectList.map(proj => {
                const obj: Record<string, string> = {};
                proj.forEach((value, key) => {
                    obj[key] = value;
                });
                return obj;
            });
            updatedDetails.set("Projects", JSON.stringify(projectArray));
            setDetails(updatedDetails);
            router.replace('/education_details')
        } else {
            alert("Please press confirm")
        }
        
    }
    useEffect(()=>{
        console.log(details)
        
    },[details])
    return (
        <>
            <div className="flex flex-col gap-4 justify-center items-center min-h-screen">
                <div className="border-2 bg-slate-400 rounded-xl shadow-xl shadow-black p-4 w-[1000px]">
                    {projectInputList.map((projInput,index)=>{
                        return(
                            <div key={index}>
                                {projInput}
                            </div>     
                        )
                    })}
                    <button onClick={()=>setProjectInputList((projList)=>[...projList,<ProjectInput onChange={saveProjectDetails} />])} className="font-bold mt-5 ml-10 hover:bg-gray-500 px-4 rounded-md transition-colors">Add More</button>
                    <div className="relative float-right mt-20">
                        <SpecialBtn onClick={onNextClicked} link="cv_details/additional_details" content="Next" type="button" id="next"/>                    
                    </div>
                </div>
                
            </div>
            
        </>
    )
}

export default ProjectDetails
