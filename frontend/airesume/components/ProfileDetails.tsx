'use client'

import { useEffect, useState } from "react"
import DisplayExperience from "./displayExperience"
import DisplayProjects from "./displayProjects"
import { DownwardsSVG, SidewardsSVG } from "@/assets/svgs"
import DisplayEducation from "./displayEducation"
import DisplayCertifications from "./displayCertifications"
import DisplayLanguages from "./displayLanguages"

interface ProfileDetailsProps{
    content: any
}

const ProfileDetails:React.FC<ProfileDetailsProps> =({content})=>{
    
    const [details,setDetails] = useState<Map<string,any>>(new Map<string,any>(Object.entries(content)))
    const [expandField,toggleExpandField] = useState<[boolean,boolean,boolean,boolean,boolean]>([false,false,false,false,false])
    enum fields  {
        Experience,
        Projects,
        Education,
        Certifications,
        Language
    }
    useEffect(()=>{
        console.log("ww",details, details.get("Experience"))
    }, [details])
    
    return(
        <>
        <div className="flex flex-col gap-2 ">
            <div className="flex justify-between">
                <label htmlFor="">Name: </label>{details.get("name") as string}
                <label htmlFor="">Phone: </label>{details.get("phone")}
            </div>
            <div className="flex justify-between">
                <label htmlFor="">Email: </label>{details.get("email") as string}
                <label htmlFor="">GitHub: </label>{details.get("github")}
            </div>

            <div className="flex flex-col gap-4 mt-10 items-center">
                <div onClick={()=>{toggleExpandField((val) => {
                    const newState : [boolean, boolean, boolean, boolean, boolean] = [...val]; // Create a copy of the current state
                    newState[fields.Experience] = !newState[fields.Experience]; // Update the specific field
                    return newState; // Return the updated state
                })}} className="cursor-pointer hover:bg-primary hover:rounded-lg hover:px-3 transition-all">
                        <label className="flex items-center" htmlFor="">Experiences {expandField[fields.Experience] ? <SidewardsSVG /> : <DownwardsSVG />}
                        </label>

                    
                </div>
                {expandField[fields.Experience] && (
                    <DisplayExperience experiences={details.get("Experience")} />                )}
                
                <div onClick={()=>{toggleExpandField((val) => {
                    const newState : [boolean, boolean, boolean, boolean, boolean] = [...val]; // Create a copy of the current state
                    newState[fields.Projects] = !newState[fields.Projects]; // Update the specific field
                    return newState; // Return the updated state
                })}} className="cursor-pointer hover:bg-primary hover:rounded-lg hover:px-3 transition-all">
                    <label className="flex items-center" htmlFor="">Projects {expandField[fields.Projects] ? <SidewardsSVG /> : <DownwardsSVG />}
                    </label>
                </div>
                {expandField[fields.Projects] && (
                    <DisplayProjects projects={details.get("Projects")} />
                )}

                <div onClick={()=>{toggleExpandField((val) => {
                    const newState : [boolean, boolean, boolean, boolean, boolean] = [...val]; // Create a copy of the current state
                    newState[fields.Education] = !newState[fields.Education]; // Update the specific field
                    return newState; // Return the updated state
                })}} className="cursor-pointer hover:bg-primary hover:rounded-lg hover:px-3 transition-all">
                    <label className="flex items-center" htmlFor="">Education {expandField[fields.Education] ? <SidewardsSVG /> : <DownwardsSVG />}</label>
                </div >
                {expandField[fields.Education] && (
                    <DisplayEducation educations={details.get("Education")}/>
                )}


                <div onClick={()=>{toggleExpandField((val) => {
                    const newState : [boolean, boolean, boolean, boolean, boolean] = [...val]; // Create a copy of the current state
                    newState[fields.Certifications] = !newState[fields.Certifications]; // Update the specific field
                    return newState; // Return the updated state
                })}} className="cursor-pointer hover:bg-primary hover:rounded-lg hover:px-3 transition-all">
                    <label className="flex items-center" htmlFor="">Certifications {expandField[fields.Certifications] ? <SidewardsSVG /> : <DownwardsSVG />}</label>
                </div>
                {expandField[fields.Certifications] && (
                    <DisplayCertifications certifications={details.get("Certifications")}/>
                )}

                <div onClick={()=>{toggleExpandField((val) => {
                    const newState : [boolean, boolean, boolean, boolean, boolean] = [...val]; // Create a copy of the current state
                    newState[fields.Language] = !newState[fields.Language]; // Update the specific field
                    return newState; // Return the updated state
                })}} className="cursor-pointer hover:bg-primary hover:rounded-lg hover:px-3 transition-all">
                    <label className="flex items-center" htmlFor="">Languages {expandField[fields.Language] ? <SidewardsSVG /> : <DownwardsSVG />}</label>
                </div>
                {expandField[fields.Language] && (
                    <DisplayLanguages languages={details.get("Languages")}/>
                )}

            </div>
            
        </div>
        
        </>
    )
}
export default ProfileDetails