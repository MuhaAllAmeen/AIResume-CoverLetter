import { getAccessToken } from "./token";

const mainurl='http://localhost:8000/'
const apiService = {
    get: async function (url: string): Promise<any>{
        const token = await getAccessToken()
        return new Promise((resolve,reject)=>{
            fetch(`${mainurl}${url}`,{
                method:"GET",
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then((data)=>{
                resolve(data);
            })
            .catch(error=> reject(error))
        })
    },

    post: async function (url: string, data:any): Promise<any>{
        const token = await getAccessToken()
        return new Promise((resolve,reject)=>{
            fetch(`${mainurl}${url}`,{
                method:"POST",
                body: data,
                headers:{
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then(response => response.json())
            .then((data)=>{
                resolve(data);
            })
            .catch(error=> reject(error))
        })
    },
    postWithoutToken: async function (url: string, data:any): Promise<any>{
        return new Promise((resolve,reject)=>{
            fetch(`${mainurl}${url}`,{
                method:"POST",
                body: data,
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then((data)=>{
                resolve(data);
            })
            .catch(error=> reject(error))
        })
    },
    postContent: async function (url: string, data:any): Promise<any>{
        const token = await getAccessToken()
        return new Promise((resolve,reject)=>{
            fetch(`${mainurl}${url}`,{
                method:"POST",
                body: data,
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then(response => response.json())
            .then((data)=>{
                resolve(data);
            })
            .catch(error=> reject(error))
        })
    },
    putContent: async function (url: string, data:any): Promise<any>{
        const token = await getAccessToken()
        return new Promise((resolve,reject)=>{
            fetch(`${mainurl}${url}`,{
                method:"PUT",
                body: data,
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then(response => response.json())
            .then((data)=>{
                resolve(data);
            })
            .catch(error=> reject(error))
        })
    },

}

export default apiService;