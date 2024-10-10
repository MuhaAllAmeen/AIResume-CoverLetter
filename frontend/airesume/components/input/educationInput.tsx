import { useState } from "react"
import SpecialBtn from "../specialbtn"

interface EducationInputProps{
    onChange: (educationDetails:Map<string,any>,index:number)=>void
    index:number
}
const EducationInput:React.FC<EducationInputProps> = ({onChange,index})=>{
    
    const[universityName,setUniversityName] = useState('')
    const[typeOfCourse,setTypeOfCourse] = useState('')
    const[fieldOfStudy,setFieldOfStudy] = useState('')
    const[educationStartDate,setEducationStartDate] = useState('')
    const[educationEndDate,setEducationEndDate] = useState('')
    const[educationSummary,setEducationSummary] = useState('')
    const[confirm,setConfirm] = useState(false)

    function onConfirmClicked(): void {
        const educationDetailsMap = new Map<string,any>()
        const formNumber = `education-${index.toString()}-`
        educationDetailsMap.set(formNumber+'education_name',universityName)
        educationDetailsMap.set(formNumber+'education_course',typeOfCourse)
        educationDetailsMap.set(formNumber+'education_field_of_study',fieldOfStudy)
        educationDetailsMap.set(formNumber+'start_date',educationStartDate)
        educationDetailsMap.set(formNumber+'end_date',educationEndDate)
        educationDetailsMap.set(formNumber+'education_summary',educationSummary)

        onChange(educationDetailsMap,index)


    }

    return (
        <>
            <div className="mt-10 ml-10 mr-10">
                <h2 className="text-3xl">Education Details</h2>
                <div className="flex flex-wrap justify-evenly mt-5">
                    <input onChange={(e)=>{setUniversityName(e.target.value); setConfirm(false)}} className="border-2 border-black rounded-md p-1" type="text" placeholder="University Name" />
                    <input onChange={(e)=>{setTypeOfCourse(e.target.value); setConfirm(false)}} className="border-2 border-black rounded-md p-1" type="text" placeholder="Type of Course"/>
                    <input onChange={(e)=>{setFieldOfStudy(e.target.value); setConfirm(false)}} className="border-2 border-black rounded-md p-1" type="text" placeholder="Field of Study" />
                    <input onChange={(e)=>{setEducationStartDate(e.target.value); setConfirm(false)}} className="border-2 border-black rounded-md p-1" type="date"  placeholder="Start Date"/>
                    <input onChange={(e)=>{setEducationEndDate(e.target.value); setConfirm(false)}} className="border-2 border-black rounded-md p-1" type="date"  placeholder="End Date"/>
                </div>
                <div className="mt-7 flex flex-col items-center">
                    <h4 className="self-start">Summary</h4>
                    <textarea onChange={(e)=>{setEducationSummary(e.target.value); setConfirm(false)}} className="border-2 border-black rounded-md p-1 w-full h-[150px] resize-none " name="education_desc" id="education_desc"></textarea>
                </div>
                <div className="float-right mt-3">
                    <button onClick={()=>{setConfirm(true); onConfirmClicked()}} className={`${confirm ? "text-green-600" : "text-red-500"} font-bold`}>{confirm ? "Confirmed":"Confirm"}</button>
                </div>
                
            </div>
        </>
    )
}

export default EducationInput