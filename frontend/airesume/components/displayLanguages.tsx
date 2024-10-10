import { useState } from "react";

interface DisplayCertificationsProps{
    languages: Array<Map<string,any>>
}
const DisplayLanguages:React.FC<DisplayCertificationsProps> = ({languages})=>{
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index); // Toggle the index
    };
    return(
        <>
            <div className="bg-green-600 w-full px-12 py-5 rounded-md">
                {languages.map((lang,index)=>{
                    lang = new Map(Object.entries(lang))
                    return(
                        <div key={index}>
                        <label htmlFor="">Language {index+1}</label>
                        <div className="flex flex-col">
                            <div className="flex justify-around">
                                <p>{lang.get("language_name")}</p>
                                <p>{lang.get("language_fluency")}</p>
                            </div>
                            
                        </div>
                    </div>
                    )
                })}
            </div>
            
        </>
    )
}

export default DisplayLanguages