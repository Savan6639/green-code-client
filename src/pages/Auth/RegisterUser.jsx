import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LogoWithName } from "../../assets/images";
import { registerUser } from "../../services/api";

const userSchema = yup.object({
	username: yup.string().required("Username is required"),
	email: yup.string().required("Email is required").email("Email is invalid"),
	password: yup
		.string()
		.required("Password is required")
		.min(8, "Password must be at least 8 characters"),
	confirmPassword: yup
		.string()
		.required("Confirm Password is required")
		.oneOf([yup.ref("password"), null], "Passwords must match"),
});

function RegisterUser() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(userSchema) });
	const Navigate = useNavigate();
	const [errorMessages, setErrorMessages] = useState("");

	function onSubmit({ username, email, password }) {
		registerUser({ username, email, password })
			.then(() => {
				Navigate("/login");
			})
			.catch((data) => {
				if (data.code === "duplicate_key_value")
					setErrorMessages("Username or Email already exists");
			});
	}

	return (
		<div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 border rounded-xl px-5 py-3 max-w-[370px] w-[90vw] gc-shadow-9">
			<div className="flex justify-center pb-2 pt-6">
				<img
					src={LogoWithName}
					width={200}
					alt="logo of gree-bank"></img>
			</div>
			<h3 className="text-center font-bold gc-text-black text-xl pb-2">
				Sign In
			</h3>
			<p className="text-center text-sm text-red-500">{errorMessages}</p>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col">
				<label className="text-sm text-gray-500">Username</label>
				<input
					type="text"
					placeholder="Username"
					{...register("username")}
					className="border rounded-lg p-1 mb-3"
				/>
				<p className="text-xs text-red-500">
					{errors.username?.message}
				</p>
				<label className="text-sm text-gray-500">Email</label>
				<input
					type="text"
					placeholder="Email"
					{...register("email")}
					className="border rounded-lg p-1 mb-3"
				/>
				<p className="text-xs text-red-500">{errors.email?.message}</p>
				<label className="text-sm text-gray-500">Password</label>
				<input
					type="text"
					placeholder="Password"
					{...register("password")}
					className="border rounded-lg p-1 mb-3"
				/>
				<p className="text-xs text-red-500">
					{errors.password?.message}
				</p>
				<label className="text-sm text-gray-500">
					Confirm Password
				</label>
				<input
					type="text"
					placeholder="Confirm Password"
					{...register("confirmPassword")}
					className="border rounded-lg p-1 mb-3"
				/>
				<p className="text-xs text-red-500">
					{errors.confirmPassword?.message}
				</p>
				<input
					type="submit"
					value="Sign In"
					className="gc-bg-green text-white rounded-lg p-1 mt-2 cursor-pointer"
				/>
			</form>
			<p className="text-center font-light text-sm mt-2">
				Already have an account ?{" "}
				<Link
					to={"/login"}
					className="gc-text-green font-bold">
					Log In
				</Link>
			</p>
		</div>
	);
}

export default RegisterUser;
