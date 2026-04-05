import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { complaintAPI } from "../services/Api";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const STAGES = ["Registered", "Assigned", "Field Visit", "Resolved"];

const STAGE_STYLE = {
  Registered:    { color: "#94a3b8", bg: "#f8fafc", border: "#e2e8f0" },
  Assigned:      { color: "#f59e0b", bg: "#fff7ed", border: "#fed7aa" },
  "Field Visit": { color: "#3b82f6", bg: "#eff6ff", border: "#bfdbfe" },
  Resolved:      { color: "#22c55e", bg: "#f0fdf4", border: "#bbf7d0" },
};

const TYPE_COLORS = {
  Shortage:       "#ef4444",
  Leakage:        "#3b82f6",
  Contamination:  "#f59e0b",
  "Low Pressure": "#8b5cf6",
  Other:          "#64748b",
};

const AREA_COORDS = {
  Kukatpally:      [17.4947, 78.3996],
  Madhapur:        [17.4474, 78.3762],
  Ameerpet:        [17.4374, 78.4487],
  KPHB:            [17.4968, 78.3893],
  Gachibowli:      [17.4401, 78.3489],
  "Hitech City":   [17.4504, 78.3808],
  "Banjara Hills": [17.4138, 78.4480],
};

export default function TrackComplaint() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("track");
  const [allComplaints, setAllComplaints] = useState([]);
  const [mapLoading, setMapLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setNotFound(false);
    setResult(null);
    try {
      const res = await complaintAPI.getById(query.trim());
      const complaint = res.data.complaint;
      const coords = AREA_COORDS[complaint.area] || [17.3850, 78.4867];
      setResult({ ...complaint, coords });
      setNotFound(false);
    } catch (err) {
      setResult(null);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const loadMapComplaints = async () => {
    if (allComplaints.length > 0) return;
    setMapLoading(true);
    try {
      const res = await complaintAPI.getAll();
      const withCoords = res.data.complaints.map(c => ({
        ...c,
        coords: AREA_COORDS[c.area] || [17.3850, 78.4867],
      }));
      setAllComplaints(withCoords);
    } catch (err) {
      console.error("Failed to load complaints for map");
    } finally {
      setMapLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "map") loadMapComplaints();
  };

  const currentStage = result ? STAGES.indexOf(result.status) : -1;

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#f8fafc", minHeight: "100vh", padding: "32px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 4px" }}>Complaint Tracker</h1>
            <p style={{ color: "#64748b", margin: 0, fontSize: 14 }}>
              Track your complaint status or view all issues on the map
            </p>
          </div>
          <button
            onClick={() => navigate("/submit")}
            style={{ padding: "10px 24px", background: "#0ea5e9", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            + Report Issue
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 24, background: "#f1f5f9", borderRadius: 10, padding: 4, width: "fit-content" }}>
          {[
            { key: "track", label: "Track Complaint" },
            { key: "map", label: "Live Issue Map" },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              style={{
                padding: "8px 20px",
                borderRadius: 8,
                border: "none",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                background: activeTab === tab.key ? "#fff" : "transparent",
                color: activeTab === tab.key ? "#0ea5e9" : "#64748b",
                boxShadow: activeTab === tab.key ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
              }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ===== TRACK TAB ===== */}
        {activeTab === "track" && (
          <div>

            {/* Search Box */}
            <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0", marginBottom: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Enter Complaint ID</h3>
              <p style={{ fontSize: 13, color: "#64748b", marginBottom: 16 }}>
                Enter the complaint ID you received after submitting
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSearch()}
                  placeholder="Enter complaint ID e.g. 1"
                  style={{ flex: 1, padding: "10px 14px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 14, outline: "none" }}
                />
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  style={{ padding: "10px 24px", background: loading ? "#7dd3fc" : "#0ea5e9", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer" }}>
                  {loading ? "Searching..." : "Search"}
                </button>
              </div>
              {notFound && (
                <div style={{ marginTop: 12, background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: 12 }}>
                  <p style={{ color: "#dc2626", fontSize: 13, margin: 0 }}>
                    No complaint found with ID #{query}. Please check and try again.
                  </p>
                </div>
              )}
            </div>

            {/* Result */}
            {result && (
              <div>

                {/* Complaint Info */}
                <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0", marginBottom: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
                    <div>
                      <p style={{ fontSize: 12, color: "#94a3b8", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: 0.5 }}>Complaint ID</p>
                      <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0, color: "#0ea5e9" }}>#{result.id}</h2>
                    </div>
                    <span style={{
                      background: STAGE_STYLE[result.status]?.bg,
                      color: STAGE_STYLE[result.status]?.color,
                      border: `1px solid ${STAGE_STYLE[result.status]?.border}`,
                      fontSize: 13, fontWeight: 700,
                      padding: "6px 16px", borderRadius: 20
                    }}>
                      {result.status}
                    </span>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginBottom: 20 }}>
                    {[
                      { label: "Type", value: result.type },
                      { label: "Area", value: result.area },
                      { label: "Filed on", value: new Date(result.created_at).toLocaleDateString("en-IN") },
                      { label: "Priority", value: result.type === "Contamination" ? "High" : "Normal" },
                    ].map(item => (
                      <div key={item.label} style={{ background: "#f8fafc", borderRadius: 8, padding: 12 }}>
                        <p style={{ fontSize: 11, color: "#94a3b8", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: 0.5 }}>{item.label}</p>
                        <p style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>{item.value}</p>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: "#f8fafc", borderRadius: 8, padding: 14, marginBottom: 20 }}>
                    <p style={{ fontSize: 11, color: "#94a3b8", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: 0.5 }}>Description</p>
                    <p style={{ fontSize: 14, color: "#374151", margin: 0, lineHeight: 1.6 }}>{result.description}</p>
                  </div>

                  {/* Progress Stages */}
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Complaint Progress</h3>
                  <div style={{ display: "flex", gap: 0 }}>
                    {STAGES.map((stage, i) => {
                      const done = i <= currentStage;
                      const active = i === currentStage;
                      const st = STAGE_STYLE[stage];
                      return (
                        <div key={stage} style={{ flex: 1, position: "relative" }}>
                          {i < STAGES.length - 1 && (
                            <div style={{
                              position: "absolute",
                              top: 16, left: "50%", width: "100%",
                              height: 3,
                              background: i < currentStage ? "#0ea5e9" : "#e2e8f0",
                              zIndex: 0
                            }} />
                          )}
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 1 }}>
                            <div style={{
                              width: 32, height: 32, borderRadius: "50%",
                              background: done ? (active ? st.color : "#0ea5e9") : "#e2e8f0",
                              color: done ? "#fff" : "#94a3b8",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: 13, fontWeight: 700,
                              border: active ? `3px solid ${st.color}` : "none",
                              boxShadow: active ? `0 0 0 4px ${st.bg}` : "none"
                            }}>
                              {i < currentStage ? "✓" : i + 1}
                            </div>
                            <p style={{ fontSize: 11, fontWeight: 600, marginTop: 8, color: done ? st.color : "#94a3b8", textAlign: "center" }}>
                              {stage}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Mini Map */}
                <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0" }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Complaint Location</h3>
                  <p style={{ fontSize: 13, color: "#64748b", marginBottom: 16 }}>{result.area}, Hyderabad</p>
                  <div style={{ borderRadius: 10, overflow: "hidden", height: 260 }}>
                    <MapContainer
                      center={result.coords}
                      zoom={14}
                      style={{ height: "100%", width: "100%" }}
                      scrollWheelZoom={false}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; OpenStreetMap contributors'
                      />
                      <Marker position={result.coords}>
                        <Popup>
                          <strong>#{result.id} — {result.type}</strong><br />
                          {result.area}<br />
                          Status: {result.status}
                        </Popup>
                      </Marker>
                      <Circle
                        center={result.coords}
                        radius={400}
                        color={TYPE_COLORS[result.type] || "#0ea5e9"}
                        fillOpacity={0.15}
                      />
                    </MapContainer>
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

        {/* ===== MAP TAB ===== */}
        {activeTab === "map" && (
          <div>

            {/* Legend */}
            <div style={{ background: "#fff", borderRadius: 12, padding: 16, border: "1px solid #e2e8f0", marginBottom: 16, display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#374151" }}>Complaint Type:</span>
              {Object.entries(TYPE_COLORS).map(([type, color]) => (
                <div key={type} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: color }} />
                  <span style={{ fontSize: 12, color: "#64748b" }}>{type}</span>
                </div>
              ))}
            </div>

            {/* Full Map */}
            <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
              {mapLoading ? (
                <div style={{ height: 520, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <p style={{ color: "#64748b", fontSize: 14 }}>Loading map data...</p>
                </div>
              ) : (
                <div style={{ height: 520 }}>
                  <MapContainer
                    center={[17.4474, 78.3762]}
                    zoom={12}
                    style={{ height: "100%", width: "100%" }}
                    scrollWheelZoom={true}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; OpenStreetMap contributors'
                    />
                    {allComplaints.map(c => (
                      <div key={c.id}>
                        <Marker position={c.coords}>
                          <Popup>
                            <div style={{ minWidth: 160 }}>
                              <p style={{ fontWeight: 700, margin: "0 0 4px", fontSize: 14 }}>#{c.id} — {c.type}</p>
                              <p style={{ margin: "0 0 2px", fontSize: 12, color: "#64748b" }}>Area: {c.area}</p>
                              <p style={{ margin: "0 0 2px", fontSize: 12, color: "#64748b" }}>Date: {new Date(c.created_at).toLocaleDateString("en-IN")}</p>
                              <p style={{ margin: "0 0 6px", fontSize: 12, color: "#64748b" }}>{c.description}</p>
                              <span style={{
                                fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 10,
                                background: STAGE_STYLE[c.status]?.bg,
                                color: STAGE_STYLE[c.status]?.color,
                              }}>
                                {c.status}
                              </span>
                            </div>
                          </Popup>
                        </Marker>
                        <Circle
                          center={c.coords}
                          radius={300}
                          color={TYPE_COLORS[c.type] || "#0ea5e9"}
                          fillOpacity={0.2}
                        />
                      </div>
                    ))}
                  </MapContainer>
                </div>
              )}
            </div>

            {/* Complaints List */}
            {allComplaints.length > 0 && (
              <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0", marginTop: 20 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>
                  All Complaints ({allComplaints.length})
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
                  {allComplaints.map(c => {
                    const st = STAGE_STYLE[c.status];
                    return (
                      <div
                        key={c.id}
                        onClick={() => {
                          setQuery(String(c.id));
                          setActiveTab("track");
                          setTimeout(() => handleSearch(), 100);
                        }}
                        style={{ background: "#f8fafc", borderRadius: 10, padding: 14, border: "1px solid #e2e8f0", cursor: "pointer" }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = "#0ea5e9"}
                        onMouseLeave={e => e.currentTarget.style.borderColor = "#e2e8f0"}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                          <span style={{ fontSize: 13, fontWeight: 700, color: "#0ea5e9" }}>#{c.id}</span>
                          <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 10, background: st?.bg, color: st?.color }}>
                            {c.status}
                          </span>
                        </div>
                        <p style={{ fontSize: 13, fontWeight: 600, margin: "0 0 2px" }}>{c.type}</p>
                        <p style={{ fontSize: 12, color: "#64748b", margin: 0 }}>
                          {c.area} · {new Date(c.created_at).toLocaleDateString("en-IN")}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Empty state */}
            {!mapLoading && allComplaints.length === 0 && (
              <div style={{ background: "#fff", borderRadius: 12, padding: 40, border: "1px solid #e2e8f0", marginTop: 20, textAlign: "center" }}>
                <p style={{ fontSize: 36, marginBottom: 12 }}>🗺️</p>
                <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>No complaints yet</p>
                <p style={{ fontSize: 14, color: "#64748b", marginBottom: 20 }}>Be the first to report a water issue in your area</p>
                <button
                  onClick={() => navigate("/submit")}
                  style={{ padding: "10px 24px", background: "#0ea5e9", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                  Report an Issue
                </button>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}