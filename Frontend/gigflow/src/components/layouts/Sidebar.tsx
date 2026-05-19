import { Link } from "react-router-dom";
import {getUser} from "../../utils/auth"

const Sidebar = () => {
    const user = getUser()
  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-5">

      <h1 className="text-2xl font-bold mb-10">
        LeadManagement
      </h1>

      <nav className="flex flex-col gap-4">

        <Link
          to="/dashboard"
          className="hover:bg-gray-700 p-2 rounded"
        >
          Dashboard
        </Link>

        <Link
          to="/leads"
          className="hover:bg-gray-700 p-2 rounded"
        >
          Leads
        </Link>

        {
            user.role ==="admin" &&  (<Link to="/users"className="hover:bg-gray-700 p-2 rounded">Users</Link>)
        }
        


      </nav>
    </div>
  );
};

export default Sidebar;