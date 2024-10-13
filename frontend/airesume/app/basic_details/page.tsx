'use client'
import { useDetails } from "@/components/DetailsContext"
import BasicDetailsInput from "@/components/input/basicDetailsInput"
import { useRouter } from "next/navigation"

const CVDetails = ()=>{
    const router = useRouter()
    const { details, setDetails } = useDetails();
    
    function saveBasicDetails(basicDetails:Map<string,string>){
        console.log(basicDetails)
        setDetails(basicDetails)
        router.replace('/experience_details');

    }

    return (
        <>
            <div className="flex flex-col gap-4 justify-center items-center min-h-screen">
                <div className="border-2 bg-secondary rounded-xl shadow-xl shadow-black p-4 w-[1000px]">
                    <BasicDetailsInput onChange={saveBasicDetails} />
                </div>   
            </div>
        </>
    )
}

export default CVDetails