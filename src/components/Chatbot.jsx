import { useState } from "react";

const FAQS = [
  { keywords: ["submit", "file", "report", "complaint", "register complaint"], answer: "To submit a complaint, go to the 'Report Issue' page from the navbar. Fill in your complaint type, area, description and phone number. You will receive a unique tracking ID after submission." },
  { keywords: ["track", "status", "check", "complaint id", "tracking"], answer: "To track your complaint, go to the 'Track' page and enter your complaint ID. You can see the current status: Registered, Assigned, Field Visit, or Resolved." },
  { keywords: ["water quality", "ph", "turbidity", "tds", "chlorine", "safe", "unsafe", "quality"], answer: "You can check water quality reports on the 'Water Quality' page. It shows pH levels, turbidity, chlorine and TDS values for each area in Hyderabad. Safe pH range is 6.5 to 8.5." },
  { keywords: ["supply", "timing", "schedule", "when", "water coming", "time"], answer: "Water supply timings vary by area. Visit the Dashboard page to see today's supply schedule for your area including status (Normal, Delayed, or Disrupted)." },
  { keywords: ["shortage", "no water", "water not coming", "no supply"], answer: "If you are facing a water shortage, please submit a complaint immediately on the Report Issue page. Select Shortage as the complaint type. Our team will respond within 48 hours." },
  { keywords: ["leakage", "pipe", "burst", "leak"], answer: "For pipe leakage or burst pipes, submit a complaint with type Leakage on the Report Issue page. This is treated as high priority and field officers are dispatched quickly." },
  { keywords: ["contamination", "dirty", "smell", "color", "brown", "black water", "polluted"], answer: "If your water appears dirty, has a bad smell or unusual color, submit a Contamination complaint immediately. Avoid using the water for drinking. This is treated as an emergency." },
  { keywords: ["low pressure", "pressure", "weak flow", "slow water"], answer: "Low water pressure can be reported as a Low Pressure complaint on the Report Issue page. Our team will investigate the pipeline issue in your area." },
  { keywords: ["register", "account", "sign up", "create account", "new user"], answer: "To register, click Register in the navbar. Fill in your name, phone number, area and create a password. You will need to verify your Aadhaar number with an OTP. Use 1234 as OTP for testing." },
  { keywords: ["login", "sign in", "password", "forgot"], answer: "To login, click Login in the navbar and enter your registered phone number and password." },
  { keywords: ["aadhaar", "otp", "verify", "verification", "identity"], answer: "Aadhaar verification is required to prevent fake complaints. Enter your 12-digit Aadhaar number and click Send OTP. Use OTP 1234 for testing purposes." },
  { keywords: ["emergency", "urgent", "helpline", "number", "call"], answer: "For water emergencies call the helpline: 1916. This is available 24/7. You can also submit an emergency complaint on our platform." },
  { keywords: ["jal jeevan", "government", "scheme", "mission"], answer: "AquaConnect is aligned with the Jal Jeevan Mission by the Government of India which aims to provide safe drinking water to every household." },
  { keywords: ["sdg", "sustainable", "development", "goal"], answer: "AquaConnect supports UN Sustainable Development Goal 6 (SDG-6) which aims to ensure availability and sustainable management of clean water and sanitation for all." },
  { keywords: ["map", "location", "where", "pin"], answer: "You can see all active complaints on the Live Issue Map on the Track page. Click the Live Issue Map tab to see complaints pinned on an interactive map of Hyderabad." },
  { keywords: ["dashboard", "statistics", "data", "chart", "graph"], answer: "The Dashboard page shows complaint statistics including monthly trends, complaint types breakdown, resolution rates by area, and water supply status for all areas." },
  { keywords: ["hello", "hi", "hey", "namaste", "good morning", "good evening"], answer: "Hello! I am AquaConnect support assistant. I can help you with submitting complaints, tracking issues, water quality, shortage predictions and more. What do you need help with?" },
  { keywords: ["thank", "thanks", "thank you", "ok thanks"], answer: "You are welcome! If you have any more questions about water issues or our platform, feel free to ask." },
  { keywords: ["help", "what can you do", "support", "features"], answer: "I can help you with:\n• Submitting water complaints\n• Tracking complaint status\n• Water quality information\n• Shortage predictions\n• High risk areas\n• Supply schedules\n• Emergency helpline\n\nJust ask me anything!" },
  { keywords: ["what is aquaconnect", "about", "platform", "website"], answer: "AquaConnect is a Clean Water and Sanitation Portal built for citizens of Hyderabad. It allows you to report water issues, track complaints, view water quality reports, and get alerts about water disruptions. It supports SDG-6 and Jal Jeevan Mission." },
  { keywords: ["boiling", "drink", "safe to drink", "drinking water"], answer: "Always boil water for at least 1 minute before drinking if you are unsure about quality. If water appears discolored or has an odor, avoid drinking it and report contamination immediately." },
  { keywords: ["tanker", "water tanker", "tanker request"], answer: "In case of severe shortage, you can request a water tanker through HMWSSB. Call 1916 or submit a Shortage complaint on AquaConnect mentioning tanker requirement in the description." },
  { keywords: ["rain", "monsoon", "rainy season"], answer: "During monsoon season, avoid using groundwater sources as they may be contaminated by rainwater runoff. Report any quality issues immediately." },
  { keywords: ["summer", "hot", "heat"], answer: "During summer months, water demand increases significantly. Store water during supply hours. Report any shortage immediately so authorities can arrange alternate supply." },
  { keywords: ["bore", "borewell", "groundwater"], answer: "Borewell and groundwater usage should be monitored for quality. High TDS levels above 500 mg/L indicate the water may not be safe for drinking. Get your borewell water tested." },
];

const AREA_RISK_DATA = [
  { area: "Gachibowli", risk: "High", shortage_days: 142, complaints_5yr: 1240, main_issue: "Industrial demand + rapid urbanization", prediction: "Critical shortage likely in summer 2026" },
  { area: "Ameerpet", risk: "High", shortage_days: 118, complaints_5yr: 980, main_issue: "Old pipeline infrastructure", prediction: "Frequent disruptions expected in Apr-Jun 2026" },
  { area: "Banjara Hills", risk: "Moderate", shortage_days: 87, complaints_5yr: 720, main_issue: "High elevation, pressure issues", prediction: "Moderate shortage risk in summer months" },
  { area: "KPHB", risk: "Moderate", shortage_days: 76, complaints_5yr: 650, main_issue: "Population growth outpacing supply", prediction: "Supply delays likely to increase in 2026" },
  { area: "Kukatpally", risk: "Low", shortage_days: 45, complaints_5yr: 420, main_issue: "Seasonal demand spikes", prediction: "Supply stable with minor disruptions expected" },
  { area: "Madhapur", risk: "Low", shortage_days: 38, complaints_5yr: 380, main_issue: "IT corridor high demand", prediction: "Supply improving with new pipeline projects" },
  { area: "Hitech City", risk: "Low", shortage_days: 32, complaints_5yr: 290, main_issue: "Commercial area high usage", prediction: "Supply stable, quality monitoring recommended" },
];

const SHORTAGE_PREDICTION = {
  current_month: "March",
  risk_level: "Moderate",
  prediction: "Based on 5-year historical data, Hyderabad typically experiences 35% increase in water complaints during April-June summer months. Areas like Gachibowli and Ameerpet are at highest risk.",
  recommendations: [
    "Store water during supply hours",
    "Fix any leakages in your building immediately",
    "Report shortages early so authorities can plan alternate supply",
    "Avoid wastage — summer supply is 20% lower than winter",
  ]
};

const QUICK_QUESTIONS = [
  "How to submit a complaint?",
  "Shortage prediction",
  "High risk areas",
  "Water quality info",
  "Emergency helpline",
];

function getBotResponse(userMessage) {
  const msg = userMessage.toLowerCase();

  if (msg.includes("predict") || msg.includes("prediction") || msg.includes("forecast") || msg.includes("future") || msg.includes("will there be shortage") || msg.includes("shortage prediction")) {
    return `SHORTAGE_PREDICTION`;
  }

  if (msg.includes("high risk") || msg.includes("worst area") || msg.includes("most shortage") || msg.includes("least water") || msg.includes("risk area") || msg.includes("affected area") || msg.includes("which area")) {
    return `RISK_AREAS`;
  }

  if (msg.includes("gachibowli") || msg.includes("ameerpet") || msg.includes("kphb") || msg.includes("kukatpally") || msg.includes("madhapur") || msg.includes("hitech") || msg.includes("banjara")) {
    const area = AREA_RISK_DATA.find(a => msg.includes(a.area.toLowerCase()));
    if (area) return `AREA_DETAIL:${area.area}`;
  }

  for (const faq of FAQS) {
    if (faq.keywords.some(k => msg.includes(k))) {
      return faq.answer;
    }
  }

  return "I am sorry, I did not understand that. You can ask me about:\n• Submitting complaints\n• Tracking status\n• Shortage predictions\n• High risk areas\n• Water quality\n• Emergency helpline\n\nType 'help' to see all features!";
}

function RiskBadge({ risk }) {
  const colors = {
    High: { bg: "#fef2f2", color: "#dc2626", border: "#fecaca" },
    Moderate: { bg: "#fff7ed", color: "#ea580c", border: "#fed7aa" },
    Low: { bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0" },
  };
  const s = colors[risk];
  return (
    <span style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}`, fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 8 }}>
      {risk} Risk
    </span>
  );
}

function MessageContent({ text }) {
  if (text === "SHORTAGE_PREDICTION") {
    return (
      <div>
        <p style={{ fontWeight: 700, marginBottom: 8, color: "#0369a1" }}>Shortage Prediction — Based on 5 Year Data</p>
        <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 8, padding: 8, marginBottom: 8 }}>
          <p style={{ fontSize: 12, color: "#92400e", fontWeight: 600, margin: "0 0 4px" }}>Current Risk Level: {SHORTAGE_PREDICTION.risk_level}</p>
          <p style={{ fontSize: 11, color: "#78350f", margin: 0, lineHeight: 1.5 }}>{SHORTAGE_PREDICTION.prediction}</p>
        </div>
        <p style={{ fontSize: 11, fontWeight: 600, color: "#374151", marginBottom: 4 }}>Recommendations:</p>
        {SHORTAGE_PREDICTION.recommendations.map((r, i) => (
          <p key={i} style={{ fontSize: 11, color: "#475569", margin: "2px 0", paddingLeft: 8 }}>• {r}</p>
        ))}
      </div>
    );
  }

  if (text === "RISK_AREAS") {
    return (
      <div>
        <p style={{ fontWeight: 700, marginBottom: 8, color: "#0369a1" }}>Areas by Water Shortage Risk</p>
        <p style={{ fontSize: 11, color: "#64748b", marginBottom: 8 }}>Based on 5-year complaint data (2021-2025)</p>
        {AREA_RISK_DATA.map(area => (
          <div key={area.area} style={{ background: "#f8fafc", borderRadius: 6, padding: "6px 8px", marginBottom: 6, border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
              <span style={{ fontSize: 12, fontWeight: 700 }}>{area.area}</span>
              <RiskBadge risk={area.risk} />
            </div>
            <p style={{ fontSize: 10, color: "#64748b", margin: "2px 0" }}>Shortage days/year: {area.shortage_days} | Complaints: {area.complaints_5yr}</p>
            <p style={{ fontSize: 10, color: "#94a3b8", margin: 0 }}>{area.prediction}</p>
          </div>
        ))}
        <p style={{ fontSize: 10, color: "#0ea5e9", marginTop: 6 }}>Ask me about any specific area for details!</p>
      </div>
    );
  }

  if (text.startsWith("AREA_DETAIL:")) {
    const areaName = text.replace("AREA_DETAIL:", "");
    const area = AREA_RISK_DATA.find(a => a.area === areaName);
    if (!area) return <p style={{ fontSize: 13 }}>Area not found.</p>;
    return (
      <div>
        <p style={{ fontWeight: 700, marginBottom: 8, color: "#0369a1" }}>{area.area} — Detailed Analysis</p>
        <RiskBadge risk={area.risk} />
        <div style={{ marginTop: 8 }}>
          <p style={{ fontSize: 11, margin: "4px 0" }}><strong>Shortage days/year:</strong> {area.shortage_days} days</p>
          <p style={{ fontSize: 11, margin: "4px 0" }}><strong>5-year complaints:</strong> {area.complaints_5yr}</p>
          <p style={{ fontSize: 11, margin: "4px 0" }}><strong>Main issue:</strong> {area.main_issue}</p>
          <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 6, padding: 8, marginTop: 8 }}>
            <p style={{ fontSize: 11, color: "#92400e", fontWeight: 600, margin: "0 0 2px" }}>Prediction:</p>
            <p style={{ fontSize: 11, color: "#78350f", margin: 0 }}>{area.prediction}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <p style={{ fontSize: 13, margin: 0, lineHeight: 1.6, whiteSpace: "pre-line" }}>{text}</p>
  );
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hello! I am AquaConnect Assistant. I can help you with:\n• Submitting complaints\n• Shortage predictions\n• High risk areas\n• Water quality info\n\nWhat do you need help with?",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = (text) => {
    const userMsg = text || input.trim();
    if (!userMsg) return;
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages(prev => [...prev, { from: "user", text: userMsg, time }]);
    setInput("");
    setTimeout(() => {
      const botReply = getBotResponse(userMsg);
      setMessages(prev => [...prev, { from: "bot", text: botReply, time }]);
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{ position: "fixed", bottom: 24, right: 24, width: 56, height: 56, borderRadius: "50%", background: "#0ea5e9", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 16px rgba(14,165,233,0.5)", zIndex: 9999, fontSize: 24 }}>
        {isOpen ? "✕" : "💬"}
      </div>

      {isOpen && (
        <div style={{ position: "fixed", bottom: 90, right: 24, width: 340, height: 520, background: "#fff", borderRadius: 16, boxShadow: "0 8px 32px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column", zIndex: 9998, border: "1px solid #e2e8f0", overflow: "hidden", fontFamily: "'Segoe UI', sans-serif" }}>

          <div style={{ background: "linear-gradient(135deg, #0369a1, #0ea5e9)", padding: "14px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>💧</div>
            <div>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: 14, margin: 0 }}>AquaConnect Assistant</p>
              <p style={{ color: "#bae6fd", fontSize: 11, margin: 0 }}>Shortage prediction + FAQ support</p>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: msg.from === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "85%", padding: "8px 12px", borderRadius: msg.from === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px", background: msg.from === "user" ? "#0ea5e9" : "#f1f5f9", color: msg.from === "user" ? "#fff" : "#1e293b" }}>
                  {msg.from === "bot" ? <MessageContent text={msg.text} /> : <p style={{ fontSize: 13, margin: 0 }}>{msg.text}</p>}
                </div>
                <span style={{ fontSize: 10, color: "#94a3b8", marginTop: 2 }}>{msg.time}</span>
              </div>
            ))}
          </div>

          <div style={{ padding: "8px 12px", borderTop: "1px solid #f1f5f9", display: "flex", gap: 6, flexWrap: "wrap" }}>
            {QUICK_QUESTIONS.map(q => (
              <button key={q} onClick={() => sendMessage(q)}
                style={{ fontSize: 10, padding: "4px 8px", borderRadius: 12, border: "1px solid #bae6fd", background: "#f0f9ff", color: "#0369a1", cursor: "pointer", fontWeight: 500 }}>
                {q}
              </button>
            ))}
          </div>

          <div style={{ padding: "10px 12px", borderTop: "1px solid #e2e8f0", display: "flex", gap: 8 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about shortage, areas, quality..."
              style={{ flex: 1, padding: "8px 12px", borderRadius: 20, border: "1px solid #e2e8f0", fontSize: 13, outline: "none" }}
            />
            <button onClick={() => sendMessage()}
              style={{ width: 36, height: 36, borderRadius: "50%", background: "#0ea5e9", color: "#fff", border: "none", cursor: "pointer", fontSize: 16 }}>
              ➤
            </button>
          </div>

        </div>
      )}
    </>
  );
}