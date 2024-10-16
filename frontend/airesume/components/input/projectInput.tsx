import { useState } from "react"
import SpecialBtn from "../specialbtn"

interface ProjectInputProps{
    onChange:(projectDetails:Map<string,string>, index:number)=> void
    index:number
}

const ProjectInput:React.FC<ProjectInputProps> = ({onChange,index})=>{
    
    const[projectName,setProjectName] = useState('')
    const[projectLink,setProjectLink] = useState('')
    const[technologiesUsed,setTechnologiesUsed] = useState('')
    const[projectDescription,setProjectDescription] = useState('')
    const[confirm,setConfirm] = useState(false)
    
    function onConfirmClicked(): void {
        const projectDetailsMap = new Map<string,string>()
        const formNumber = `project-${index.toString()}-`
        projectDetailsMap.set(formNumber+'project_name',projectName)
        projectDetailsMap.set(formNumber+'project_link',projectLink)
        projectDetailsMap.set(formNumber+'project_technologies_used',technologiesUsed)
        projectDetailsMap.set(formNumber+'project_description',projectDescription)

        onChange(projectDetailsMap,index)
    }

    return(
        <>
            <div className="mt-10 ml-10 mr-10">
                <h2 className="text-3xl mb-5 font-bold">
                    Projects
                </h2>
                <div className="flex justify-evenly">
                    <input onChange={(e)=>{setProjectName(e.target.value); setConfirm(false)}} className="border-2 border-primary rounded-md p-1" type="text" placeholder="Project Name" />
                    <input onChange={(e)=>{setProjectLink(e.target.value); setConfirm(false)}} className="border-2 border-primary rounded-md p-1" type="text" placeholder="Project Link" />
                    <input onChange={(e)=>{setTechnologiesUsed(e.target.value); setConfirm(false)}} className="border-2 border-primary rounded-md p-1" type="text" placeholder="Technologies Used" />
                </div>
                <div className="mt-7 flex flex-col items-center">
                    <h3 className="self-start">Description</h3>
                    <textarea onChange={(e)=>{setProjectDescription(e.target.value); setConfirm(false)}} className="border-2 border-primary rounded-md p-1 w-full h-[150px] resize-none " name="project desc" id="project"></textarea>
                </div>
                <div className="float-right mt-3">
                    <button onClick={()=>{setConfirm(true); onConfirmClicked()}} className={`${confirm ? "text-green-600" : "text-red-500"} font-bold`}>{confirm ? "Confirmed":"Confirm"}</button>
                </div>
                
            </div>
        </>
    )
}

export default ProjectInput