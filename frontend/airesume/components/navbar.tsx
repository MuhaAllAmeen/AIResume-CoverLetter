import { getUserName, resetAuthCookies } from "@/app/services/token"
import LogOutBtn from "./LogOutBtn"

const NavBar = async () =>{
    const userName = await getUserName()
    
    return(
        <>
        <nav className=" pb-7 pt-3 pr-5">
        <div className="flex gap-5 justify-end items-center">
          {userName && (
            <>
             <a href="" className="text-blue-800 font-bold text-xl">{userName}</a>
            <LogOutBtn />
            </>
          )
          }
          {!userName && (
              <>
              <a href="/login" className="text-blue-800 font-bold text-xl">Login</a>
              <a href="/register" className="text-blue-800 text-xl">Register</a>
              </>
            )
          }
          
        </div>
      </nav>
        </>
    )
}

export default NavBar