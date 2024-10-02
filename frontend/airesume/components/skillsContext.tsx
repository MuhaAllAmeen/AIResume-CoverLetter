'use client';
import React, { createContext, useContext, useState } from "react";

interface SkillsContextType {
    skills: string[];
    setSkills: React.Dispatch<React.SetStateAction<string[]>>;
}

const SkillsContext = createContext<SkillsContextType | undefined>(undefined);

export const SkillsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [skills, setSkills] = useState<string[]>([]);

    return (
        <SkillsContext.Provider value={{ skills, setSkills }}>
            {children}
        </SkillsContext.Provider>
    );
};

export const useSkills = () => {
    const context = useContext(SkillsContext);
    if (!context) {
        throw new Error("useSkills must be used within a SkillsProvider");
    }
    return context;
};