import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { getAllUsers, } from "../../services/userService";
import type { User } from "../../types/userTypes";

const Users = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // Fetch Users
  const fetchUsers = async () => {
    try {

      setLoading(true);

      const response = await getAllUsers();

      setUsers(response.data);

    } catch (error: any) {

      setError(
        error.response?.data?.message || "Failed to fetch users"
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
<DashboardLayout>

  <div className="max-w-7xl mx-auto">

   
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
        Users Management
      </h1>

    </div>

  
    {
      loading && (
        <div className="bg-blue-100 text-blue-700 px-4 py-3 rounded-lg mb-4">
          Loading users...
        </div>
      )
    }

  
    {
      error && (
        <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )
    }


    {
      !loading && users.length === 0 && (
        <div className="bg-gray-100 text-gray-600 px-4 py-3 rounded-lg">
          No users found
        </div>
      )
    }

   
    {
      !loading && users.length > 0 && (

        <div className="overflow-x-auto bg-white rounded-2xl shadow-md">

          <table className="min-w-full text-sm">

          
            <thead className="bg-gray-100 text-gray-700">

              <tr>
                <th className="p-4 text-left font-semibold">Name</th>
                <th className="p-4 text-left font-semibold">Email</th>
                <th className="p-4 text-left font-semibold">Role</th>
                <th className="p-4 text-left font-semibold">Status</th>
              </tr>

            </thead>

          
            <tbody>

              {
                users.map((user) => (

                  <tr
                    key={user._id}
                    className="border-t hover:bg-gray-50 transition"
                  >

                  
                    <td className="p-4 whitespace-nowrap font-medium text-gray-800">
                      {user.name}
                    </td>

                   
                    <td className="p-4 text-gray-600">
                      {user.email}
                    </td>

                
                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded-full text-white text-xs sm:text-sm font-medium ${
                          user.role === "admin"
                            ? "bg-purple-500"
                            : "bg-blue-500"
                        }`}
                      >
                        {user.role}
                      </span>

                    </td>

                    
                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                          user.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {user.status}
                      </span>

                    </td>

                  </tr>

                ))
              }

            </tbody>

          </table>

        </div>

      )
    }

  </div>

</DashboardLayout>
  );
};

export default Users;