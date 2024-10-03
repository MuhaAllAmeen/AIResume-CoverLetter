import { useState } from "react";
import SpecialBtn from "../specialbtn";

interface ExperienceInputProps{
    onChange: (experienceDetails:Map<string,any>)=> void;
}

const ExperienceInput:React.FC<ExperienceInputProps> = ({onChange}) =>{
    const [designation,setDesignation] = useState('')
    const [companyName,setCompanyName] = useState('')
    const [location,setLocation] = useState('')
    const [startingDate,setStartingDate] = useState('')
    const [endingDate,setEndingDate] = useState('')
    const [stillWorking,setStillWorking] = useState(false)
    const [summary,setSummary] = useState('')

    function onNextClicked(){
        const experienceDetailsMap = new Map<string,any>()
        experienceDetailsMap.set('designation',designation)
        experienceDetailsMap.set('company_name',companyName)
        experienceDetailsMap.set('location',location)
        experienceDetailsMap.set('start_date',startingDate)
        if (!stillWorking){
            experienceDetailsMap.set('end_date',endingDate)
            experienceDetailsMap.set('still_working',stillWorking)
        }else{
            experienceDetailsMap.set('still_working',stillWorking)
        }
        experienceDetailsMap.set('experience_summary',summary)
        onChange(experienceDetailsMap)
    }
    
    return(
        <>
            <div className="mt-10 ml-10 mr-10">
                <h2 className="text-3xl">Experience</h2>
                <div className="flex flex-wrap justify-evenly  mt-5">
                    <input onChange={(e)=>setDesignation(e.target.value)} className="border-2 border-black rounded-md p-1 " type="text" placeholder="Designation" />
                    <input onChange={(e)=>setCompanyName(e.target.value)} className="border-2 border-black rounded-md p-1" type="text" placeholder="Company Name" />
                    <input onChange={(e)=>setLocation(e.target.value)} className="border-2 border-black rounded-md p-1" type="text" placeholder="Location" />
                    <input onChange={(e)=>setStartingDate(e.target.value)} className="border-2 border-black rounded-md p-1 " type="date" placeholder="Starting Date"/>
                    <div>
                        <input name="endingDateInput" onChange={(e)=>setEndingDate(e.target.value)} className="border-2 border-black rounded-md p-1" type="date" placeholder="Ending Date" />
                        <input onChange={(e)=>{
                            setStillWorking(e.target.checked);
                            (document.getElementsByName('endingDateInput')[0] as HTMLInputElement).disabled = e.target.checked
                            }} type="checkbox" name="still-working"/>
                        <label htmlFor="still-working">Still Working</label>
                    </div>
                    
                </div>

                <div className="mt-7 flex flex-col items-center">
                    <h4 className="self-start">Summary</h4>
                    <textarea onChange={(e)=>setSummary(e.target.value)} className="border-2 border-black rounded-md p-1 w-full h-[150px] resize-none " name="" id=""></textarea>
                </div>
                <div className="relative float-right mt-20">
                    <SpecialBtn onClick={onNextClicked} link="cv_details/additional_details" content="Next" type="button" id="next"/>                    
                </div>
            </div>
        </>
    )
}

export default ExperienceInput