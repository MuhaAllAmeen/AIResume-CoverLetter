'use client';
import { useEffect, useState } from "react";
import SkillsOutput from "../skillsOutput"
import { useSkills } from "../skillsContext";
import { useDetails } from "../DetailsContext"

const SkillsInput = () =>{
    // const {skills,setSkills} = useSkills()
    const { skills, setSkills } = useDetails();
    const [skill, setSkill] = useState('');
    useEffect(()=>{

    },[skills])

    const handleAddBtn = ()=>{
        let value =(document.getElementById('skills-input') as HTMLInputElement)?.value
        if (value) {
            setSkills([...skills, value]);
        }
    }
    return(
        <>
            <div >
                <h2 className="text-3xl">Skills</h2>
                <input onChange={(e)=>setSkill(e.target.value)} id="skills-input" type="text" className="mt-5 border-2 border-black rounded-md mr-6"/>
                <button onClick={handleAddBtn} className="bg-primary text-white p-1 rounded-md px-3 border-2">Add</button>
            </div>
        </>
    )
}

export default SkillsInput