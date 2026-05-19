import React, { useState } from 'react';
import { LoginUser } from "../../services/AuthService";
import { type LoginPayload } from "../../types/AuthTypes"
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {

    const [formData, setFormData] = useState<LoginPayload>({
        email: "",
        password: ""
    })

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            const response = await LoginUser(formData)
            if (!response?.data?.userData || response?.statusCode !== 200) {
                alert("login failed.")
                navigate("/")
                return;
            }

            localStorage.setItem("token", response?.data?.token);
            localStorage.setItem("user", JSON.stringify(response.data.userData));
            navigate("/dashboard")




        } catch (error: any) {
            console.error(error);

            alert(error.response?.data?.message || "Login Failed");
        }
    }


    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
            <h1 className="text-6xl sm:text-3xl font-bold text-center mb-8">Leads Management System</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 sm:p-8 rounded-xl shadow-md w-full max-w-md"
            >
                <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
                    Login
                </h1>

                
                <div className="mb-4">
                    <label className="block mb-2 font-medium text-sm sm:text-base">
                        Email
                    </label>

                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base outline-none focus:border-blue-500"
                    />
                </div>

                
                <div className="mb-6">
                    <label className="block mb-2 font-medium text-sm sm:text-base">
                        Password
                    </label>

                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base outline-none focus:border-blue-500"
                    />
                </div>

                
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg transition text-sm sm:text-base"
                >
                    Login
                </button>

                <p className="mt-4 text-center text-sm sm:text-base">
                    Don’t have an account?

                    <Link
                        to="/register"
                        className="text-blue-600 ml-1 hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Login