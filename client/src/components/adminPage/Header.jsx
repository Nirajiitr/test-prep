import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { logout } from "../../store/auth-slice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    toast.success("Logout successful");
  };

  return (
    <header className="bg-gray-800 text-white px-6 py-4 rounded-lg shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
