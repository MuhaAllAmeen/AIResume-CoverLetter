import apiService from "./api";

export async function sendDetailstoBackend(){
    if(sessionStorage.length > 0){
        const formData = new FormData()
        for (let i = 0; i <= sessionStorage.length; i++){
            let key = sessionStorage.key(i)
            if (key!=null && !key.endsWith("Number")){
               formData.set(key, sessionStorage.getItem(key) || '')
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
        formData.append('certification-TOTAL_FORMS', sessionStorage.getItem("CertificationNumber") || "0"); // For ProjectsFormSet
        formData.append('certification-INITIAL_FORMS', '0');
        formData.append('certification-MIN_NUM_FORMS', '1');
        formData.append('certification-MAX_NUM_FORMS', '10');
        formData.append('language-TOTAL_FORMS', sessionStorage.getItem("LanguageNumber") || "0"); // For ProjectsFormSet
        formData.append('language-INITIAL_FORMS', '0');
        formData.append('language-MIN_NUM_FORMS', '1');
        formData.append('language-MAX_NUM_FORMS', '10');
        formData.forEach((value, key) => {
            console.log(`form ${key}: ${value}`);
          });
        const response = await apiService.post('api/cv_details/create/',formData)
        return response
    }
}