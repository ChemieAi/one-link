import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2>Hoş geldin, {user?.username}!</h2>
      <p>Burada linklerini yöneteceksin 🔗</p>
    </div>
  );
};

export default Dashboard;
