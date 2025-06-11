import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <div className="flex gap-4 text-blue-600 font-semibold">
        <Link to="/">OneLink</Link>
        {user && <Link to="/dashboard">Dashboard</Link>}
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-gray-700">Kullanıcı: {user.username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Çıkış
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-blue-500">Giriş</Link>
            <Link to="/register" className="text-blue-500">Kayıt</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
