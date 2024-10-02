'use client';
import { useState } from "react";
import CertificationInput from "./input/certificationInput"
import { useDetails } from "./DetailsContext";

const CertificationInputHandler = () =>{
    const [certificateInputList, setCertificateInputList] = useState([<CertificationInput onAddCertificate={appendToCertificateList} index={0} />])
    const { certifications, setCertifications } = useDetails();

    function onAddBtn() {
        setCertificateInputList(prevComponents => [
            ...prevComponents,
            <CertificationInput onAddCertificate={appendToCertificateList} key={prevComponents.length} index={prevComponents.length}  />
        ]);        
        console.log(certificateInputList)
    }

    function appendToCertificateList(certificateMap:Map<string,string>,index:number){
        if (certificateMap.size == 0){
            return
        }else{
            certificateMap.forEach((value,key)=>{
                setCertifications(prevCerts => {
                    if (prevCerts.at(index)?.name == '' || prevCerts.at(index)==null){
                        return [...prevCerts,{name:key,link:value}]
                    }else{
                        const newCerts = [...prevCerts];
                        newCerts[index] = {name:key,link:value};            
                        return newCerts;
                    }
                })
            })
        }
    }

    return (
        <>
        <div className="mt-10 flex flex-col justify-center items-center">
            <h2 className="text-3xl">Certifications</h2>
            <div className="flex gap-2 flex-wrap justify-center items-center">
                {certificateInputList.map((certificate, index) => {
                return(
                    <CertificationInput onAddCertificate={appendToCertificateList} index={index} key={index}/> 
                )
                })}
            </div>
            
            <button onClick={onAddBtn} className="text-blue-600 p-1  mt-2">Add More Certificates</button>
            </div>
        </>
    )
}

export default CertificationInputHandler
