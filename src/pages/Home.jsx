import { useNavigate } from "react-router-dom";

const FEATURES = [
  { icon: "📋", title: "Smart Complaint Filing", desc: "AI automatically categorizes your complaint and routes it to the correct department instantly.", color: "#eff6ff", border: "#bfdbfe", link: "/submit" },
  { icon: "📍", title: "Live Issue Map", desc: "View all active water complaints pinned on an interactive map across your city.", color: "#f0fdf4", border: "#bbf7d0", link: "/dashboard" },
  { icon: "🔔", title: "Real-time Alerts", desc: "Get instant notifications about water disruptions, contamination or supply changes in your area.", color: "#fff7ed", border: "#fed7aa", link: "/dashboard" },
  { icon: "📊", title: "Area Dashboard", desc: "Monitor area-wise water supply schedules, complaint trends and resolution statistics.", color: "#fdf4ff", border: "#e9d5ff", link: "/dashboard" },
  { icon: "🧪", title: "Water Quality Reports", desc: "Access latest lab test results and water quality data uploaded by officials.", color: "#f0fdfa", border: "#99f6e4", link: "/water-quality" },
  { icon: "🤖", title: "AI Chatbot Support", desc: "Multilingual voice and text chatbot available 24/7 to help you file and track complaints.", color: "#fefce8", border: "#fde68a", link: "/submit" },
];

const STATS = [
  { number: "12,400+", label: "Complaints Resolved" },
  { number: "98", label: "Areas Covered" },
  { number: "48 hrs", label: "Avg Resolution Time" },
  { number: "6", label: "Departments Connected" },
];

const STEPS = [
  { step: "01", title: "Register Securely", desc: "Sign up with Aadhaar OTP verification to prevent fake complaints and ensure accountability." },
  { step: "02", title: "Report Your Issue", desc: "Submit a complaint with location, type and description. AI tags and routes it automatically." },
  { step: "03", title: "Track in Real Time", desc: "Follow every stage — Registered, Assigned, Field Visit, and Resolved — with full transparency." },
  { step: "04", title: "Get Notified", desc: "Receive SMS and push notifications when your complaint is updated or resolved." },
];

const FOOTER_LINKS = [
  { label: "Home", path: "/" },
  { label: "Report Issue", path: "/submit" },
  { label: "Track Complaint", path: "/track" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "Water Quality", path: "/water-quality" },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", color: "#1e293b", margin: 0 }}>

      {/* ===== HERO ===== */}
      <div style={{
        background: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0ea5e9 100%)",
        padding: "100px 24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{ position: "absolute", top: 20, left: "10%", width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
        <div style={{ position: "absolute", bottom: -40, right: "5%", width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div style={{ maxWidth: 720, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "inline-block", background: "rgba(255,255,255,0.15)", borderRadius: 20, padding: "6px 16px", marginBottom: 20 }}>
            <span style={{ color: "#bae6fd", fontSize: 13, fontWeight: 500 }}>
              Supporting UN Sustainable Development Goal 6
            </span>
          </div>
          <h1 style={{ fontSize: 52, fontWeight: 800, color: "#fff", margin: "0 0 20px", lineHeight: 1.15 }}>
            Clean Water for Every<br />
            <span style={{ color: "#7dd3fc" }}>Citizen</span>
          </h1>
          <p style={{ fontSize: 18, color: "#bae6fd", lineHeight: 1.7, maxWidth: 560, margin: "0 auto 40px" }}>
            Report water issues, track complaints in real time, and hold authorities
            accountable — all through one transparent platform.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => navigate("/submit")}
              style={{ padding: "15px 36px", background: "#fff", color: "#0369a1", border: "none", borderRadius: 8, fontSize: 16, fontWeight: 700, cursor: "pointer" }}>
              Report an Issue
            </button>
            <button
              onClick={() => navigate("/track")}
              style={{ padding: "15px 36px", background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.6)", borderRadius: 8, fontSize: 16, fontWeight: 600, cursor: "pointer" }}>
              Track Complaint
            </button>
          </div>
        </div>
      </div>

      {/* ===== STATS ===== */}
      <div style={{ background: "#0369a1", padding: "28px 24px" }}>
        <div style={{
          maxWidth: 900, margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 16, textAlign: "center"
        }}>
          {STATS.map(s => (
            <div key={s.label}>
              <div style={{ fontSize: 30, fontWeight: 800, color: "#fff" }}>{s.number}</div>
              <div style={{ fontSize: 13, color: "#7dd3fc", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== FEATURES ===== */}
      <div style={{ padding: "80px 24px", background: "#f8fafc" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ color: "#0ea5e9", fontWeight: 600, fontSize: 14, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>
              Platform Features
            </p>
            <h2 style={{ fontSize: 36, fontWeight: 800, margin: "0 0 12px" }}>
              Built for citizens.<br />Designed for transparency.
            </h2>
            <p style={{ color: "#64748b", fontSize: 16, maxWidth: 500, margin: "0 auto" }}>
              Every feature is designed to bridge the gap between citizens and water authorities.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {FEATURES.map(f => (
              <div
                key={f.title}
                onClick={() => navigate(f.link)}
                style={{
                  background: f.color,
                  border: `1px solid ${f.border}`,
                  borderRadius: 12,
                  padding: "28px 24px",
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 14 }}>{f.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
                <p style={{ fontSize: 13, color: "#0ea5e9", fontWeight: 600, marginTop: 12, marginBottom: 0 }}>
                  Explore →
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== HOW IT WORKS ===== */}
      <div style={{ padding: "80px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ color: "#0ea5e9", fontWeight: 600, fontSize: 14, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>
              Simple Process
            </p>
            <h2 style={{ fontSize: 36, fontWeight: 800, margin: 0 }}>
              How AquaConnect works
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40 }}>
            {STEPS.map((item) => (
              <div key={item.step}>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#0ea5e9", marginBottom: 12, letterSpacing: 2 }}>
                  STEP {item.step}
                </div>
                <div style={{ width: 48, height: 4, background: "#0ea5e9", borderRadius: 2, marginBottom: 16 }} />
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== JAL JEEVAN MISSION ===== */}
      <div style={{ background: "#f0f9ff", borderTop: "1px solid #bae6fd", borderBottom: "1px solid #bae6fd", padding: "48px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
          <div style={{
            flex: "0 0 auto", width: 64, height: 64,
            background: "#0ea5e9", borderRadius: 16,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30
          }}>
            🏛️
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ color: "#0369a1", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>
              Government of India Initiative
            </p>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: "#0c4a6e", marginBottom: 8 }}>
              Jal Jeevan Mission
            </h3>
            <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.7, margin: 0 }}>
              AquaConnect is aligned with the Jal Jeevan Mission — empowering citizens
              to actively monitor, report and improve water supply infrastructure across
              India. Together we work towards universal access to safe drinking water.
            </p>
          </div>
        </div>
      </div>

      {/* ===== CTA ===== */}
      <div style={{
        padding: "80px 24px",
        background: "linear-gradient(135deg, #0c4a6e, #0369a1)",
        textAlign: "center"
      }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: 34, fontWeight: 800, color: "#fff", marginBottom: 14 }}>
            Facing a water issue right now?
          </h2>
          <p style={{ color: "#bae6fd", marginBottom: 36, fontSize: 16, lineHeight: 1.7 }}>
            Report it in under 2 minutes. Our AI system automatically tags and routes
            your complaint to the right department — no follow-ups needed.
          </p>
          <button
            onClick={() => navigate("/submit")}
            style={{ padding: "16px 48px", background: "#fff", color: "#0369a1", border: "none", borderRadius: 8, fontSize: 18, fontWeight: 700, cursor: "pointer" }}>
            Report Now — It's Free
          </button>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <div style={{ background: "#020617", color: "#475569", padding: "48px 24px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 40, marginBottom: 40
          }}>

            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 20 }}>💧</span>
                <span style={{ color: "#fff", fontWeight: 700, fontSize: 18 }}>AquaConnect</span>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.7, margin: "0 0 12px", maxWidth: 220 }}>
                Clean Water and Sanitation Portal. Empowering citizens through technology and transparency.
              </p>
              <span style={{ display: "inline-block", background: "#0ea5e9", color: "#fff", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>
                SDG-6 Aligned
              </span>
            </div>

            {/* Quick Links */}
            <div>
              <p style={{ color: "#94a3b8", fontWeight: 600, fontSize: 12, marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>
                Quick Links
              </p>
              {FOOTER_LINKS.map(link => (
                <p
                  key={link.label}
                  onClick={() => navigate(link.path)}
                  style={{ fontSize: 13, marginBottom: 10, cursor: "pointer", color: "#64748b", margin: "0 0 10px" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#7dd3fc"}
                  onMouseLeave={e => e.currentTarget.style.color = "#64748b"}
                >
                  {link.label}
                </p>
              ))}
            </div>

            {/* Contact */}
            <div>
              <p style={{ color: "#94a3b8", fontWeight: 600, fontSize: 12, marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>
                Contact
              </p>
              <p style={{ fontSize: 13, marginBottom: 10, color: "#64748b" }}>📍 Hyderabad, Telangana</p>
              <p style={{ fontSize: 13, marginBottom: 10, color: "#64748b" }}>✉️ support@aquaconnect.in</p>
              <p style={{ fontSize: 13, marginBottom: 10, color: "#64748b" }}>📞 1800-XXX-XXXX (Toll Free)</p>
            </div>

            {/* Helpline */}
            <div>
              <p style={{ color: "#94a3b8", fontWeight: 600, fontSize: 12, marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>
                Emergency
              </p>
              <div style={{ background: "#0f172a", borderRadius: 10, padding: 16 }}>
                <p style={{ color: "#f87171", fontWeight: 700, fontSize: 13, marginBottom: 6 }}>
                  Water Emergency Helpline
                </p>
                <p style={{ color: "#fff", fontSize: 20, fontWeight: 800, marginBottom: 4 }}>
                  1916
                </p>
                <p style={{ color: "#64748b", fontSize: 12, margin: 0 }}>
                  Available 24/7 for water emergencies
                </p>
              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: "1px solid #1e293b", paddingTop: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <p style={{ fontSize: 12, margin: 0 }}>© 2025 AquaConnect. All rights reserved.</p>
            <p style={{ fontSize: 12, margin: 0, color: "#334155" }}>
              Developed under the guidance of DR. Sneha G · Team No. 11
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}