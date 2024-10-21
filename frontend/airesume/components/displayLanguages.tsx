import apiService from "@/app/services/api";
import { EditSVG } from "@/assets/svgs";
import { useEffect, useRef, useState } from "react";

interface DisplayCertificationsProps{
    languages: Array<Map<string,any>>
}
const DisplayLanguages:React.FC<DisplayCertificationsProps> = ({languages})=>{
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [edit,setEdit] = useState(false)
    const [editIndex, setEditIndex] = useState<number | null>(null); // New state to hold the index
    const [refreshKey, setRefreshKey] = useState(0); // New state to force re-render
    const [updatedLanguages, setUpdatedLanguages] = useState<Array<Map<string,any>>>(languages.map((lang)=>new Map(Object.entries(lang)))); // New state for updated experiences
    const divRef = useRef<HTMLDivElement | null>(null);

    const handleToggle = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index); // Toggle the index
    };

    function toggleEditField(index:number) {
        setEdit(!edit)
        setEditIndex(index) 
    }

    async function onConfirm(id:string){
        const allField = [
            ...Array.from(document.getElementsByTagName('input')),
            ...Array.from(document.getElementsByTagName('select'))
        ] as Array<HTMLInputElement | HTMLSelectElement>;
        const edittedLangObject: Record<string, any> = {};
        allField.forEach((field) => {
            edittedLangObject[field.id] = field.value; // Set the field value directly
        });
        console.log(edittedLangObject)

        const response = await apiService.putContent("api/cv_details/edit/",JSON.stringify({id:id,table:"Languages",details:edittedLangObject}))
        if(response.success){
            setUpdatedLanguages((prevLangs) => {
                const newLang = [...prevLangs]; // Create a new array
                newLang[editIndex!] = new Map(Object.entries(response.content)); // Update the specific experience
                return newLang; // Return the new array
            });
            setEdit(false)
        }
    }

    useEffect(()=>{
        console.log(edit,updatedLanguages)
        if(edit){
            if (divRef.current){
                const languageContainer = divRef.current.querySelector(`div[id="${editIndex}"]`);
                if (languageContainer) {
                    const allFields = Array.from(languageContainer.querySelectorAll('p') as unknown as Array<HTMLElement>);                // const allFields = document.querySelectorAll(`#${editIndex?.toString()} p`)
                console.log(allFields)
                    for (let i =0; i<allFields.length; i++){
                        const field = allFields[i]
                        console.log('field',field)
                        if (field.id=="language_fluency"){
                            let newElement = document.createElement('select');
                            newElement.id=field.id
                            newElement.value = field?.innerText || ""
                            Array.from(["basic","intermediate","fluent", "native"]).map((option)=>{ //change the fluency to capital letter of first alphabet in the backend
                                let opt = document.createElement("option");
                                opt.value = option;
                                opt.textContent = option;
                                newElement.appendChild(opt);
                            })
                            newElement.className="text-black w-fit"
                        field?.replaceWith(newElement);
                        console.log(newElement) 


                        }else{
                            let newElement = document.createElement('input');
                        newElement.id=field.id
                        newElement.value = field?.innerText || ""
                        newElement.className="text-black w-fit"
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
            <div key={refreshKey} ref={divRef} className="bg-primary w-full px-12 py-5 rounded-md">
                {updatedLanguages.map((lang,index)=>{
                    return(
                        <div id={`${index.toString()}`} key={index}>
                            <div className="flex gap-2 items-center">
                                <label htmlFor="" className="font-semibold">Language {index+1}</label>
                                <span className="cursor-pointer" onClick={() =>{toggleEditField(index)}}><EditSVG/></span> 
                            </div>                          
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-around">
                                <p id="language_name">{lang.get("language_name")}</p>
                                <p id="language_fluency">{lang.get("language_fluency")}</p>
                            </div>
                            {edit && index==editIndex  && (
                                <button onClick={()=>onConfirm(lang.get("language_id"))} className="text-white">Confirm</button>
                            )}
                        </div>
                    </div>
                    )
                })}
            </div>
            
        </>
    )
}

export default DisplayLanguages