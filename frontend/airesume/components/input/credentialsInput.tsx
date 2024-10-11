
interface CredentialsInputProps {
    type: string;
    name: string;
    id: string;
    placeholder:string;
    onChange: (e:any)=>void;
}
const CredentialsInput:React.FC<CredentialsInputProps>=({type,name,id, placeholder,onChange})=>{
    return(
        <input onChange={onChange} placeholder={placeholder} type={type} name={name} id={id} className="border-secondary placeholder:text-gray-700 bg-primary text-white font-semibold rounded-xl border-2 p-2 w-fit"/>
    
    )
}

export default CredentialsInput