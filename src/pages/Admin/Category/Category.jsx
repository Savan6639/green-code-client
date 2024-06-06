import React from "react";
import { IoAdd } from "react-icons/io5";
import { useGetCategories } from "../../../hooks/data";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm} from "react-hook-form";
import * as yup from "yup";
import { addCategory,deleteCategory,updateCategory } from "../../../services/api";
import { MdDelete } from "react-icons/md";

const schema = yup.object().shape({
    name: yup.string().required("Category is required")
})

function Category(){
    const [categories,setCategories] = useGetCategories();
    const [isEdit, setIsEdit] = React.useState(false);

    const {register,handleSubmit,watch,setValue,formState:{errors}} = useForm({resolver: yupResolver(schema),defaultValues:{name:''}});
    const watchInput = watch('name');
    const watchId = watch('id');


    function onSubmit(data){
        if(isEdit){
            updateCategory(data.id,{name:data.name}).then(()=>{
                setCategories(categories.map(ctg=>ctg._id===data.id?{...ctg,name:data.name}:ctg));
                setValue('name','');
                setIsEdit(false);
            })
        }else{
            addCategory(data).then(res=>{
                console.log(res);
                setCategories([...categories,res]);
                setValue('name','');
            })
        }
    }

    function onDelete(){
        deleteCategory(watchId).then(()=>{
            setCategories(categories.filter(ctg=>ctg._id!==watchId));
            setValue('name','');
            setIsEdit(false);
        })
    }

    function CategoriesList(){
        return categories.filter(ctg=>ctg.name.toLowerCase().includes(watchInput.toLowerCase())).map((ctg, index)=>{
            return <div key={index} onDoubleClick={()=>{setIsEdit(true);setValue('name',ctg.name);setValue('id',ctg._id)}} className="w-full text-lg text-center hover:bg-gray-200">{ctg.name}</div>   
        })
    }

    return (
        <div className="h-full flex flex-col">
            <div className="w-1/4 mx-auto mt-2">
                <div className="flex items-center w-full justify-between px-3">
                    <p className="w-full text-center text-lg">Categories</p>
                    <IoAdd className="text-3xl hover:scale-110" onClick={()=>{setValue('name','');setIsEdit(false)}} />
                </div>
                <form autoComplete="off"  className="w-full flex items-center" onSubmit={handleSubmit(onSubmit)}>
                    {isEdit && <MdDelete className="text-4xl text-red-500 me-2 hover:scale-110" onClick={onDelete} />}
                    <input className="gc-border-green w-full text-xl px-1" type="text" {...register('name')} placeholder="Category" />
                    <button className="gc-bg-green text-white rounded-lg py-1 px-2 ms-2">{isEdit?'Save':'Add'}</button>    
                </form>
                <p className="text-red-500 text-sm text-center">{errors.name?.message}</p>
                <div>
                    <CategoriesList />
                </div>
            </div>
        </div>
    );
}

export default Category;