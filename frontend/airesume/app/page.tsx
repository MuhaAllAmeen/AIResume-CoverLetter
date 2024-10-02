
import NavBar from "@/components/navbar";
import { getUserId, getUserName } from "./services/token";
import CreateBtn from "@/components/input/createBtn";

export default function Home() {
  
  return (
    <div>
      <NavBar />
      <h1 className="text-3xl font-bold mt-10 text-center">AI Resume Builder</h1>
      <div className="mt-44 flex justify-center ">
        <CreateBtn />
      </div>
    </div>
  );
}
