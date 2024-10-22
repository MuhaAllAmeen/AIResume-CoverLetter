'use client'

import { EmailSVG, GitSVG, PhoneSVG } from "@/assets/svgs"
import jsPDF from "jspdf"
import { useEffect, useState } from "react"
import { renderToStaticMarkup } from "react-dom/server"

const Resume = ()=>{
    const content = typeof window !== 'undefined' ? localStorage.getItem('resume')?.match(RegExp(/\s([\s\S]*?)`/gmi))![0] : ""
    const jsonFriendlyString = content!.slice(0,-1)
    let jsonObject;
    try {
        jsonObject = JSON.parse(jsonFriendlyString);
    } catch (error) {
        console.error("Error parsing JSON:", error);
        jsonObject = {}; // Fallback to an empty object or handle as needed
    } 
    const resumeMap = new Map(Object.entries(jsonObject))
    const doc = new jsPDF('p','pt')
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()

    const [name,setName] = useState("")
    const [phone,setPhone] = useState("")
    const [email,setEmail] = useState("")
    const [github,setGitHub] = useState("")
    const [profileSummary,setProfileSummary] = useState("")
    const [skills,setSkills] = useState([])
    const [experience,setExperience] = useState([])
    const [projects,setProjects] = useState([])
    const [education,setEducation]= useState([])
    const [certifications,setCertification] = useState([])
    const [languages,setLanguages]= useState([])

    async function onDownload(){
        // doc.setFontSize(1)
        // new XMLSerializer().serializeToString('<svg width="22" height="22" viewBox="0 0 24 24" fill="none" ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M3.75 5.25L3 6V18L3.75 18.75H20.25L21 18V6L20.25 5.25H3.75ZM4.5 7.6955V17.25H19.5V7.69525L11.9999 14.5136L4.5 7.6955ZM18.3099 6.75H5.68986L11.9999 12.4864L18.3099 6.75Z" fill="#080341"></path> </g></svg>')
        const emailSvgString = renderToStaticMarkup(<EmailSVG />);
        const resumeHTMLHeight = document.getElementById("resume")?.clientHeight
        const svgBlob = new Blob([emailSvgString], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);
    
        // Use addImage to add the SVG to the PDF
        const img = new Image();
        img.src = url;
        img.onload = () => {
            doc.addImage(img, 'SVG', 10, 10, 44, 44); // Adjust the position and size as needed
        };         
        await doc.html(document.getElementById("resume") as HTMLElement,{callback: function (doc) {
            return doc;
          },
          margin:[resumeHTMLHeight!/(ptToPx(pageHeight))*10,0],
        //   width: 50,
        //   windowWidth: 50, 
              html2canvas: {
                scale:0.75,
                  letterRendering: true,
                  backgroundColor: "white",
                //   height:300
              },
          x: 0,
          y: 0,
          autoPaging: "text"})
          img.onload = () => {
            doc.addImage(img, 'SVG', 10, 10, 44, 44); // Adjust the position and size as needed
        }; 
        
        doc.output("dataurlnewwindow")
    }

    function ptToPx(pt:number){
        return pt / 72 * 96
    }

    useEffect(()=>{
        if(resumeMap.size > 0){
            setName(resumeMap.get("Name") as string)
            setPhone(resumeMap.get("Phone") as string)
            setEmail(resumeMap.get("Email") as string)
            setGitHub(resumeMap.get("Github Link") as string)
            setProfileSummary(resumeMap.get("Profile Summary") as string)
            setSkills(resumeMap.get("Skills") as [])
            setExperience(resumeMap.get("Experience") as [])
            setProjects(resumeMap.get("Projects") as [])
            setEducation(resumeMap.get("Education") as [])
            setCertification(resumeMap.get("Certifications") as [])
            setLanguages(resumeMap.get("Languages") as [])
        }
    },[])
    return(
        <>
        <div className="flex justify-around mt-10 mb-10">
            <div id="resume" className="flex flex-col px-8 border-2 w-[793px] h-fit pb-10">
                <div className="mt-7 flex justify-between">
                    <div className="flex flex-col">
                        <h3 className="text-3xl">{name}</h3>
                        <div className="flex gap-1 items-center">
                            {/* <EmailSVG /> */}
                            <h3>{email}</h3>
                        </div>
                    </div>
                    <div className="flex flex-col self-end">
                        <div className="flex gap-1 items-center">
                            {/* <PhoneSVG /> */}
                            <h3>{phone}</h3>
                        </div>
                        <div className="flex gap-1 items-center">
                            {/* <GitSVG /> */}
                            <h3>{github}</h3>
                        </div>
                        
                    </div>
                </div>
                <div className="mt-5">
                    <h2 className="text-2xl font-semibold">Software Developer</h2>
                    <p>{profileSummary}</p>
                </div>
                <div className="mt-7 flex flex-col">
                    <h2 className="text-2xl">Experience</h2>
                    <div className="flex flex-col gap-1">
                    {experience.map((exp)=>{
                        let expMap = new Map(Object.entries(exp))
                        return(
                            <>
                            <div key={exp} className="mt-2 flex gap-1">
                                <label htmlFor="">{expMap.get("designation") as string} | </label>
                                <label htmlFor="">{expMap.get("company_name") as string} | </label>
                                <label htmlFor="">{expMap.get("start_date") as string} |</label>
                                <label htmlFor="">{expMap.get("end_date") as string}</label>
                            </div>
                            <p>
                                {(expMap.get("experience_summary") as string).split(".")
                                .map((line,index)=>line!=""?(<li key={index}>{line}.<br /></li>):<></>)}
                            </p>
                            </>    
                        )
                    })}                    
                    </div>
                </div>
                <div className="mt-7 flex flex-col">
                    <h2 className="text-2xl">Education</h2>
                    <div className="flex flex-col gap-1">
                    {education.map((edu)=>{
                        let eduMap = new Map(Object.entries(edu))
                        return(
                            <>
                            <div key={edu} className="mt-2 flex gap-1">
                                <label htmlFor="">{eduMap.get("education_name") as string} | </label>
                                <label htmlFor="">{eduMap.get("education_course") as string} | </label>
                                <label htmlFor="">{eduMap.get("education_field_of_study") as string} | </label>
                                <label htmlFor="">{eduMap.get("start_date") as string} |</label>
                                <label htmlFor="">{eduMap.get("end_date") as string}</label>
                            </div>
                            <p>
                                {(eduMap.get("education_summary") as string).split(".")
                                .map((line,index)=>line!=""?(<li key={index}>{line}.<br /></li>):<></>)}
                            </p>
                            </>    
                        )
                    })}                    
                    </div>
                </div>
                <div className="mt-7 flex flex-col">
                    <h2 className="text-2xl">Projects</h2>
                    <div className="flex flex-col gap-1">
                        {projects.map((proj)=>{
                            let projMap = new Map(Object.entries(proj))
                            return(
                                <>
                                    <div key={proj} className="mt-2 flex gap-1">
                                        <label htmlFor="">{projMap.get("project_name") as string} | </label>
                                        <label htmlFor="">{projMap.get("project_link") as string} | </label>
                                    </div>
                                    <label htmlFor="">{projMap.get("project_technologies_used") as string}</label>
                                    <p>
                                        {(projMap.get("project_description") as string).split(/(?<=\.)\s+(?=[A-Z])/)
                                            .map((sentence, index) => (
                                                <li key={index}>{sentence.trim()}</li>
                                            ))}
                                    </p>
                                </>
                            )
                        })}
                    </div>
                    
                </div>
                <div className="mt-7 flex flex-col">
                    <h2 className="text-2xl">Certifications</h2>
                    <div className="mt-2 flex gap-5 flex-wrap">
                    {certifications.map((cert)=>{
                        let certMap = new Map(Object.entries(cert))
                        return(
                            <div key={cert} className="flex flex-col">
                                <label htmlFor="">{certMap.get("certification_name") as string}</label>
                                <label htmlFor="">{certMap.get("certification_link") as string}</label>
                            </div>
                        )
                    })}      
                    </div>
                </div>
                <div id="skill" className="mt-7 flex flex-wrap gap-2">
                    <div className=" w-[300px] border-r-2">
                        <h2 className="text-2xl">Skills</h2>
                        {skills.map((skill) => (
                                <label key={skill} htmlFor="">{skill}, </label>
                        ))}
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-2xl">Languages</h2>
                        <div className="flex flex-col">
                            {languages.map((lang)=>{
                            let langMap = new Map(Object.entries(lang))
                                return(
                                    <div key={lang} className="flex flex-col">
                                        <label htmlFor="">{langMap.get("language_name") as string}</label>
                                        <label htmlFor="">{langMap.get("language_fluency") as string}</label>
                                    </div>                                 
                                )
                            })}
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className=" self-center">
                <div className="flex flex-col items-center">
                    <button className="bg-black text-white px-5 py-2 rounded-md" onClick={onDownload}>Download</button>    
                    <label className="text-gray-500 text-sm" htmlFor="">as PDF</label>
                </div>  
            </div>
        </div>
        

        </>
    )
}

export default Resume