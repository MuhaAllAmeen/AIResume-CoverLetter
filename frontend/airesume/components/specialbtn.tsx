import NextSVG from "./nextsvg";

interface SpecialBtnProps{
    content: string;
    type?: "submit" | "button" | undefined;
    id: string;
    disabled?: boolean;
    onClick: () => void;
}
const SpecialBtn:React.FC<SpecialBtnProps> = ({content, type, id,onClick,disabled})=>{
    return (
        <>
                <button disabled={disabled || false} onClick={onClick} type={type} id={id} className="flex items-center bg-primary hover:bg-secondary hover:text-white transition-colors border-2 border-secondary  rounded-xl p-1 px-7 group">
                {content}
                <NextSVG  className="group-hover:fill-white"/>
                </button>            
        </>
    )
}

export default SpecialBtn