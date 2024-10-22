'use server';

import { cookies } from "next/headers";

export async function handleRefresh(){
    const refreshToken = await getRefreshToken()
    console.log(refreshToken)
    const token = await fetch('https://c4f6425c-7a99-428f-bd6c-0bde7a29e859-dev.e1-us-east-azure.choreoapis.dev/ai-resumecoverletter-gene/backend/v1.0/api/auth/token/refresh/',{
        method: 'POST',
        body: JSON.stringify({
            refresh: refreshToken
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
    .then((json)=>{
        console.log('refresh: ',json)
        if (json.access){
            cookies().set('session_access_token',json.access,{
                httpOnly: true,
                // secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60,
                path:'/'
            })
            return json.access
        }else{
            resetAuthCookies()
        }
    })
    .catch((error)=> {
        console.log('error',error)
        resetAuthCookies()
    })
    return token
}

export async function handleLogin(userId: string, accessToken:string, refreshToken:string , userName: string){
    cookies().set('session_userid',userId,{
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        path:'/'
    })
    cookies().set('session_username',userName,{
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        path:'/'
    })
    cookies().set('session_access_token',accessToken,{
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60,
        path:'/'
    })
    cookies().set('session_refresh_token',refreshToken,{
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7 ,
        path:'/'
    })
}

export async function resetAuthCookies(){
    cookies().set('session_userid', '')
    cookies().set('session_username', '')
    cookies().set('session_access_token', '')
    cookies().set('session_refresh_token', '')

}

export async function getUserId(){
    const userId = cookies().get('session_userid')?.value
    return userId ? userId : null
}

export async function getUserName(){
    const userName = cookies().get('session_username')?.value
    return userName ? userName : null

}

export async function getAccessToken(){
    let accessToken = cookies().get('session_access_token')?.value
    if (!accessToken){
        accessToken = await handleRefresh()
    }
    return accessToken
}

export async function getRefreshToken(){
    let refreshToken = cookies().get('session_refresh_token')?.value
    return refreshToken
}