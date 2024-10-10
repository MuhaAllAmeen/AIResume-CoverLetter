import apiService from "./api";

export async function sendDetailstoBackend(){
    if(sessionStorage.length > 0){
        const formData = new FormData()
        for (let i = 0; i <= sessionStorage.length; i++){
            let key = sessionStorage.key(i)
            if (key!=null && !key.endsWith("Number")){
                if (key=="certifications"){
                    const s = sessionStorage.getItem(key)
                    s?.trim().split(",").forEach((sp) => {
                        if (sp.trim() !== "") {
                          sp.trim().split("and").forEach((part) => {
                            const [key, value] = part.split(": ").map(str => str.trim());
                            if (key && value) {
                              // Append only values (names and links)
                              if (key.toLowerCase().includes("certification name")) {
                                formData.append('certification_name', value);
                              } else if (key.toLowerCase().includes("certification link")) {
                                formData.append('certification_link', value);
                              }
                            }
                          });
                        }
                      });
                }else if(key=="languages"){
                    const s = sessionStorage.getItem(key)
                    s?.trim().split(",").forEach((sp) => {
                        if (sp.trim() !== "") {
                          sp.trim().split("and").forEach((part) => {
                            const [key, value] = part.split(": ").map(str => str.trim());
                            if (key && value) {
                              // Append only values (names and links)
                              if (key.toLowerCase().includes("language name")) {
                                formData.append('language_name', value);
                              } else if (key.toLowerCase().includes("language fluency")) {
                                formData.append('language_fluency', value);
                              }
                            }
                          });
                        }
                      });
                }else{
                    formData.set(key, sessionStorage.getItem(key) || '')
                }
            }
        }
        formData.append('experience-TOTAL_FORMS', sessionStorage.getItem("ExperienceNumber") || "0");
        formData.append('experience-INITIAL_FORMS', '0'); // Assuming no initial forms
        formData.append('experience-MIN_NUM_FORMS', '1'); // Minimum number of forms
        formData.append('experience-MAX_NUM_FORMS', '10');
        formData.append('education-TOTAL_FORMS', sessionStorage.getItem("EducationNumber") || "0"); // For ProjectsFormSet
        formData.append('education-INITIAL_FORMS', '0');
        formData.append('education-MIN_NUM_FORMS', '1');
        formData.append('education-MAX_NUM_FORMS', '10');
        formData.append('project-TOTAL_FORMS', sessionStorage.getItem("ProjectNumber") || "0"); // For ProjectsFormSet
        formData.append('project-INITIAL_FORMS', '0');
        formData.append('project-MIN_NUM_FORMS', '1');
        formData.append('project-MAX_NUM_FORMS', '10');
        formData.forEach((value, key) => {
            console.log(`form ${key}: ${value}`);
          });
        const response = await apiService.post('api/cv_details/create/',formData)
        return response
    }
}