import { useState } from "react";

interface DisplayCertificationsProps{
    certifications: Array<Map<string,any>>
}
const DisplayCertifications:React.FC<DisplayCertificationsProps> = ({certifications})=>{
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index); // Toggle the index
    };
    return(
        <>
            <div className="bg-green-600 w-full px-12 py-5 rounded-md">
                {certifications.map((cert,index)=>{
                    cert = new Map(Object.entries(cert))
                    return(
                        <div key={index}>
                        <label htmlFor="">Certification {index+1}</label>
                        <div className="flex flex-col">
                            <div className="flex justify-around">
                                <p>{cert.get("certification_name")}</p>
                                <p>{cert.get("certification_link")}</p>
                            </div>
                            
                        </div>
                    </div>
                    )
                })}
            </div>
            
        </>
    )
}

export default DisplayCertifications