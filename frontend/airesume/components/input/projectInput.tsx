import { useState } from "react"
import SpecialBtn from "../specialbtn"

interface ProjectInputProps{
    onChange:(projectDetails:Map<string,string>)=> void
}

const ProjectInput:React.FC<ProjectInputProps> = ({onChange})=>{
    
    const[projectName,setProjectName] = useState('')
    const[projectLink,setProjectLink] = useState('')
    const[technologiesUsed,setTechnologiesUsed] = useState('')
    const[projectDescription,setProjectDescription] = useState('')
    function onNextClicked(): void {
        const projectDetailsMap = new Map<string,string>()
        projectDetailsMap.set('project_name',projectName)
        projectDetailsMap.set('project_link',projectLink)
        projectDetailsMap.set('project_technologies_used',technologiesUsed)
        projectDetailsMap.set('project_description',projectDescription)

        onChange(projectDetailsMap)
    }

    return(
        <>
            <div className="mt-10 ml-10 mr-10">
                <h2 className="text-3xl mb-5">
                    Projects
                </h2>
                <div className="flex justify-evenly">
                    <input onChange={(e)=>setProjectName(e.target.value)} className="border-2 border-black rounded-md p-1" type="text" placeholder="Project Name" />
                    <input onChange={(e)=>setProjectLink(e.target.value)} className="border-2 border-black rounded-md p-1" type="text" placeholder="Project Link" />
                    <input onChange={(e)=>setTechnologiesUsed(e.target.value)} className="border-2 border-black rounded-md p-1" type="text" placeholder="Technologies Used" />
                </div>
                <div className="mt-7 flex flex-col items-center">
                    <h3 className="self-start">Description</h3>
                    <textarea onChange={(e)=>setProjectDescription(e.target.value)} className="border-2 border-black rounded-md p-1 w-full h-[150px] resize-none " name="project desc" id="project"></textarea>
                </div>
                <div className="relative float-right mt-20">
                    <SpecialBtn onClick={onNextClicked} link="cv_details/additional_details" content="Next" type="button" id="next"/>                    
                </div>
            </div>
        </>
    )
}

export default ProjectInput