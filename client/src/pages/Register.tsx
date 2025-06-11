import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await API.post("/auth/register", form);
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Kayıt başarısız.");
    }
  };

  return (
    <div>
      <h2>Kayıt Ol</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Kullanıcı adı" onChange={handleChange} required />
        <input name="email" placeholder="E-posta" type="email" onChange={handleChange} required />
        <input name="password" placeholder="Şifre" type="password" onChange={handleChange} required />
        <button type="submit">Kayıt Ol</button>
      </form>
    </div>
  );
};

export default Register;
