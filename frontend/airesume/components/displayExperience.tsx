import { useEffect, useState } from "react"

interface DisplayExperienceProps{
    experiences: Array<Map<string,any>>
}
const DisplayExperience:React.FC<DisplayExperienceProps> = ({experiences})=>{
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index); // Toggle the index
    };

    return (
        <>
        <div className="bg-green-600 w-full px-12 py-5 rounded-md">
            {experiences.map((exp,index)=>{
                return(
                    <div key={index}>
                        <label htmlFor="">Experience {index+1}</label>
                        <div className="flex flex-col">
                            <div className="flex justify-around">
                                <p>{exp.get("designation")}</p>
                                <p>{exp.get("company_name")}</p>
                            </div>
                            <div className="flex justify-around">
                                <p>Started at: {exp.get("start_date")}</p>
                                <p>Ended at: {exp.get("end_date")}</p>
                            </div>
                            <div onClick={() => handleToggle(index)}
                                className={`transition-all duration-300 text-ellipsis ${expandedIndex === index ? 'h-auto' : 'h-12'} overflow-hidden`} >
                               <p>{exp.get("experience_summary")}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
        
        </>
        
    );
}

export default DisplayExperience