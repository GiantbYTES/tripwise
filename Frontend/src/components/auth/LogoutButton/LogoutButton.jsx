// src/components/auth/LogoutButton/LogoutButton.jsx
import { useAuth } from "../../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
export function LogoutButton() {
  const { logout } = useAuth(); 
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout();
    navigate("/", { replace: true });

    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <button className="btn btn-outline-primary" onClick={handleLogout}>
      Logout
    </button>
  );
}
