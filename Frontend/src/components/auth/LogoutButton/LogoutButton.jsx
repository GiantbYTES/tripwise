// src/components/auth/LogoutButton/LogoutButton.jsx
import { useAuth } from "../../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
export function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <button
      className="nav-link link-body-emphasis px-2"
      onClick={handleLogout}
      style={{ background: "none", border: "none", cursor: "pointer" }}
    >
      Log Out
    </button>
  );
}
