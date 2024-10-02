'use client'
import { useRouter } from "next/navigation"

const CreateBtn = ()=>{
    const router = useRouter()
    function onCreateClicked (){
        router.replace("/job_summary")
    }
    
    return(
        <>
        <button onClick={onCreateClicked} className="bg-blue-200 p-3 rounded-xl">
          Create 
        </button>
        </>
    )
}

export default CreateBtn