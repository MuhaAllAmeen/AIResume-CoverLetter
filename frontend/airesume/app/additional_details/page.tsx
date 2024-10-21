'use client'
import CertificationInputHandler from "@/components/CertificationInputHandler"
import { useDetails } from "@/components/DetailsContext"
import LanguagesInput from "@/components/input/languagesInput"
import SkillsInput from "@/components/input/skillsInput"
import { SkillsProvider } from "@/components/skillsContext"
import SkillsOutput from "@/components/skillsOutput"
import SpecialBtn from "@/components/specialbtn"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { sendDetailstoBackend } from "../services/sendOrGetDetails"

const AdditionalDetails =()=>{
    const router = useRouter()
    const { details, setDetails, skills, certifications, languages } = useDetails();
    const [currentComponent, setCurrentComponent] = useState(0);
    const [errors,setErrors]= useState<string[]>([])
    const [isLoading,setIsLoading] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (containerRef.current) {
            const scrollPosition = containerRef.current.scrollTop;
            const containerHeight = containerRef.current.clientHeight;
            const contentHeight = containerRef.current.scrollHeight;
            // Toggle visibility based on scroll position
            if (scrollPosition + containerHeight >= contentHeight) {
                setCurrentComponent((prev) => (prev + 1) % 3);
                // containerRef.current.scrollTo(0, 0); // Reset scroll position to top
            }
        }
    };

    useEffect(()=>{
        const container = containerRef.current;
        console.log(container,currentComponent)
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => {
                container.removeEventListener('scroll', handleScroll);
            };
        }
        
    })


    async function saveAdditionalDetails(){
        setIsLoading(true)
        const additionalDetails = new Map<string,string>()

        additionalDetails.set('skills',skills.toString())
        
        certifications.forEach((cert,index)=>{
            additionalDetails.set(`certification-${index}-certification_name`,cert.name)
            additionalDetails.set(`certification-${index}-certification_link`,cert.link)
        })
        additionalDetails.set("CertificationNumber",certifications.length.toString())

        languages.forEach((lang,index)=>{
            additionalDetails.set(`language-${index}-language_name`,lang.name)
            additionalDetails.set(`language-${index}-language_fluency`,lang.fluency)
        })
        additionalDetails.set("LanguageNumber",languages.length.toString())


        const updatedDetails = new Map(details);
        additionalDetails.forEach((value, key) => {
            updatedDetails.set(key, value);
            sessionStorage.setItem(key, value);
        });
        setDetails(updatedDetails);
        const response = await sendDetailstoBackend()
        if (response.success){
            setIsLoading(false)
            router.replace("/")
        }else{
            setIsLoading(false)
            const tmpErrors: string[] = Object.values(response).map((error: any)=>{
                return error;
            })
            setErrors(tmpErrors)
        }
    }

    
    
    return(
        <>
        {/* <a href="/register/cv_details">
        <svg width="50px" height="50px" viewBox="0 0 1024 1024" fill="#000000" className="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z" fill="" /></svg>
        </a> */}
        <div className="h-screen flex justify-center items-center">
                <div ref={containerRef} className="w-96 h-96 bg-secondary shadow-lg rounded-lg overflow-y-scroll">
                     
                        <div className="w-full h-full  flex flex-col justify-center items-center">
                            <SkillsProvider>
                                <SkillsInput />
                                <SkillsOutput />
                            </SkillsProvider>
                        </div>
                        
                    
                     
                        <div className="w-full h-full flex flex-wrap justify-center items-center">
                            <CertificationInputHandler />
                        </div>
                    
                        <div className="w-full h-full flex flex-col justify-center items-center">
                            <LanguagesInput />
                        </div>
                        <div className="float-right mr-9 mt-10 mb-10 relative right-0 bottom-0">
                            <SpecialBtn onClick={()=>{
                                saveAdditionalDetails()
                            }}  content={isLoading ? "Saving":"Next"} disabled={isLoading} type="button" id="next"/>                    
                        </div>
                </div>
            </div>
            
            {errors.map((error,index)=>{
                    return (
                        <div key={`error_${index}`} className="p-2 z-2 absolute bottom-0 bg-slate-600 w-fit text-white rounded-xl opacity-80">
                            {error}
                        </div>
                    )
                })}
            
        </>
    )
}

export default AdditionalDetails

