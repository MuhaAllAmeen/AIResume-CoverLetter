import { useState } from "react";
import SpecialBtn from "../specialbtn";

interface ExperienceInputProps{
    onChange: (experienceDetails:Map<string,any>,index:number)=> void;
    index:number
}

const ExperienceInput:React.FC<ExperienceInputProps> = ({onChange,index}) =>{
    const [designation,setDesignation] = useState('')
    const [companyName,setCompanyName] = useState('')
    const [location,setLocation] = useState('')
    const [startingDate,setStartingDate] = useState('')
    const [endingDate,setEndingDate] = useState('')
    const [stillWorking,setStillWorking] = useState(false)
    const [summary,setSummary] = useState('')
    const [confirm,setConfirm] = useState(false)

    function onConfirmClicked(){
        const experienceDetailsMap = new Map<string,any>()
        const formNumber = `experience-${index.toString()}-`
        experienceDetailsMap.set(formNumber+'designation',designation)
        experienceDetailsMap.set(formNumber+'company_name',companyName)
        experienceDetailsMap.set(formNumber+'location',location)
        experienceDetailsMap.set(formNumber+'start_date',startingDate)
        if (!stillWorking){
            experienceDetailsMap.set(formNumber+'end_date',endingDate)
            experienceDetailsMap.set(formNumber+'still_working',stillWorking)
        }else{
            experienceDetailsMap.set(formNumber+'still_working',stillWorking)
        }
        experienceDetailsMap.set(formNumber+'experience_summary',summary)
        onChange(experienceDetailsMap,index)
        console.log("ex",experienceDetailsMap)

    }
    
    return(
        <>
            <div className="mt-10 ml-10 mr-10">
                <h2 className="text-3xl font-bold">Experience</h2>
                <div className="  mt-5">
                    <div className="flex justify-between">
                        <input onChange={(e)=>{setDesignation(e.target.value); setConfirm(false)}} className="border-2 border-primary rounded-md p-1 " type="text" placeholder="Designation" />
                        <input onChange={(e)=>{setCompanyName(e.target.value); setConfirm(false)}} className="border-2 border-primary rounded-md p-1" type="text" placeholder="Company Name" />
                        <input onChange={(e)=>{setLocation(e.target.value); setConfirm(false)}} className="border-2 border-primary rounded-md p-1" type="text" placeholder="Location" />
                        
                    </div>
                    <div className="flex justify-around mt-5">
                       <input onChange={(e)=>{setStartingDate(e.target.value); setConfirm(false)}} className="border-2 border-primary rounded-md p-1 " type="date" placeholder="Starting Date"/>
                        <div className="flex gap-2 items-center">
                        <input name="endingDateInput" onChange={(e)=>{setEndingDate(e.target.value); setConfirm(false)}} className="border-2 border-primary rounded-md p-1" type="date" placeholder="Ending Date" />
                            <div>
                                <input onChange={(e)=>{
                                setStillWorking(e.target.checked);
                                setConfirm(false);
                                (document.getElementsByName('endingDateInput')[index] as HTMLInputElement).disabled = e.target.checked
                                }} type="checkbox" name="still-working"/>
                                <label htmlFor="still-working">Still Working</label>
                            </div>
                            
                        </div> 
                    </div>
                    
                    
                    
                </div>

                <div className="mt-7 flex flex-col items-center">
                    <h4 className="self-start">Summary</h4>
                    <textarea onChange={(e)=>{setSummary(e.target.value); setConfirm(false)}} className="border-2 border-black rounded-md p-1 w-full h-[150px] resize-none " name="" id=""></textarea>
                </div>
                <div className="float-right mt-3">
                    <button onClick={()=>{setConfirm(true); onConfirmClicked()}} className={`${confirm ? "text-green-600" : "text-red-500"} font-bold`}>{confirm ? "Confirmed":"Confirm"}</button>
                </div>
            </div>
        </>
    )
}

export default ExperienceInput