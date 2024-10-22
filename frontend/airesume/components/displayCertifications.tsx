import apiService from "@/app/services/api";
import { EditSVG } from "@/assets/svgs";
import { useEffect, useRef, useState } from "react";

interface DisplayCertificationsProps{
    certifications: Array<Map<string,any>>
}
const DisplayCertifications:React.FC<DisplayCertificationsProps> = ({certifications})=>{
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [edit,setEdit] = useState(false)
    const [editIndex, setEditIndex] = useState<number | null>(null); // New state to hold the index
    const [refreshKey, setRefreshKey] = useState(0); // New state to force re-render
    const [updatedCertifications, setUpdatedCertifications] = useState<Array<Map<string,any>>>(certifications.map((cert)=>new Map(Object.entries(cert)))); // New state for updated experiences
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
        const edittedCertObject: Record<string, any> = {};
        allField.forEach((field) => {
            edittedCertObject[field.id] = field.value; // Set the field value directly
        });


        const response = await apiService.putContent("api/cv_details/edit/",JSON.stringify({id:id,table:"Certifications",details:edittedCertObject}))
        if(response.success){
            setUpdatedCertifications((prevCerts) => {
                const newCert = [...prevCerts]; // Create a new array
                newCert[editIndex!] = new Map(Object.entries(response.content)); // Update the specific experience
                return newCert; // Return the new array
            });
            setEdit(false)
        }
    }

    useEffect(()=>{
        if(edit){
            if (divRef.current){
                const certificationContainer = divRef.current.querySelector(`div[id="${editIndex}"]`);
                if (certificationContainer) {
                    const allFields = Array.from(certificationContainer.querySelectorAll('p') as unknown as Array<HTMLElement>);                // const allFields = document.querySelectorAll(`#${editIndex?.toString()} p`)
                    for (let i =0; i<allFields.length; i++){
                        const field = allFields[i]
                        let newElement = document.createElement('input');
                        newElement.id=field.id
                        newElement.value = field?.innerText || ""
                        newElement.className="text-black w-fit"
                        newElement.type = field.id == "certification_link" ? "url" : "text"
                        field?.replaceWith(newElement);
                    }          
            
                }
            }
            
        }else{
            setRefreshKey(prev => prev + 1) //so that component gets refreshed reverting back to its original state when user decides to change their mind
        }
    },[edit])

    return(
        <>
            <div key={refreshKey} ref={divRef} className="bg-primary w-full px-12 py-5 rounded-md text-white">
                {updatedCertifications.map((cert,index)=>{
                    return(
                        <div id={`${index.toString()}`} key={index}>
                            <div className="flex gap-2 items-center">
                                <label htmlFor="" className="font-semibold">Certification {index+1}</label>
                                <span className="cursor-pointer" onClick={() =>{toggleEditField(index)}}><EditSVG/></span> 
                            </div>                          
                            <div className="flex flex-col gap-2">
                            <div className="flex justify-around">
                                <p id="certification_name">{cert.get("certification_name")}</p>
                                <p id="certification_link">{cert.get("certification_link")}</p>
                            </div>
                            {edit && index==editIndex  && (
                                <button onClick={()=>onConfirm(cert.get("certification_id"))} className="text-white">Confirm</button>
                            )}
                        </div>
                    </div>
                    )
                })}
            </div>
            
        </>
    )
}

export default DisplayCertifications