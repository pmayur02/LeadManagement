import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../api/axios";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role:"admin"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {
        debugger
      setLoading(true);

      await axiosInstance.post("/users/register",formData);

      navigate("/");

    } catch (error: any) {

      setError(
        error.response?.data?.message ||
        "Registration failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
    <h1 className="text-6xl sm:text-3xl font-bold text-center mb-8">Leads Management System</h1>
  <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 sm:p-8">

   
    <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
      Register
    </h1>

  
    {
      error && (
        <div className="bg-red-100 text-red-600 text-sm p-3 rounded-lg mb-4">
          {error}
        </div>
      )
    }

    <form onSubmit={handleSubmit} className="space-y-4">

     
      <input
        type="text"
        name="name"
        placeholder="Enter name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border border-gray-300 p-3 rounded-lg text-sm sm:text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />

    
      <input
        type="email"
        name="email"
        placeholder="Enter email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border border-gray-300 p-3 rounded-lg text-sm sm:text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />

    
      <input
        type="password"
        name="password"
        placeholder="Enter password"
        value={formData.password}
        onChange={handleChange}
        className="w-full border border-gray-300 p-3 rounded-lg text-sm sm:text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />

    
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="w-full border border-gray-300 p-3 rounded-lg text-sm sm:text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      >
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>

   
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 transition text-white p-3 rounded-lg font-medium text-sm sm:text-base disabled:bg-blue-400"
      >
        {loading ? "Registering..." : "Register"}
      </button>

    </form>

  
    <p className="mt-5 text-center text-sm sm:text-base text-gray-600">

      Already have an account?

      <Link
        to="/"
        className="text-blue-600 ml-1 hover:underline font-medium"
      >
        Login
      </Link>

    </p>

  </div>

</div>
  );
};

export default Register;