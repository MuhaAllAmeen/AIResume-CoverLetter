import apiService from "@/app/services/api";
import { EditSVG } from "@/assets/svgs";
import { useEffect, useRef, useState } from "react";

interface DisplayProjectsProps{
    projects:Array<Map<string,any>>
}
const DisplayProjects:React.FC<DisplayProjectsProps> = ({projects})=>{
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [edit,setEdit] = useState(false)
    const [editIndex, setEditIndex] = useState<number | null>(null); // New state to hold the index
    const [refreshKey, setRefreshKey] = useState(0); // New state to force re-render
    const [updatedProjects, setUpdatedProjects] = useState<Array<Map<string,any>>>(projects.map((proj)=>new Map(Object.entries(proj)))); // New state for updated experiences
    const divRef = useRef(null);

    const handleToggle = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index); // Toggle the index
    };

    function toggleEditField(index:number) {
        setEdit(!edit)
        setEditIndex(index) 
    }

    async function onConfirm(id:string){
        const allField = Array.from(document.getElementsByTagName('input'))
        const summaryField = document.getElementById("project_description_ta") as HTMLTextAreaElement
        const edittedprojObject: Record<string, any> = {};
        allField.forEach((field) => {
            edittedprojObject[field.id] = field.value; // Set the field value directly
        });

        edittedprojObject["project_description"] = summaryField?.value; 

        const response = await apiService.putContent("api/cv_details/edit/",JSON.stringify({id:id,table:"Projects",details:edittedprojObject}))
        if(response.success){
            setUpdatedProjects((prevProjects) => {
                const newProjects = [...prevProjects]; // Create a new array
                newProjects[editIndex!] = new Map(Object.entries(response.content)); // Update the specific experience
                return newProjects; // Return the new array
            });
            setEdit(false)
        }
    }
    useEffect(()=>{
        console.log(edit,updatedProjects)
        if(edit){
            if (divRef.current){
            const projectContainer = divRef.current.querySelector(`div[id="${editIndex}"]`);
                if (projectContainer) {
                const allFields = Array.from(projectContainer.querySelectorAll('p') as Array<HTMLElement>);
                    console.log(allFields)
                    for (let i =0; i<allFields.length; i++){
                        const field = allFields[i]
                        if(field?.id=="summary"){
                            let newElement = document.createElement('textarea');
                            newElement.value = field?.innerText || ""
                            newElement.className="text-black w-full h-full"
                            newElement.id = "project_description_ta"
                            field?.replaceWith(newElement);
                            
                        }else{
                            let newElement = document.createElement('input');
                            newElement.id = field.id
                            newElement.value = field?.innerText || ""
                            newElement.className="text-black w-fit"
                            newElement.type = field.id.endsWith("date") ? "date" : "text"
                            field?.replaceWith(newElement);
                            console.log(newElement)    
                        }  
                    }
                }        
            }
        }else{
            setRefreshKey(prev => prev + 1) //so that component gets refreshed reverting back to its original state when user decides to change their mind
        }
    },[edit])

    return(
        <>
            <div key={refreshKey} ref={divRef} className="bg-primary text-white w-full px-12 py-5 rounded-md">
                {updatedProjects.map((project,index)=>{
                    return(
                        <div id={`${index.toString()}`} key={index} className="mb-5">
                        <div className="flex gap-2 items-center">
                           <label htmlFor="" className="font-semibold">Project {index+1}</label>
                            <span className="cursor-pointer" onClick={() =>{toggleEditField(index)}}><EditSVG/></span> 
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-around">
                                <p id="project_name">{project.get("project_name")}</p>
                                <p id="project_link">{project.get("project_link")}</p>
                            </div>
                            <div className="flex justify-around">
                                Tech Stack:<p id="project_technologies_used"> {project.get("project_technologies_used")}</p>
                            </div>
                            <div onClick={() => handleToggle(index)}
                                className={`transition-all duration-300 text-ellipsis ${expandedIndex === index ? 'h-auto' : 'h-12'} overflow-hidden`} >
                               <p id="summary">{project.get("project_description")}</p>
                            </div>
                            {edit && index==editIndex  && (
                                <button onClick={() => onConfirm(project.get("project_id"))} className="text-white">Confirm</button>
                            )}
                        </div>
                    </div>
                    )
                })}
            </div>
            
        </>
    )
}
export default DisplayProjects