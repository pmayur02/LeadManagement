import {useState} from "react";
import { useNavigate,Link } from "react-router-dom";
import {getUser} from "../../utils/auth"
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const user = getUser()
  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

 return (
    <nav className="bg-white shadow-md">

      <div className="px-4 sm:px-6 py-4 flex items-center justify-between">

  
        <h2 className="text-2xl font-bold text-gray-800">
          LeadManagement
        </h2>

       
        <div className="hidden md:flex items-center gap-4">

          <Link
            to="/dashboard"
            className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
          >
            Dashboard
          </Link>

          <Link
            to="/leads"
            className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
          >
            Leads
          </Link>

          {
            user.role === "admin" && (
              <Link
                to="/users"
                className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
              >
                Users
              </Link>
            )
          }

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>

        </div>

       
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {
            isOpen ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )
          }
        </button>

      </div>

    
      {
        isOpen && (
          <div className="md:hidden px-4 pb-4 flex flex-col gap-2 bg-white shadow-sm">

            <Link
              to="/dashboard"
              className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>

            <Link
              to="/leads"
              className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              Leads
            </Link>

            {
              user.role === "admin" && (
                <Link
                  to="/users"
                  className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Users
                </Link>
              )
            }

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
              Logout
            </button>

          </div>
        )
      }

    </nav>
  );
};

export default Navbar;