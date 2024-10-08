import { useState } from "react";

interface DisplayEducationProps{
    educations: Array<Map<string,any>>
}
const DisplayEducation:React.FC<DisplayEducationProps> = ({educations})=>{
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index); // Toggle the index
    };
    return(
        <>
            <div className="bg-green-600 w-full px-12 py-5 rounded-md">
                {educations.map((edu,index)=>{
                    return(
                        <div key={index}>
                        <label htmlFor="">Education {index+1}</label>
                        <div className="flex flex-col">
                            <div className="flex justify-around">
                                <p>{edu.get("education_name")}</p>
                                <p>{edu.get("education_course")}</p>
                            </div>
                            <div className="flex justify-around">
                                <p>{edu.get("education_field_of_study")}</p>
                                <p>{edu.get("start_date")}</p>
                                <p>{edu.get("end_date")}</p>

                            </div>
                            <div onClick={() => handleToggle(index)}
                                className={`transition-all duration-300 text-ellipsis ${expandedIndex === index ? 'h-auto' : 'h-12'} overflow-hidden`} >
                               <p>{edu.get("education_summary")}</p>
                            </div>
                        </div>
                    </div>
                    )
                })}
            </div>
            
        </>
    )
}

export default DisplayEducation