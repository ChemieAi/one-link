import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../api";

type Link = {
  _id: string;
  title: string;
  url: string;
};

const Dashboard = () => {
  const { user } = useAuth();
  const [links, setLinks] = useState<Link[]>([]);
  const [form, setForm] = useState({ title: "", url: "" });
  const [error, setError] = useState("");

  // Linkleri getir
  const fetchLinks = async () => {
    try {
      const res = await API.get("/links");
      setLinks(res.data);
    } catch {
      setError("Linkler alınamadı.");
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  // Link ekle
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post("/links", form);
      setForm({ title: "", url: "" });
      fetchLinks(); // Listeyi güncelle
    } catch {
      setError("Link eklenemedi.");
    }
  };

  // Link sil
  const handleDelete = async (id: string) => {
    try {
      await API.delete(`/links/${id}`);
      setLinks(links.filter((l) => l._id !== id));
    } catch {
      setError("Link silinemedi.");
    }
  };

  return (
    <div>
      <h2>{user?.username} - Link Yönetimi</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          name="title"
          placeholder="Başlık"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          name="url"
          placeholder="URL"
          value={form.url}
          onChange={(e) => setForm({ ...form, url: e.target.value })}
          required
        />
        <button type="submit">Ekle</button>
      </form>

      <ul>
        {links.map((link) => (
          <li key={link._id}>
            <a href={link.url} target="_blank" rel="noreferrer">
              {link.title}
            </a>{" "}
            <button onClick={() => handleDelete(link._id)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
