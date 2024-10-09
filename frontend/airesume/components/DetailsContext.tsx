'use client'
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface LanguageType{
    name: string;
    fluency: string;
}

interface Certification{
    name: string;
    link: string;
}

interface DetailsContextType {
    details: Map<string, any>;
    setDetails: React.Dispatch<React.SetStateAction<Map<string, string>>>;
    skills: string[];
    setSkills: React.Dispatch<React.SetStateAction<string[]>>;
    certifications: Certification[];
    setCertifications: React.Dispatch<React.SetStateAction<Certification[]>>;
    languages: LanguageType[];
    setLanguages: React.Dispatch<React.SetStateAction<LanguageType[]>>;
}

const DetailsContext = createContext<DetailsContextType | undefined>(undefined);

export const DetailsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [details, setDetails] = useState(new Map<string, any>());
    const [skills, setSkills] = useState<string[]>([]);
    const [certifications, setCertifications] = useState<Certification[]>([]);
    const [languages, setLanguages] = useState<LanguageType[]>([]);

    useEffect(() => {
        // Load details from sessionStorage on mount
        let detailMap = new Map<string,any>()
        for (let i=0; i<= sessionStorage.length ; i++){
            let key = sessionStorage.key(i)
            if (key!=null){
                detailMap.set(key,sessionStorage.getItem(key)|| '') 
            }
        }
        setDetails(detailMap)
    }, []);

    useEffect(() => {
        // Save details to sessionStorage whenever it changes
        details.forEach((value,key)=>{
            sessionStorage.setItem(key,value)
        })
    }, [details]);
    
    return (
        <DetailsContext.Provider value={{ details, setDetails, skills, setSkills, certifications, setCertifications, languages, setLanguages }}>
            {children}
        </DetailsContext.Provider>
    );
};

export const useDetails = () => {
    const context = useContext(DetailsContext);
    if (!context) {
        throw new Error('useDetails must be used within a DetailsProvider');
    }
    return context;
};