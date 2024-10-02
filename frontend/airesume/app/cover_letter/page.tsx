'use client'
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const CoverLetter=()=>{

    const router = useRouter()
    const content = localStorage.getItem("cover_letter")
    return(
        <>
        <div>
        <div dangerouslySetInnerHTML={{__html: content!}} />
            
        </div>
        {/* {content} */}
        </>
    )
}

export default CoverLetter