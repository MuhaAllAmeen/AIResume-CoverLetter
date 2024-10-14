import apiService from "@/app/services/api";
import { EditSVG } from "@/assets/svgs";
import { useEffect, useState } from "react";

interface DisplayProjectsProps{
    projects:Array<Map<string,any>>
}
const DisplayProjects:React.FC<DisplayProjectsProps> = ({projects})=>{
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [edit,setEdit] = useState(false)
    const [editIndex, setEditIndex] = useState<number | null>(null); // New state to hold the index
    const [refreshKey, setRefreshKey] = useState(0); // New state to force re-render
    const [updatedProjects, setUpdatedProjects] = useState<Array<Map<string,any>>>(projects.map((proj)=>new Map(Object.entries(proj)))); // New state for updated experiences

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
        const edittedExpObject: Record<string, any> = {};
        allField.forEach((field) => {
            edittedExpObject[field.id] = field.value; // Set the field value directly
        });

        edittedExpObject["project_description"] = summaryField?.value; 

        const response = await apiService.putContent("api/cv_details/edit/",JSON.stringify({id:id,table:"Projects",details:edittedExpObject}))
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
            let expMap = updatedProjects[editIndex!]
            const allFields = Array.from(document.getElementsByTagName("p")); // Convert NodeList to an arra
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
                    expMap.forEach((value,key)=>{
                        if (value==field?.innerText){
                            newElement.id = key
                        }
                    })
                    newElement.value = field?.innerText || ""
                    newElement.className="text-black w-fit"
                    newElement.type = field.id.endsWith("date") ? "date" : "text"
                    field?.replaceWith(newElement);
                    console.log(newElement)    
                }          
            }
        }else{
            setRefreshKey(prev => prev + 1) //so that component gets refreshed reverting back to its original state when user decides to change their mind
        }
    },[edit])

    return(
        <>
            <div key={refreshKey} className="bg-primary text-white w-full px-12 py-5 rounded-md">
                {updatedProjects.map((project,index)=>{
                    return(
                        <div key={index}>
                        <div className="flex gap-2 items-center">
                           <label htmlFor="" className="font-semibold">Project {index+1}</label>
                            <span className="cursor-pointer" onClick={() =>{toggleEditField(index)}}><EditSVG/></span> 
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-around">
                                <p>{project.get("project_name")}</p>
                                <p>{project.get("project_link")}</p>
                            </div>
                            <div className="flex justify-around">
                                <p>Tech Stack: {project.get("project_technologies_used")}</p>
                            </div>
                            <div onClick={() => handleToggle(index)}
                                className={`transition-all duration-300 text-ellipsis ${expandedIndex === index ? 'h-auto' : 'h-12'} overflow-hidden`} >
                               <p id="summary">{project.get("project_description")}</p>
                            </div>
                            {edit && (
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