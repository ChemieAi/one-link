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
    <nav style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
      <Link to="/">Ana Sayfa</Link>
      {user ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <span>Kullanıcı: {user.username}</span>
          <button onClick={handleLogout}>Çıkış</button>
        </>
      ) : (
        <>
          <Link to="/login">Giriş</Link>
          <Link to="/register">Kayıt</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
