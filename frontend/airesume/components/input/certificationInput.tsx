import { useState } from "react"

interface CertificationInputProps {
    onAddCertificate: (certificate: Map<string, string>,index:number) => void;
    index: number
}

const CertificationInput: React.FC<CertificationInputProps> = ({ index, onAddCertificate }) => {
    function onAddBtn(){
        const certificateMap = new Map<string,string>()
        certificateMap.set(certificateName,certificateLink)
        setcertificationAdded(true)
        onAddCertificate(certificateMap,index)
    }
    
    const [certificateName,setCertificateName] = useState('')
    const [certificateLink,setCertificateLink] = useState('')
    const [certificationAdded,setcertificationAdded] = useState(false)

    return (
        <>
            <div className="mt-5 flex flex-col gap-1 w-fit justify-center items-center">
                <input onChange={(e)=>{setCertificateName(e.target.value); setcertificationAdded(false)}} className="border-2 border-black rounded-md" name={`certificate-name-${index}`} type="text" placeholder="Certificate Name" />
                <input onChange={(e)=>{setCertificateLink(e.target.value); setcertificationAdded(false)}} className="border-2 border-black rounded-md" name={`certificate-link-${index}`} type="link" placeholder="Certificate Link" />
                <button onClick={onAddBtn} className="bg-primary text-white px-5 py-2 rounded-md">Add</button>
                {certificationAdded && (
                    <label htmlFor="" className="text-green-500 ml-3">Added</label>
                )}
            </div >
        </>
    )
}

export default CertificationInput

// {() => {
//     let certificateName = (document.querySelector(`input[name="certificate-name-${index}"]`) as HTMLInputElement)?.value;
//     let certificateLink = (document.querySelector(`input[name="certificate-link-${index}"]`) as HTMLInputElement)?.value;
//         let certificateMap = new Map<string, string>();
//         if (certificateName && certificateLink) {
//             certificateMap.set(certificateName, certificateLink);
//         }
//         console.log(certificateName,index)
//         onAddCertificate(certificateMap)}
//         }