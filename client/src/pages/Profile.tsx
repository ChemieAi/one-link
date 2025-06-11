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
console.log("username parametresi:", username);

  if (notFound) return <h2>Kullanıcı bulunamadı</h2>;

  return (
    <div>
      <h2>@{username}</h2>
      <ul>
        {links.map((link) => (
          <li key={link._id}>
            <a href={link.url} target="_blank" rel="noreferrer">
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
