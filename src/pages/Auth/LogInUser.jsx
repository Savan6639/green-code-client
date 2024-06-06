import { useContext, useState } from "react";
import {useForm} from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LogoWithName } from "../../assets/images";

import { loginUser } from "../../services/api";
import {AuthContext} from "../../services/context/AuthContext";

const schema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required")
})

function LogInUser(){
    const Navigate = useNavigate();
    const params = useParams();
    const {LogInUser} = useContext(AuthContext);
    const {register, handleSubmit,formState: { errors }} = useForm({resolver: yupResolver(schema)});
    const [errorMessages, setErrorMessages] = useState('');
    console.log(params)

    function onSubmit(data){
        loginUser(data).then(()=>{
            LogInUser();
           
            if(params.prevstate == 'gotoprevstate'){
                Navigate(-1);
            }else{
                Navigate('/')
            }
        }).catch((data)=>{
            if(data.code === 'invalid_data')setErrorMessages('Invalid username or password')
        })
    }

    return(
        <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 border rounded-xl px-5 py-3 max-w-[350px] w-[90vw] gc-shadow-9">
                <div className="flex justify-center pb-2 pt-6">
						<img src={LogoWithName} width={200} alt="logo of gree-bank"></img>
				</div>
                <h3 className="text-center font-bold gc-text-black text-xl pb-2">Log In</h3>
            <p className="text-center text-sm text-red-500">{errorMessages}</p>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <label className="text-sm text-gray-500 ">Username or Email</label>
                <input type="text" placeholder="username or email" {...register('username')}
                className="border rounded-lg p-1 mb-3" />
                <p className="text-xs text-red-500">{errors.username?.message}</p>
                <label className="text-sm text-gray-500">Password</label>
                <input type="password" placeholder="Password" {...register('password')}
                className="border rounded-lg p-1 mb-3" />
                <p className="text-xs text-red-500">{errors.password?.message}</p>
                <input type="submit" value="Log In" className="gc-bg-green text-white rounded-lg p-1 mt-2 cursor-pointer" />
            </form>
            <p className="text-center font-light text-sm mt-2">Don&apos;t have an account ? <Link to="/register" className="gc-text-green font-bold">Register</Link></p>
        </div>
    )
}

export default LogInUser;