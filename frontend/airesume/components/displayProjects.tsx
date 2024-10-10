import { useState } from "react";

interface DisplayProjectsProps{
    projects:Array<Map<string,any>>
}
const DisplayProjects:React.FC<DisplayProjectsProps> = ({projects})=>{
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index); // Toggle the index
    };
    return(
        <>
            <div className="bg-green-600 w-full px-12 py-5 rounded-md">
                {projects.map((project,index)=>{
                    project = new Map(Object.entries(project))
                    return(
                        <div key={index}>
                        <label htmlFor="">Project {index+1}</label>
                        <div className="flex flex-col">
                            <div className="flex justify-around">
                                <p>{project.get("project_name")}</p>
                                <p>{project.get("project_link")}</p>
                            </div>
                            <div className="flex justify-around">
                                <p>Tech Stack: {project.get("project_technologies_used")}</p>
                            </div>
                            <div onClick={() => handleToggle(index)}
                                className={`transition-all duration-300 text-ellipsis ${expandedIndex === index ? 'h-auto' : 'h-12'} overflow-hidden`} >
                               <p>{project.get("project_description")}</p>
                            </div>
                        </div>
                    </div>
                    )
                })}
            </div>
            
        </>
    )
}
export default DisplayProjects