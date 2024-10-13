
import NavBar from "@/components/navbar";
import { getUserId, getUserName } from "./services/token";
import CreateBtn from "@/components/input/createBtn";

export default function Home() {
  
  return (
    <div>
      <div className=" bg-white h-full flex">
        <div className="max-h-screen max-w-[700px]">
          <img className=" w-full h-full object-cover block" src="https://images.pexels.com/photos/5971258/pexels-photo-5971258.jpeg?cs=srgb&dl=pexels-cottonbro-5971258.jpg&fm=jpg" alt="Picture" />
        </div>
        <div className="flex flex-col w-full">
          <div className="bg-[#cab099] w-full">
              <NavBar />
          </div>
          <h1 className="text-6xl text-[#58745b] font-bold mt-10 text-center">AI <br /> Resume / Cover Letter Generator</h1>
          <div className="flex self-center items-center gap-10 h-full">
            <CreateBtn content="Cover Letter" />
            <CreateBtn content="Resume" />
          </div>
          <div className="self-end absolute bottom-0 right-0">
            <img width={"200px"} className="object-cover block" src="https://cdn.vectorstock.com/i/preview-1x/69/13/woman-typing-email-on-laptop-computer-icon-vector-48646913.jpg" alt="" />
          </div>
          
        </div>
      </div>
    </div>
  );
}
