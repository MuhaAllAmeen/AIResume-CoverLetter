'use client'
import { useEffect, useState } from "react";
import { useDetails } from "../DetailsContext";
interface LanguageType {
    name: string;
    fluency: string;
  }

export default function LanguagesInput() {
  // State to hold the list of languages and their fluencies
  

  // State to hold the list of languages and their fluencies
  const [languages, setLanguages] = useState<LanguageType[]>([]);
  const setLanguageDetails = useDetails().setLanguages
  // State to hold the form inputs (can be duplicated)
  const [inputFields, setInputFields] = useState([
    { name: "", fluency: "basic" },
  ]);
  const [languageAdded,setLanguageAdded] = useState<boolean[]>([])

  // Handle changes in the input fields
  const handleInputChange = (index:number, event:any) => {
    setLanguageAdded((prev) => {
        const newLanguageAdded = [...prev];
        newLanguageAdded[index] = false;
        return newLanguageAdded;
      });
    const values = [...inputFields];
    if (event.target.name === "language") {
      values[index].name = event.target.value;
    } else if (event.target.name === "fluency") {
      values[index].fluency = event.target.value;
    }
    setInputFields(values);
  };

  useEffect(()=>{
    console.log('languages',languages)
  },[languages])
  // Handle adding a new language
  const handleAddLanguage = (index:number) => {
    const selectedLanguage = inputFields[index];
    if (selectedLanguage.name) {
      setLanguages((prevLanguages) => {
        setLanguageAdded((prev) => {
            const newLanguageAdded = [...prev];
            newLanguageAdded[index] = true;
            return newLanguageAdded;
          });
        if (prevLanguages.at(index)?.name == '' || prevLanguages.at(index)==null){
            setLanguageDetails([...prevLanguages,{name: selectedLanguage.name, fluency: selectedLanguage.fluency} ])
            return [...prevLanguages,{...selectedLanguage}]
        }else{
            const newLanguages = [...prevLanguages];
            newLanguages[index] = selectedLanguage;
            setLanguageDetails(newLanguages)

            return newLanguages;
        }
      });
    } else {
      alert("Please enter a language.");
    }
  };

  // Handle adding more input fields
  const handleAddMore = () => {
    setInputFields([...inputFields, { name: "", fluency: "basic" }]);
  };

  return (
    <div className="p-4">
        <h2 className="text-3xl mb-2">Languages</h2>
      {inputFields.map((input, index) => (
        <div key={index} className="mb-4">
          {/* Input for language */}
          <input
            type="text"
            name="language"
            placeholder="Enter language"
            value={input.name}
            onChange={(event) => handleInputChange(index, event)}
            className="border p-2 mr-4 rounded-md"
          />

          {/* Selector for fluency */}
          <select
            name="fluency"
            value={input.fluency}
            onChange={(event) => handleInputChange(index, event)}
            className="border p-2 mr-4"
          >
            <option value="basic">Basic</option>
            <option value="fluent">Fluent</option>
            <option value="native">Native</option>
          </select>
          <div className="flex justify-between mt-2">
            <button
              onClick={() => handleAddLanguage(index)}
              className="bg-primary text-white p-2 rounded"
            >
              Add
            </button>
            <button
              onClick={handleAddMore}
              className="bg-green-500 text-white p-2 rounded"
            >
              Add More Languages
            </button>
          </div>
          {/* Button to add the language */}
          
          {languageAdded[index] && (
            <label htmlFor="" className="ml-3 text-green-400">Added</label>
          )}
        </div>
      ))}

      {/* Button to add more input fields */}
      

      {/* Display added languages */}
      <div className="mt-4">
        <h3 className="font-bold">Added Languages:</h3>
        {languages.length > 0 ? (
          <ul>
            {languages.map((lang, index) => (
              <li key={index}>
                {lang.name} - {lang.fluency}
              </li>
            ))}
          </ul>
        ) : (
          <p>No languages added yet.</p>
        )}
      </div>
    </div>
  );
}
