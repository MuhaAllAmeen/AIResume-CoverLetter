
interface CredentialsInputProps {
    type: string;
    name: string;
    id: string;
    placeholder:string;
    onChange: (e:any)=>void;
}
const CredentialsInput:React.FC<CredentialsInputProps>=({type,name,id, placeholder,onChange})=>{
    return(
        <input onChange={onChange} placeholder={placeholder} type={type} name={name} id={id} className="border-slate-950 rounded-xl border-2 p-2 w-fit"/>
    
    )
}

export default CredentialsInput