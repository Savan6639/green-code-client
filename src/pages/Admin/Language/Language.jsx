import React from "react";
import { IoAdd } from "react-icons/io5";
import { useGetLanguages } from "../../../hooks/data";
import { yupResolver } from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import { addLanguage,deleteLanguage,updateLanguage } from "../../../services/api";
import { MdDelete } from "react-icons/md";

const schema = yup.object().shape({
    name: yup.string().required("Category is required")
})

function Language(){
    const [languages,setLanguages] = useGetLanguages();
    const [isEdit, setIsEdit] = React.useState(false);

    const {register,handleSubmit,watch,setValue,formState:{errors}} = useForm({resolver: yupResolver(schema),defaultValues:{name:''}});
    const watchInput = watch('name');
    const watchId = watch('id');


    function onSubmit(data){
        if(isEdit){
            updateLanguage(data.id,{name:data.name}).then(()=>{
                setLanguages(languages.map(lan=>lan._id===data.id?{...lan,name:data.name}:lan));
                setValue('name','');
                setIsEdit(false);
            })
        }else{
            addLanguage(data).then(res=>{
                console.log(res);
                setLanguages([...languages,res]);
                setValue('name','');
            })
        }
    }

    function onDelete(){
        deleteLanguage(watchId).then(()=>{
            setLanguages(languages.filter(lan=>lan._id!==watchId));
            setValue('name','');
            setIsEdit(false);
        })
    }

    function LanguageList(){
        return languages.filter(ctg=>ctg.name.toLowerCase().includes(watchInput.toLowerCase())).map((lan, index)=>{
            return <div key={index} onDoubleClick={()=>{setIsEdit(true);setValue('name',lan.name);setValue('id',lan._id)}} className="w-full text-lg text-center hover:bg-gray-200">{lan.name}</div>   
        })
    }

    return (
        <div className="h-full flex flex-col">
            <div className="w-1/4 mx-auto mt-2">
                <div className="flex items-center w-full justify-between px-3">
                    <p className="w-full text-center text-lg">Language</p>
                    <IoAdd className="text-3xl hover:scale-110" onClick={()=>{setValue('name','');setIsEdit(false)}} />
                </div>
                <form autoComplete="off"  className="w-full flex items-center" onSubmit={handleSubmit(onSubmit)}>
                    {isEdit && <MdDelete className="text-4xl text-red-500 me-2 hover:scale-110" onClick={onDelete} />}
                    <input className="gc-border-green w-full text-xl px-1" type="text" {...register('name')} placeholder="Category" />
                    <button className="gc-bg-green text-white rounded-lg py-1 px-2 ms-2">{isEdit?'Save':'Add'}</button>    
                </form>
                <p className="text-red-500 text-sm text-center">{errors.name?.message}</p>
                <div>
                    <LanguageList />
                </div>
            </div>
        </div>
    );
}

export default Language;