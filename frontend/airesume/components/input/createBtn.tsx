'use client'
import { getUserId } from "@/app/services/token"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Modal } from "../Modal"

interface CreateBtnProps{
    content: string
}

const CreateBtn:React.FC<CreateBtnProps> = ({content})=>{
    const router = useRouter()
    const [dialogOpen, setDialogOpen] = useState(false);
    const closeDialog = () => setDialogOpen(false);
    async function onCreateClicked (){
        const userId = await getUserId()
        if (!userId){
            setDialogOpen(true)
        }else{
            const params = new URLSearchParams()
            params.set("action",content)
            router.push("/job_summary"+"?"+params.toString())  
        }    
    }
    
    return(
        <>
        <button onClick={onCreateClicked} className="bg-blue-200 p-3 rounded-xl">
          {content}
        </button>
        {dialogOpen && (
            <Modal open={dialogOpen} onRequestClose={closeDialog} closeOnOutsideClick>
                <div className="w-[400px] h-[200px] ">
                    <button onClick={()=>{setDialogOpen(false)}} className="float-right  bg-red-500 px-4 rounded-es-xl">X</button>
                    <div className="h-full flex flex-col gap-3 justify-center items-center">
                        <h1>You are Not Logged In</h1>
                        <button onClick={()=>{router.push("/login")}} className="text-blue-400">Click Here to Login</button>                       
                    </div>

                </div>
            </Modal>
        )}
        </>
    )
}

export default CreateBtn