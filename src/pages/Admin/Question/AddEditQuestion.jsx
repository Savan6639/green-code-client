import SelectMenu from "../../../lib/Select";
import { useGetCategories } from "../../../hooks/data";
import {useForm,Controller} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { addQuestion } from "../../../services/api";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    body: yup.string().required('Question is required'),
    level: yup.object().required('Level is required'),
    categories: yup.array().min(1).required('Categories is required'),
});

function AddEditQuestion({edit}){

    const Navigate = useNavigate();
    const [categories] = useGetCategories();
    const {register,control,handleSubmit,formState:{errors}} = useForm({resolver: yupResolver(schema)});

    function onSubmit(data){
        data.level = data.level.value;
        data.categories = data.categories.map(v=>v.id);
        addQuestion(data).then(()=>{
            Navigate('/admin/question');
        })
    }

    return (
        <div className="h-full flex flex-col">
            <h1>{edit?'Edit Question':'Add Question'}</h1>
            <form className="w-1/2 mx-auto p-2" onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full flex items-center mb-2">
                    <label className="me-1">Title</label>
                    <input className="w-full p-1 gc-border-green" {...register('title')} type="text" placeholder="title" />
                </div>
                <p className="text-xs text-red-500">{errors.title?.message}</p>
                <div>
                    <label>Question</label>
                    <textarea className="w-full p-1 gc-border-green" {...register('body')} rows={7} placeholder="Question"></textarea>
                </div>
                <p className="text-xs text-red-500">{errors.body?.message}</p>
                <div className="flex">
                    <Controller
                        name="level"
                        control={control}
                        render={({ field:{ref:innerRef,...rest}}) => <SelectMenu className="min-w-[130px] me-2" placeholder="Level" {...rest} innerRef={innerRef} isClearable isGreen options={[{ value: 'easy', label: 'Easy' },{ value: 'medium', label: 'Medium' },{ value: 'hard', label: 'Hard' }]} />}
                    />
                    <Controller
                        name="categories"
                        control={control}
                        render={({ field:{ref:innerRef,...rest}}) => <SelectMenu className="min-w-[130px] max-w-[400px]" {...rest} innerRef={innerRef} placeholder="Categories" isMulti isClearable isGreen options={categories.map(v=>({value : v.name,label:v.name,id:v._id}))} />}
                    />
                    
                </div>
                <div className="flex">
                    <p className="text-xs text-red-500">{errors.level?.message}</p>
                    <p className="text-xs text-red-500">{errors.categories?.message}</p>
                </div>
                <button className="gc-bg-green mt-2 rounded-lg w-full py-1 hover:scale-y-105 text-white">Add</button>
            </form>
        </div>
    );
}

AddEditQuestion.propTypes = {
    edit: PropTypes.bool
};

export default AddEditQuestion;