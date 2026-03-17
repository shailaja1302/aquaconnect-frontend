import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import { mockComplaints, mockSupplyStatus, mockChartData } from "../data/mockData";

const COLORS = ["#0ea5e9", "#22c55e", "#f59e0b", "#ef4444"];

const STATUS_COLORS = {
  Normal: { bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0" },
  Disrupted: { bg: "#fef2f2", color: "#dc2626", border: "#fecaca" },
  Delayed: { bg: "#fff7ed", color: "#ea580c", border: "#fed7aa" },
};

const pieData = [
  { name: "Shortage", value: 40 },
  { name: "Leakage", value: 25 },
  { name: "Contamination", value: 20 },
  { name: "Low Pressure", value: 15 },
];

const resolutionData = [
  { area: "Kukatpally", resolved: 85 },
  { area: "Madhapur", resolved: 92 },
  { area: "Ameerpet", resolved: 78 },
  { area: "KPHB", resolved: 88 },
  { area: "Gachibowli", resolved: 95 },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeArea, setActiveArea] = useState("All");

  const areas = ["All", ...new Set(mockComplaints.map(c => c.area))];

  const filtered = activeArea === "All"
    ? mockComplaints
    : mockComplaints.filter(c => c.area === activeArea);

  const statusCount = {
    Registered: filtered.filter(c => c.status === "Registered").length,
    Assigned: filtered.filter(c => c.status === "Assigned").length,
    "Field Visit": filtered.filter(c => c.status === "Field Visit").length,
    Resolved: filtered.filter(c => c.status === "Resolved").length,
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#f8fafc", minHeight: "100vh", padding: "32px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 4px" }}>Dashboard</h1>
            <p style={{ color: "#64748b", margin: 0, fontSize: 14 }}>
              Live water complaint statistics and supply status
            </p>
          </div>
          <button
            onClick={() => navigate("/submit")}
            style={{ padding: "10px 24px", background: "#0ea5e9", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            + Report Issue
          </button>
        </div>

        {/* Stat Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
          {[
            { label: "Total Complaints", value: mockComplaints.length, color: "#0ea5e9", bg: "#eff6ff" },
            { label: "Registered", value: statusCount.Registered, color: "#94a3b8", bg: "#f8fafc" },
            { label: "In Progress", value: statusCount.Assigned + statusCount["Field Visit"], color: "#f59e0b", bg: "#fff7ed" },
            { label: "Resolved", value: statusCount.Resolved, color: "#22c55e", bg: "#f0fdf4" },
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

        {/* Charts Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32 }}>

          {/* Bar Chart */}
          <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Monthly Complaints</h3>
            <p style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>Last 6 months trend</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="complaints" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Complaint Types</h3>
            <p style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>Breakdown by category</p>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* Resolution Rate */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0", marginBottom: 32 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Resolution Rate by Area</h3>
          <p style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>
            Percentage of complaints resolved per area
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={resolutionData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} unit="%" />
              <YAxis type="category" dataKey="area" tick={{ fontSize: 12 }} width={80} />
              <Tooltip formatter={(v) => `${v}%`} />
              <Bar dataKey="resolved" fill="#22c55e" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Water Supply Status */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0", marginBottom: 32 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Area-wise Water Supply Status</h3>
          <p style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>Today's supply schedule</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
            {mockSupplyStatus.map(s => {
              const st = STATUS_COLORS[s.status] || STATUS_COLORS.Normal;
              return (
                <div key={s.area} style={{
                  background: st.bg,
                  border: `1px solid ${st.border}`,
                  borderRadius: 10,
                  padding: 16
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{s.area}</span>
                    <span style={{
                      background: st.border,
                      color: st.color,
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: 20
                    }}>
                      {s.status}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>
                    Supply time: {s.time}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Complaints Table */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 4px" }}>Recent Complaints</h3>
              <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>Filter by area</p>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {areas.map(area => (
                <button
                  key={area}
                  onClick={() => setActiveArea(area)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    border: "1px solid",
                    background: activeArea === area ? "#0ea5e9" : "#fff",
                    color: activeArea === area ? "#fff" : "#64748b",
                    borderColor: activeArea === area ? "#0ea5e9" : "#e2e8f0",
                  }}>
                  {area}
                </button>
              ))}
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                  {["ID", "Type", "Area", "Description", "Date", "Status"].map(h => (
                    <th key={h} style={{
                      textAlign: "left",
                      padding: "8px 12px",
                      fontSize: 12,
                      color: "#94a3b8",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: 0.5
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <tr key={c.id} style={{
                    borderBottom: "1px solid #f8fafc",
                    background: i % 2 === 0 ? "#fff" : "#fafafa"
                  }}>
                    <td style={{ padding: "10px 12px", color: "#94a3b8", fontSize: 12 }}>#{c.id}</td>
                    <td style={{ padding: "10px 12px", fontWeight: 600 }}>{c.type}</td>
                    <td style={{ padding: "10px 12px" }}>{c.area}</td>
                    <td style={{
                      padding: "10px 12px",
                      color: "#64748b",
                      maxWidth: 200,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                    }}>
                      {c.description}
                    </td>
                    <td style={{ padding: "10px 12px", color: "#64748b" }}>{c.date}</td>
                    <td style={{ padding: "10px 12px" }}>
                      <span style={{
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "3px 10px",
                        borderRadius: 20,
                        background:
                          c.status === "Resolved" ? "#f0fdf4" :
                          c.status === "Assigned" ? "#fff7ed" :
                          c.status === "Field Visit" ? "#eff6ff" : "#f8fafc",
                        color:
                          c.status === "Resolved" ? "#16a34a" :
                          c.status === "Assigned" ? "#ea580c" :
                          c.status === "Field Visit" ? "#2563eb" : "#94a3b8",
                      }}>
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}