import { useEffect, useState } from "react";
import API from "../api";

type Link = { _id: string; title: string; url: string };

const Dashboard = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [form, setForm] = useState({ title: "", url: "" });

  const fetchLinks = async () => {
    const res = await API.get("/links/mine");
    setLinks(res.data);
  };

  const addLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.url) return;
    await API.post("/links", form);
    setForm({ title: "", url: "" });
    fetchLinks();
  };

  const deleteLink = async (id: string) => {
    await API.delete(`/links/${id}`);
    fetchLinks();
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Linklerin</h1>

      {/* Ekleme Formu */}
      <form onSubmit={addLink} className="space-y-2 mb-6">
        <input
          type="text"
          placeholder="Başlık"
          className="w-full px-4 py-2 border rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="url"
          placeholder="https://..."
          className="w-full px-4 py-2 border rounded"
          value={form.url}
          onChange={(e) => setForm({ ...form, url: e.target.value })}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Ekle
        </button>
      </form>

      {/* Link Listesi */}
      <div className="space-y-3">
        {links.length === 0 && (
          <p className="text-center text-gray-500">Henüz link yok.</p>
        )}
        {links.map((link) => (
          <div
            key={link._id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{link.title}</p>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 text-sm"
              >
                {link.url}
              </a>
            </div>
            <button
              onClick={() => deleteLink(link._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Sil
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
