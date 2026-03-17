import { useState } from "react";
import { useNavigate } from "react-router-dom";

const QUALITY_DATA = [
  {
    area: "Kukatpally",
    ph: 7.2,
    turbidity: 1.2,
    chlorine: 0.4,
    tds: 320,
    status: "Safe",
    lastTested: "15 Mar 2026",
    testedBy: "HMWSSB Lab",
  },
  {
    area: "Madhapur",
    ph: 7.8,
    turbidity: 2.1,
    chlorine: 0.3,
    tds: 410,
    status: "Safe",
    lastTested: "14 Mar 2026",
    testedBy: "HMWSSB Lab",
  },
  {
    area: "Ameerpet",
    ph: 6.8,
    turbidity: 4.5,
    chlorine: 0.1,
    tds: 580,
    status: "Moderate",
    lastTested: "13 Mar 2026",
    testedBy: "HMWSSB Lab",
  },
  {
    area: "KPHB",
    ph: 8.1,
    turbidity: 1.8,
    chlorine: 0.5,
    tds: 290,
    status: "Safe",
    lastTested: "15 Mar 2026",
    testedBy: "HMWSSB Lab",
  },
  {
    area: "Gachibowli",
    ph: 6.4,
    turbidity: 6.2,
    chlorine: 0.05,
    tds: 720,
    status: "Unsafe",
    lastTested: "12 Mar 2026",
    testedBy: "HMWSSB Lab",
  },
  {
    area: "Hitech City",
    ph: 7.4,
    turbidity: 1.5,
    chlorine: 0.4,
    tds: 350,
    status: "Safe",
    lastTested: "15 Mar 2026",
    testedBy: "HMWSSB Lab",
  },
  {
    area: "Banjara Hills",
    ph: 7.0,
    turbidity: 2.8,
    chlorine: 0.2,
    tds: 490,
    status: "Moderate",
    lastTested: "14 Mar 2026",
    testedBy: "HMWSSB Lab",
  },
];

const PARAMETERS = [
  { key: "ph", label: "pH Level", unit: "", safe: "6.5 – 8.5", icon: "🧪" },
  { key: "turbidity", label: "Turbidity", unit: "NTU", safe: "< 4 NTU", icon: "💧" },
  { key: "chlorine", label: "Chlorine", unit: "mg/L", safe: "0.2 – 0.5", icon: "⚗️" },
  { key: "tds", label: "TDS", unit: "mg/L", safe: "< 500 mg/L", icon: "🔬" },
];

const STATUS_STYLE = {
  Safe: { bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0", dot: "#22c55e" },
  Moderate: { bg: "#fff7ed", color: "#ea580c", border: "#fed7aa", dot: "#f59e0b" },
  Unsafe: { bg: "#fef2f2", color: "#dc2626", border: "#fecaca", dot: "#ef4444" },
};

const TIPS = [
  { season: "Summer", tip: "Boil water for at least 1 minute before drinking during peak summer months.", icon: "☀️" },
  { season: "Monsoon", tip: "Avoid using groundwater sources during heavy rains due to contamination risk.", icon: "🌧️" },
  { season: "General", tip: "Clean your overhead water tank every 6 months to prevent bacterial growth.", icon: "🏠" },
  { season: "General", tip: "Report any colour, odour or taste changes in your tap water immediately.", icon: "🚰" },
];

function getParamStatus(key, value) {
  if (key === "ph") return value >= 6.5 && value <= 8.5 ? "Safe" : "Unsafe";
  if (key === "turbidity") return value < 4 ? "Safe" : value < 6 ? "Moderate" : "Unsafe";
  if (key === "chlorine") return value >= 0.2 && value <= 0.5 ? "Safe" : "Moderate";
  if (key === "tds") return value < 500 ? "Safe" : value < 600 ? "Moderate" : "Unsafe";
  return "Safe";
}

export default function WaterQuality() {
  const navigate = useNavigate();
  const [selectedArea, setSelectedArea] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");

  const filtered = filterStatus === "All"
    ? QUALITY_DATA
    : QUALITY_DATA.filter(d => d.status === filterStatus);

  const safeCnt = QUALITY_DATA.filter(d => d.status === "Safe").length;
  const moderateCnt = QUALITY_DATA.filter(d => d.status === "Moderate").length;
  const unsafeCnt = QUALITY_DATA.filter(d => d.status === "Unsafe").length;

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#f8fafc", minHeight: "100vh", padding: "32px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 4px" }}>Water Quality Reports</h1>
            <p style={{ color: "#64748b", margin: 0, fontSize: 14 }}>
              Latest lab test results for all areas in Hyderabad
            </p>
          </div>
          <button
            onClick={() => navigate("/submit")}
            style={{ padding: "10px 24px", background: "#0ea5e9", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            Report Quality Issue
          </button>
        </div>

        {/* Summary Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 32 }}>
          {[
            { label: "Total Areas Tested", value: QUALITY_DATA.length, color: "#0ea5e9", bg: "#eff6ff" },
            { label: "Safe Areas", value: safeCnt, color: "#16a34a", bg: "#f0fdf4" },
            { label: "Moderate Risk", value: moderateCnt, color: "#ea580c", bg: "#fff7ed" },
            { label: "Unsafe Areas", value: unsafeCnt, color: "#dc2626", bg: "#fef2f2" },
          ].map(card => (
            <div key={card.label} style={{
              background: card.bg,
              border: `1px solid ${card.color}22`,
              borderRadius: 12,
              padding: "20px 24px"
            }}>
              <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 8px" }}>{card.label}</p>
              <p style={{ fontSize: 32, fontWeight: 800, color: card.color, margin: 0 }}>{card.value}</p>
            </div>
          ))}
        </div>

        {/* Safe Drinking Water Standards */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0", marginBottom: 32 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Safe Drinking Water Standards</h3>
          <p style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>
            BIS IS:10500 standards for drinking water in India
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
            {PARAMETERS.map(p => (
              <div key={p.key} style={{ background: "#f8fafc", borderRadius: 10, padding: 16, border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{p.icon}</div>
                <p style={{ fontSize: 13, fontWeight: 700, margin: "0 0 4px" }}>{p.label}</p>
                <p style={{ fontSize: 12, color: "#64748b", margin: "0 0 4px" }}>Unit: {p.unit || "—"}</p>
                <p style={{ fontSize: 12, color: "#0ea5e9", fontWeight: 600, margin: 0 }}>Safe: {p.safe}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Filter */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
          {["All", "Safe", "Moderate", "Unsafe"].map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              style={{
                padding: "7px 18px",
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                border: "1px solid",
                background: filterStatus === s ? "#0ea5e9" : "#fff",
                color: filterStatus === s ? "#fff" : "#64748b",
                borderColor: filterStatus === s ? "#0ea5e9" : "#e2e8f0",
              }}>
              {s}
            </button>
          ))}
        </div>

        {/* Area Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginBottom: 32 }}>
          {filtered.map(d => {
            const st = STATUS_STYLE[d.status];
            const isSelected = selectedArea?.area === d.area;
            return (
              <div
                key={d.area}
                onClick={() => setSelectedArea(isSelected ? null : d)}
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  padding: 20,
                  border: isSelected ? `2px solid #0ea5e9` : "1px solid #e2e8f0",
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.08)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Card Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>{d.area}</h3>
                  <span style={{
                    background: st.bg,
                    color: st.color,
                    border: `1px solid ${st.border}`,
                    fontSize: 12,
                    fontWeight: 700,
                    padding: "3px 12px",
                    borderRadius: 20,
                    display: "flex",
                    alignItems: "center",
                    gap: 5
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: st.dot, display: "inline-block" }} />
                    {d.status}
                  </span>
                </div>

                {/* Parameters */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                  {PARAMETERS.map(p => {
                    const pStatus = getParamStatus(p.key, d[p.key]);
                    const pStyle = STATUS_STYLE[pStatus];
                    return (
                      <div key={p.key} style={{ background: "#f8fafc", borderRadius: 8, padding: "10px 12px" }}>
                        <p style={{ fontSize: 11, color: "#94a3b8", margin: "0 0 3px", textTransform: "uppercase", letterSpacing: 0.5 }}>{p.label}</p>
                        <p style={{ fontSize: 16, fontWeight: 700, margin: "0 0 2px", color: pStyle.color }}>
                          {d[p.key]} <span style={{ fontSize: 11, fontWeight: 400 }}>{p.unit}</span>
                        </p>
                        <p style={{ fontSize: 10, color: pStyle.color, fontWeight: 600, margin: 0 }}>{pStatus}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: 12, display: "flex", justifyContent: "space-between" }}>
                  <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>Tested: {d.lastTested}</p>
                  <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>{d.testedBy}</p>
                </div>

                {/* Expanded Detail */}
                {isSelected && (
                  <div style={{ marginTop: 16, background: "#f0f9ff", borderRadius: 8, padding: 14, border: "1px solid #bae6fd" }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#0369a1", marginBottom: 8 }}>
                      Detailed Analysis for {d.area}
                    </p>
                    {PARAMETERS.map(p => {
                      const pStatus = getParamStatus(p.key, d[p.key]);
                      return (
                        <div key={p.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                          <span style={{ fontSize: 13, color: "#475569" }}>{p.icon} {p.label}</span>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 13, fontWeight: 700 }}>{d[p.key]} {p.unit}</span>
                            <span style={{
                              fontSize: 11,
                              fontWeight: 700,
                              padding: "2px 8px",
                              borderRadius: 10,
                              background: STATUS_STYLE[pStatus].bg,
                              color: STATUS_STYLE[pStatus].color
                            }}>
                              {pStatus}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                    <p style={{ fontSize: 12, color: "#64748b", marginTop: 8, marginBottom: 0 }}>
                      Safe range: pH 6.5-8.5 · Turbidity &lt;4 NTU · Chlorine 0.2-0.5 mg/L · TDS &lt;500 mg/L
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Water Conservation Tips */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0", marginBottom: 32 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Water Safety Tips</h3>
          <p style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>
            Seasonal guidance to keep your family safe
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
            {TIPS.map((tip, i) => (
              <div key={i} style={{ background: "#f8fafc", borderRadius: 10, padding: 16, border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 20 }}>{tip.icon}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#0ea5e9", textTransform: "uppercase", letterSpacing: 0.5 }}>{tip.season}</span>
                </div>
                <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.6, margin: 0 }}>{tip.tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 12, padding: 20 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span style={{ fontSize: 20 }}>⚠️</span>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#92400e", marginBottom: 4 }}>Disclaimer</p>
              <p style={{ fontSize: 13, color: "#78350f", lineHeight: 1.6, margin: 0 }}>
                Water quality data is based on periodic lab tests conducted by HMWSSB. Results may vary between test dates.
                For real-time contamination alerts, enable notifications. If you notice any change in water quality,
                please report it immediately using the Report Issue button.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}