import apiService from "@/app/services/api";
import { EditSVG } from "@/assets/svgs";
import { useEffect, useRef, useState } from "react"

interface DisplayExperienceProps{
    experiences: Array<Map<string,any>>
}
const DisplayExperience:React.FC<DisplayExperienceProps> = ({experiences})=>{
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [edit,setEdit] = useState(false)
    const [editIndex, setEditIndex] = useState<number | null>(null); // New state to hold the index
    const [refreshKey, setRefreshKey] = useState(0); // New state to force re-render
    const [updatedExperiences, setUpdatedExperiences] = useState<Array<Map<string,any>>>(experiences.map((exp)=>new Map(Object.entries(exp)))); // New state for updated experiences
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
        const summaryField = document.getElementById("experience_summary_ta") as HTMLTextAreaElement
        const edittedExpObject: Record<string, any> = {};
        allField.forEach((field) => {
            edittedExpObject[field.id] = field.value; // Set the field value directly
        });

        edittedExpObject["experience_summary"] = summaryField?.value; 

        const response = await apiService.putContent("api/cv_details/edit/",JSON.stringify({id:id,table:"Experience",details:edittedExpObject}))
        if(response.success){
            setUpdatedExperiences((prevExperiences) => {
                const newExperiences = [...prevExperiences]; // Create a new array
                newExperiences[editIndex!] = new Map(Object.entries(response.content)); // Update the specific experience
                return newExperiences; // Return the new array
            });
            setEdit(false)
        }
    }
    useEffect(()=>{
        if(edit){
            if (divRef.current){
                const experienceContainer = divRef.current.querySelector(`div[id="${editIndex}"]`);
                if (experienceContainer) {
                    const allFields = Array.from(experienceContainer.querySelectorAll('p') as unknown as Array<HTMLElement>);                // const allFields = document.querySelectorAll(`#${editIndex?.toString()} p`)
            for (let i =0; i<allFields.length; i++){
                const field = allFields[i]

                if(field?.id=="summary"){
                    let newElement = document.createElement('textarea');
                    newElement.value = field?.innerText || ""
                    newElement.className="text-black w-full h-full"
                    newElement.id = "experience_summary_ta"
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

    return (
        <>
        <div key={refreshKey} ref={divRef} className="bg-primary w-full px-12 py-5 rounded-md text-white">
            {updatedExperiences.map((exp,index)=>{
                const id = exp.get("id") 
                const designation = exp.get("designation") 
                const companyName = exp.get("company_name") 
                const location = exp.get("location") 
                const startDate = exp.get("start_date") 
                const endDate = exp.get("end_date") 
                const experienceSummary = exp.get("experience_summary")                 

                return(
                    <div id={`${index.toString()}`}  key={index}>
                        <div className="flex gap-2 items-center">
                           <label htmlFor="" className="font-semibold">Experience {index+1}</label>
                            <span className="cursor-pointer" onClick={() =>{toggleEditField(index)}}><EditSVG/></span> 
                        </div>
                        
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-around">
                                <p id="designation">{designation}</p>
                                <p id="company_name">{companyName}</p>
                                <p id="location">{location}</p>
                            </div>
                            <div className="flex justify-around">
                                Started at: <p id="start_date">{startDate}</p>
                                Ended at: <p id="end_date">{endDate}</p>
                            </div>
                            <div onClick={() => {!edit ? handleToggle(index): ()=>{}}}
                                className={`transition-all duration-300 text-ellipsis ${expandedIndex === index ? 'h-auto' : 'h-12'} overflow-hidden`} >
                               <p id="summary">{experienceSummary}</p>
                            </div>
                            {edit && index==editIndex  && (
                                <button onClick={()=>onConfirm(id)} className="text-white">Confirm</button>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
        
        </>
        
    );
}

export default DisplayExperience