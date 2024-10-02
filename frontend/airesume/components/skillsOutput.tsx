'use client';
import { useEffect, useState } from "react"
import { useSkills } from "./skillsContext";
import { useDetails } from "./DetailsContext";

// interface SkillsOutput{
//     skills:Array<String>
// }

const SkillsOutput = ()=>{
    // const { skills, setSkills } = useSkills();
    const { skills, setSkills } = useDetails();

    // useEffect(()=>{
    //     setEditedSkills(skills)
    // },[skills])

    const removeSkills = (index:number) =>{
        setSkills(skills => skills.filter((_, i) => i !== index));
        // console.log(skills.splice(index,1))
    }
    return (
        <>
            <div className="flex justify-evenly mt-2 flex-wrap gap-1">
                {skills.map((skill,index) =>{
                   return <span key={index} className="bg-slate-400 p-2 rounded-md mt-2">
                    <label htmlFor="delete-btn">{skill}</label>
                    <button onClick={()=>removeSkills(index)} name="delete-btn" className="bg-slate-600 ml-2 py-1 text-[12px] text-slate-100 px-2 rounded-2xl">X</button>
                    </span>
                })}
            </div>
        </>
    )
}

export default SkillsOutput