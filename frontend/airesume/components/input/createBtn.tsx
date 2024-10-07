'use client'
import { useRouter, useSearchParams } from "next/navigation"

interface CreateBtnProps{
    content: string
}

const CreateBtn:React.FC<CreateBtnProps> = ({content})=>{
    const router = useRouter()
    function onCreateClicked (){
        const params = new URLSearchParams()
        params.set("action",content)
        router.push("/job_summary"+"?"+params.toString())

    }
    
    return(
        <>
        <button onClick={onCreateClicked} className="bg-blue-200 p-3 rounded-xl">
          {content}
        </button>
        </>
    )
}

export default CreateBtn