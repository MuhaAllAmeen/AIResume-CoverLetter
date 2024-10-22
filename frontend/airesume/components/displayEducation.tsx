import apiService from "@/app/services/api";
import { EditSVG } from "@/assets/svgs";
import { useEffect, useRef, useState } from "react";

interface DisplayEducationProps{
    educations: Array<Map<string,any>>
}
const DisplayEducation:React.FC<DisplayEducationProps> = ({educations})=>{
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [edit,setEdit] = useState(false)
    const [editIndex, setEditIndex] = useState<number | null>(null); // New state to hold the index
    const [refreshKey, setRefreshKey] = useState(0); // New state to force re-render
    const [updatedEducation, setUpdatedEducation] = useState<Array<Map<string,any>>>(educations.map((edu)=>new Map(Object.entries(edu)))); // New state for updated experiences
    const divRef = useRef<HTMLDivElement | null>(null);

    const handleToggle = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index); // Toggle the index
    };

    function toggleEditField(index:number) {
        setEdit(!edit)
        setEditIndex(index) 
    }

    async function onConfirm(id:string){
        const allField = Array.from(document.getElementsByTagName('input'))
        const summaryField = document.getElementById("education_summary_ta") as HTMLTextAreaElement
        const edittedEduObject: Record<string, any> = {};
        allField.forEach((field) => {
            edittedEduObject[field.id] = field.value; // Set the field value directly
        });

        edittedEduObject["education_summary"] = summaryField?.value; 

        const response = await apiService.putContent("api/cv_details/edit/",JSON.stringify({id:id,table:"Education",details:edittedEduObject}))
        if(response.success){
            setUpdatedEducation((prevEducation) => {
                const newEducation = [...prevEducation]; // Create a new array
                newEducation[editIndex!] = new Map(Object.entries(response.content)); // Update the specific experience
                return newEducation; // Return the new array
            });
            setEdit(false)
        }
    }

    useEffect(()=>{
        if(edit){
            if (divRef.current){
                const educationContainer = divRef.current.querySelector(`div[id="${editIndex}"]`);
                if (educationContainer) {
                    const allFields = Array.from(educationContainer.querySelectorAll('p') as unknown as Array<HTMLElement>);                // const allFields = document.querySelectorAll(`#${editIndex?.toString()} p`)
            for (let i =0; i<allFields.length; i++){
                const field = allFields[i]

                if(field?.id=="summary"){
                    let newElement = document.createElement('textarea');
                    newElement.value = field?.innerText || ""
                    newElement.className="text-black w-full h-full"
                    newElement.id = "education_summary_ta"
                    field?.replaceWith(newElement);
                    
                }else{
                    let newElement = document.createElement('input');
                    newElement.id=field.id
                    newElement.value = field?.innerText || ""
                    newElement.className="text-black w-fit"
                    newElement.type = field.id.endsWith("date") ? "date" : "text"
                    field?.replaceWith(newElement);
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
            <div ref={divRef} key={refreshKey} className="bg-primary w-full px-12 py-5 rounded-md text-white">
                {updatedEducation.map((edu,index)=>{
                    return(
                        <div id={`${index.toString()}`} key={index}>
                            <div className="flex gap-2 items-center">
                                <label htmlFor="" className="font-semibold">Education {index+1}</label>
                                <span className="cursor-pointer" onClick={() =>{toggleEditField(index)}}><EditSVG/></span> 
                            </div>                        
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-around">
                                <p id="education_name">{edu.get("education_name")}</p>
                                <p id="education_course">{edu.get("education_course")}</p>
                            </div>
                            <div className="flex justify-around">
                                <p id="education_field_of_study">{edu.get("education_field_of_study")}</p>
                                <p id="start_date">{edu.get("start_date")}</p>
                                <p id="end_date">{edu.get("end_date")}</p>

                            </div>
                            <div onClick={() => handleToggle(index)}
                                className={`transition-all duration-300 text-ellipsis ${expandedIndex === index ? 'h-auto' : 'h-12'} overflow-hidden`} >
                               <p id="summary">{edu.get("education_summary")}</p>
                            </div>
                            {edit && index==editIndex  && (
                                <button onClick={()=>onConfirm(edu.get("education_id"))} className="text-white">Confirm</button>
                            )}
                        </div>
                    </div>
                    )
                })}
            </div>
            
        </>
    )
}

export default DisplayEducation