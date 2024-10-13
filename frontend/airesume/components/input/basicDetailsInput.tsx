'use client'
import { useEffect, useState } from "react";
import SpecialBtn from "../specialbtn";

interface BasicDetailsInputProps{
    onChange: (basicDetails:Map<string,string>)=> void;
}

const BasicDetailsInput:React.FC<BasicDetailsInputProps> = ({onChange})=>{

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [github,setGithub] = useState('')
    const [summary,setSummary] = useState('')

    function onNextClicked(){
        const detailsMap = new Map<string, string>();
        detailsMap.set('name', name);
        detailsMap.set('email', email);
        detailsMap.set('phone', phone);
        detailsMap.set('github', github);
        detailsMap.set('profile_summary', summary);
        onChange(detailsMap)
    }
    useEffect(()=>{
        sessionStorage.clear()
    })

    return (
        <>
        <div className="mt-5 ml-10 mr-10" >
            <h2 className="text-3xl font-bold">Basic Details</h2>
            <div className="flex justify-evenly mt-6">
                <input onChange={(e)=>setName(e.target.value)} className="border-2 border-primary rounded-md p-1" type="text" placeholder="Your Name" />
                <input onChange={(e)=>setPhone(e.target.value.toString())} className="border-2 border-primary rounded-md p-1" type="number" placeholder="Your Number" />
                <input onChange={(e)=>setEmail(e.target.value)} className="border-2 border-primary rounded-md p-1" type="email" placeholder="Your Email" />
                <input onChange={(e)=>setGithub(e.target.value)} className="border-2 border-primary rounded-md p-1" type="text" placeholder="Your Github" />
            </div>
            
            <div className="mt-7 flex flex-col items-center">
                    <h4 className="self-start">Summary</h4>
                    <textarea onChange={(e)=>setSummary(e.target.value)} className="border-2 border-primary rounded-md p-1 w-full h-[150px] resize-none " name="" id=""></textarea>
            </div>
            <div className="relative float-right mt-20">
                    <SpecialBtn onClick={onNextClicked} link="cv_details/additional_details" content="Next" type="button" id="next"/>                    
            </div>
            
        </div>
        </>
    )
}
export default BasicDetailsInput