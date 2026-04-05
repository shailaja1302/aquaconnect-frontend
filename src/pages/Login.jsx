import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../services/api";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await authAPI.login({ phone, password });
      login(res.data.user, res.data.token);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid phone number or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", display: "flex" }}>

      {/* Left Panel */}
      <div style={{
        flex: 1,
        background: "linear-gradient(160deg, #0c4a6e 0%, #0369a1 50%, #0ea5e9 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 48,
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Background circles */}
        <div style={{ position: "absolute", top: -60, left: -60, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        <div style={{ position: "absolute", bottom: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div style={{ position: "absolute", top: "40%", right: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />

        {/* Content */}
        <div style={{ position: "relative", textAlign: "center", maxWidth: 400 }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>💧</div>
          <h1 style={{ fontSize: 42, fontWeight: 800, color: "#fff", margin: "0 0 12px", lineHeight: 1.2 }}>
            AquaConnect
          </h1>
          <p style={{ fontSize: 18, color: "#bae6fd", marginBottom: 40, lineHeight: 1.6 }}>
            Clean Water and Sanitation Portal for Citizens of Hyderabad
          </p>

          {/* Feature pills */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, textAlign: "left" }}>
            {[
              { icon: "📋", text: "Submit water complaints instantly" },
              { icon: "🔍", text: "Track complaint status in real time" },
              { icon: "🗺️", text: "View issues on live map" },
              { icon: "🧪", text: "Monitor water quality reports" },
              { icon: "🔔", text: "Get alerts about disruptions" },
            ].map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.1)", borderRadius: 10, padding: "10px 16px" }}>
                <span style={{ fontSize: 20 }}>{f.icon}</span>
                <span style={{ color: "#e0f2fe", fontSize: 14, fontWeight: 500 }}>{f.text}</span>
              </div>
            ))}
          </div>

          {/* SDG Badge */}
          <div style={{ marginTop: 32, display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.15)", borderRadius: 20, padding: "8px 16px" }}>
            <span style={{ color: "#bae6fd", fontSize: 12, fontWeight: 600 }}>Supporting UN SDG-6 · Jal Jeevan Mission</span>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div style={{
        width: 480,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 48,
        background: "#fff",
      }}>
        <div style={{ width: "100%", maxWidth: 380 }}>

          {/* Header */}
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: "#0c4a6e", margin: "0 0 8px" }}>
              Welcome back
            </h2>
            <p style={{ fontSize: 15, color: "#64748b", margin: 0 }}>
              Login to your AquaConnect account
            </p>
          </div>

          {/* Error */}
          {error && (
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "12px 16px", marginBottom: 20, display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ fontSize: 16 }}>⚠️</span>
              <p style={{ color: "#dc2626", fontSize: 13, margin: 0, lineHeight: 1.5 }}>{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Phone */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8, display: "block" }}>
                Mobile Number
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "#94a3b8" }}>📱</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="Enter your 10-digit mobile number"
                  required
                  maxLength={10}
                  style={{ width: "100%", padding: "12px 14px 12px 42px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: 14, outline: "none", boxSizing: "border-box", transition: "border 0.2s" }}
                  onFocus={e => e.target.style.borderColor = "#0ea5e9"}
                  onBlur={e => e.target.style.borderColor = "#e2e8f0"}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>Password</label>
              </div>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "#94a3b8" }}>🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  style={{ width: "100%", padding: "12px 44px 12px 42px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                  onFocus={e => e.target.style.borderColor = "#0ea5e9"}
                  onBlur={e => e.target.style.borderColor = "#e2e8f0"}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", cursor: "pointer", fontSize: 16, color: "#94a3b8" }}>
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "14px",
                background: loading ? "#7dd3fc" : "linear-gradient(135deg, #0369a1, #0ea5e9)",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                fontSize: 15,
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                marginTop: 4,
                letterSpacing: 0.5
              }}>
              {loading ? "Logging in..." : "Login to AquaConnect"}
            </button>

          </form>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
            <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
            <span style={{ fontSize: 13, color: "#94a3b8" }}>New to AquaConnect?</span>
            <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
          </div>

          {/* Register Button */}
          <button
            onClick={() => navigate("/register")}
            style={{ width: "100%", padding: "13px", background: "#fff", color: "#0369a1", border: "2px solid #0ea5e9", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
            Create a New Account
          </button>

          {/* Emergency */}
          <div style={{ marginTop: 24, background: "#fef2f2", borderRadius: 10, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 20 }}>🚨</span>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#dc2626", margin: "0 0 2px" }}>Water Emergency?</p>
              <p style={{ fontSize: 12, color: "#ef4444", margin: 0 }}>Call helpline: <strong>1916</strong> (Available 24/7)</p>
            </div>
          </div>

          {/* Footer note */}
          <p style={{ fontSize: 11, color: "#94a3b8", textAlign: "center", marginTop: 24, lineHeight: 1.6 }}>
            By logging in you agree to use this platform responsibly for genuine water complaints only.
          </p>

        </div>
      </div>

    </div>
  );
}