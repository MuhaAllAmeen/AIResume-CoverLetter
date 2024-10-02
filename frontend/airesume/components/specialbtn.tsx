import NextSVG from "./nextsvg";

interface SpecialBtnProps{
    content: string;
    type?: "submit" | "button" | undefined;
    id: string;
    link:string;
    onClick: ()=>void
}
const SpecialBtn:React.FC<SpecialBtnProps> = ({content, type, id, link,onClick})=>{
    return (
        <>
            {/* <a href={link}> */}
                <button onClick={onClick} type={type} id={id} className="flex items-center bg-slate-400 hover:bg-black hover:text-white transition-colors border-2 border-black  rounded-xl p-1 px-7 group">
                {content}
                <NextSVG  className="group-hover:fill-white"/>
                </button>
                
                
            {/* </a> */}
            
        </>
    )
}

export default SpecialBtn