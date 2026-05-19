import { useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { createLead } from "../../services/leadService";

const Dashboard = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "new",
    source: "website"
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      await createLead(formData);

      setMessage("Lead created successfully 🚀");

      // clear form
      setFormData({
        name: "",
        email: "",
        status: "new",
        source: "website"
      });

    } catch (error: any) {
      setMessage(
        error.response?.data?.message || "Failed to create lead"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
<DashboardLayout>

  <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center py-10">

   
    <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
      Create Lead
    </h1>

   
    {
      message && (
        <div className="mb-4 bg-green-100 text-green-700 px-4 py-3 rounded-lg text-sm sm:text-base">
          {message}
        </div>
      )
    }

  
    <div className="bg-white rounded-2xl shadow-md p-5 sm:p-6 w-full max-w-lg">

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        
        <input
          type="text"
          name="name"
          placeholder="Lead Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg text-sm sm:text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

       
        <input
          type="email"
          name="email"
          placeholder="Lead Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg text-sm sm:text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

       
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg text-sm sm:text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        >
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="lost">Lost</option>
        </select>

        
        <select
          name="source"
          value={formData.source}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg text-sm sm:text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        >
          <option value="website">Website</option>
          <option value="instagram">Instagram</option>
          <option value="referral">Referral</option>
        </select>

   
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-medium text-sm sm:text-base disabled:bg-blue-400"
        >
          {loading ? "Creating..." : "Create Lead"}
        </button>

      </form>

    </div>

  </div>

</DashboardLayout>
  );
};

export default Dashboard;