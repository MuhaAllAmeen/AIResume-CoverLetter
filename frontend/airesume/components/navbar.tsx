import { getUserId, getUserName, resetAuthCookies } from "@/app/services/token"
import LogOutBtn from "./LogOutBtn"
import Link from "next/link"
import { ProfileSVG } from "@/assets/svgs"

const NavBar = async () =>{
    const userName = await getUserName()
    const userId = await getUserId()
    return(
        <>
        <nav className=" pb-7 pt-3 pr-5">
        <div className="flex gap-5 justify-end items-center">
          {userName && (
            <>
              <div className="flex items-center gap-1">
                <ProfileSVG/>
                <Link href={`/profile/${userId}`} className="text-[#58745b]  font-bold text-xl">{userName}</Link>
              </div>
              <LogOutBtn />
            </>
          )
          }
          {!userName && (
              <>
              <a href="/login" className="text-[#58745b] font-bold text-xl">Login</a>
              <a href="/register" className="text-[#58745b] text-xl">Register</a>
              </>
            )
          }
          
        </div>
      </nav>
        </>
    )
}

export default NavBar