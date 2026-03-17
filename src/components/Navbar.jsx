import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={{
      background: "#0c4a6e",
      padding: "0 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 60,
      position: "sticky",
      top: 0,
      zIndex: 999,
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
    }}>

      {/* Logo */}
      <div
        onClick={() => navigate("/")}
        style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
        <span style={{ fontSize: 22 }}>💧</span>
        <span style={{ color: "#fff", fontWeight: 700, fontSize: 18 }}>AquaConnect</span>
      </div>

      {/* Nav Links */}
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        {[
          { label: "Home", path: "/" },
          { label: "Dashboard", path: "/dashboard" },
          { label: "Water Quality", path: "/water-quality" },
          { label: "Report Issue", path: "/submit" },
          { label: "Track", path: "/track" },
        ].map(link => (
          <button
            key={link.path}
            onClick={() => navigate(link.path)}
            style={{
              background: "transparent",
              color: "#e0f2fe",
              border: "none",
              padding: "6px 12px",
              borderRadius: 6,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 500,
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            {link.label}
          </button>
        ))}

        {/* Auth buttons */}
        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 8 }}>
            <span style={{ color: "#7dd3fc", fontSize: 13 }}>Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              style={{ background: "#ef4444", color: "#fff", border: "none", padding: "6px 14px", borderRadius: 6, cursor: "pointer", fontSize: 13 }}>
              Logout
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", gap: 8, marginLeft: 8 }}>
            <button
              onClick={() => navigate("/login")}
              style={{ background: "transparent", color: "#e0f2fe", border: "1px solid #7dd3fc", padding: "6px 14px", borderRadius: 6, cursor: "pointer", fontSize: 13 }}>
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              style={{ background: "#0ea5e9", color: "#fff", border: "none", padding: "6px 14px", borderRadius: 6, cursor: "pointer", fontSize: 13 }}>
              Register
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}