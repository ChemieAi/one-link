import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";

type Link = { _id: string; title: string; url: string };

const Profile = () => {
  const { username } = useParams();
  const [links, setLinks] = useState<Link[]>([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get(`/links/public/${username}`);
        setLinks(res.data.links);
      } catch {
        setNotFound(true);
      }
    };
    fetch();
  }, [username]);

  if (notFound)
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-red-500 text-xl font-semibold">Kullanıcı bulunamadı.</h2>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white flex flex-col items-center p-6">
      <div className="max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">@{username}</h1>

        <div className="space-y-4">
          {links.map((link) => (
            <a
              key={link._id}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
            >
              {link.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
