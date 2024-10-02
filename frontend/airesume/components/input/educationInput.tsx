import { useState } from "react"
import SpecialBtn from "../specialbtn"

interface EducationInputProps{
    onChange: (educationDetails:Map<string,any>)=>void
}
const EducationInput:React.FC<EducationInputProps> = ({onChange})=>{
    
    const[universityName,setUniversityName] = useState('')
    const[typeOfCourse,setTypeOfCourse] = useState('')
    const[fieldOfStudy,setFieldOfStudy] = useState('')
    const[educationStartDate,setEducationStartDate] = useState('')
    const[educationEndDate,setEducationEndDate] = useState('')
    const[educationSummary,setEducationSummary] = useState('')

    function onNextClicked(): void {
        const educationDetailsMap = new Map<string,any>()
        educationDetailsMap.set('education_name',universityName)
        educationDetailsMap.set('education_course',typeOfCourse)
        educationDetailsMap.set('education_field_of_study',fieldOfStudy)
        educationDetailsMap.set('start_date',educationStartDate)
        educationDetailsMap.set('end_date',educationEndDate)
        educationDetailsMap.set('education_summary',educationSummary)

        onChange(educationDetailsMap)


    }

    return (
        <>
            <div className="mt-10 ml-10 mr-10">
                <h2 className="text-3xl">Education Details</h2>
                <div className="flex flex-wrap justify-evenly mt-5">
                    <input onChange={(e)=>setUniversityName(e.target.value)} className="border-2 border-black rounded-md p-1" type="text" placeholder="University Name" />
                    <input onChange={(e)=>setTypeOfCourse(e.target.value)} className="border-2 border-black rounded-md p-1" type="text" placeholder="Type of Course"/>
                    <input onChange={(e)=>setFieldOfStudy(e.target.value)} className="border-2 border-black rounded-md p-1" type="text" placeholder="Field of Study" />
                    <input onChange={(e)=>setEducationStartDate(e.target.value)} className="border-2 border-black rounded-md p-1" type="date"  placeholder="Start Date"/>
                    <input onChange={(e)=>setEducationEndDate(e.target.value)} className="border-2 border-black rounded-md p-1" type="date"  placeholder="End Date"/>
                </div>
                <div className="mt-7 flex flex-col items-center">
                    <h4 className="self-start">Summary</h4>
                    <textarea onChange={(e)=>setEducationSummary(e.target.value)} className="border-2 border-black rounded-md p-1 w-full h-[150px] resize-none " name="education_desc" id="education_desc"></textarea>
                </div>
                <div className="relative float-right mt-20">
                    <SpecialBtn onClick={onNextClicked} link="cv_details/additional_details" content="Next" type="button" id="next"/>                    
                </div>
            </div>
        </>
    )
}

export default EducationInput