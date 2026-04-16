import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../services/Api";

const HYDERABAD_AREAS = [
  "Kukatpally", "Madhapur", "Ameerpet", "KPHB",
  "Gachibowli", "Hitech City", "Banjara Hills",
  "Secunderabad", "Begumpet", "Dilsukhnagar"
];

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    area: "", password: "", confirmPassword: "",
    aadhaar: "", otp: ""
  });
  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validateStep1 = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = "Enter valid 10-digit mobile number";
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter valid email address";
    if (!form.area) e.area = "Please select your area";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e = {};
    if (form.password.length < 8) e.password = "Password must be at least 8 characters";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
    if (!/^\d{12}$/.test(form.aadhaar)) e.aadhaar = "Enter valid 12-digit Aadhaar number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSendOTP = () => {
    if (!/^\d{12}$/.test(form.aadhaar)) {
      setErrors(prev => ({ ...prev, aadhaar: "Enter valid 12-digit Aadhaar number" }));
      return;
    }
    setLoading(true);
    // Simulating OTP send - for production, you'd call authAPI.sendOTP
    setTimeout(() => {
      setOtpSent(true);
      setLoading(false);
    }, 1500);
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };
const handleRegister = async () => {
  if (!form.otp || form.otp.length < 4) {
    setErrors({ otp: "Enter OTP" });
    return;
  }

  if (form.otp !== "1234") {
    setErrors({ otp: "Invalid OTP" });
    return;
  }

  setLoading(true);

  try {
    const res = await authAPI.register({
      name: form.name,
      phone: form.phone,
      email: form.email,
      password: form.password,
      area: form.area,
      aadhaar: form.aadhaar   // ✅ FIXED HERE
    });

    console.log("REGISTER RESPONSE:", res.data);

    if (res.data.token) {
      login(res.data.user, res.data.token);
      navigate("/home");
    }

  } catch (err) {
    console.error("Registration Error:", err.response?.data);
    setErrors({
      otp: err.response?.data?.message || "Registration failed"
    });
  } finally {
    setLoading(false);
  }
};

  const inputStyle = (field) => ({
    width: "100%",
    padding: "10px 14px",
    borderRadius: 8,
    border: `1px solid ${errors[field] ? "#fca5a5" : "#e2e8f0"}`,
    fontSize: 14,
    outline: "none",
    background: errors[field] ? "#fef2f2" : "#fff",
    boxSizing: "border-box",
  });

  const labelStyle = {
    fontSize: 13,
    fontWeight: 600,
    color: "#374151",
    marginBottom: 6,
    display: "block"
  };

  const errorStyle = {
    fontSize: 12,
    color: "#dc2626",
    marginTop: 4
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", background: "linear-gradient(135deg, #f0f9ff, #e0f2fe)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 480 }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 36, marginBottom: 6 }}>💧</div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0c4a6e", margin: 0 }}>AquaConnect</h1>
          <p style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>Create your citizen account</p>
        </div>

        {/* Card */}
        <div style={{ background: "#fff", borderRadius: 16, padding: 32, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", border: "1px solid #e2e8f0" }}>

          {/* Step Indicator */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: 28 }}>
            {[
              { num: 1, label: "Personal Info" },
              { num: 2, label: "Security" },
              { num: 3, label: "Verification" },
            ].map((s, i) => (
              <div key={s.num} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: step >= s.num ? "#0ea5e9" : "#f1f5f9",
                    color: step >= s.num ? "#fff" : "#94a3b8",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 700,
                    border: step === s.num ? "2px solid #0369a1" : "none"
                  }}>
                    {step > s.num ? "✓" : s.num}
                  </div>
                  <span style={{ fontSize: 10, color: step >= s.num ? "#0ea5e9" : "#94a3b8", marginTop: 4, fontWeight: 600 }}>
                    {s.label}
                  </span>
                </div>
                {i < 2 && (
                  <div style={{ height: 2, flex: 1, background: step > s.num ? "#0ea5e9" : "#f1f5f9", marginBottom: 16 }} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 4px" }}>Personal Information</h2>
              <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 8px" }}>Tell us about yourself</p>

              <div>
                <label style={labelStyle}>Full Name *</label>
                <input style={inputStyle("name")} placeholder="e.g. Rahul Sharma" value={form.name} onChange={e => update("name", e.target.value)} />
                {errors.name && <p style={errorStyle}>{errors.name}</p>}
              </div>

              <div>
                <label style={labelStyle}>Mobile Number *</label>
                <input style={inputStyle("phone")} placeholder="e.g. 9876543210" value={form.phone} onChange={e => update("phone", e.target.value)} maxLength={10} />
                {errors.phone && <p style={errorStyle}>{errors.phone}</p>}
              </div>

              <div>
                <label style={labelStyle}>Email Address <span style={{ color: "#94a3b8", fontWeight: 400 }}>(optional)</span></label>
                <input style={inputStyle("email")} placeholder="e.g. rahul@email.com" value={form.email} onChange={e => update("email", e.target.value)} />
                {errors.email && <p style={errorStyle}>{errors.email}</p>}
              </div>

              <div>
                <label style={labelStyle}>Your Area *</label>
                <select style={inputStyle("area")} value={form.area} onChange={e => update("area", e.target.value)}>
                  <option value="">-- Select your area --</option>
                  {HYDERABAD_AREAS.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
                {errors.area && <p style={errorStyle}>{errors.area}</p>}
              </div>

              <button onClick={handleNext} style={{ padding: "12px", background: "#0ea5e9", color: "#fff", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 8 }}>
                Continue →
              </button>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 4px" }}>Set Up Security</h2>
              <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 8px" }}>Create a password and link your Aadhaar</p>

              <div>
                <label style={labelStyle}>Password *</label>
                <input type="password" style={inputStyle("password")} placeholder="Minimum 8 characters" value={form.password} onChange={e => update("password", e.target.value)} />
                {errors.password && <p style={errorStyle}>{errors.password}</p>}
              </div>

              <div>
                <label style={labelStyle}>Confirm Password *</label>
                <input type="password" style={inputStyle("confirmPassword")} placeholder="Re-enter your password" value={form.confirmPassword} onChange={e => update("confirmPassword", e.target.value)} />
                {errors.confirmPassword && <p style={errorStyle}>{errors.confirmPassword}</p>}
              </div>

              <div>
                <label style={labelStyle}>Aadhaar Number *</label>
                <input style={inputStyle("aadhaar")} placeholder="12-digit Aadhaar number" value={form.aadhaar} onChange={e => update("aadhaar", e.target.value.replace(/\D/g, ""))} maxLength={12} />
                {errors.aadhaar && <p style={errorStyle}>{errors.aadhaar}</p>}
                <p style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>Used only for identity verification.</p>
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <button onClick={() => setStep(1)} style={{ flex: 1, padding: "12px", background: "#f8fafc", color: "#64748b", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                  ← Back
                </button>
                <button onClick={handleNext} style={{ flex: 2, padding: "12px", background: "#0ea5e9", color: "#fff", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 4px" }}>Aadhaar Verification</h2>
              <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 8px" }}>Verify your identity</p>

              <div style={{ background: "#f0f9ff", borderRadius: 10, padding: 16, border: "1px solid #bae6fd" }}>
                <p style={{ fontSize: 13, color: "#0369a1", margin: 0 }}>
                  OTP will be sent to mobile linked with Aadhaar ending in
                  <strong> XXXX{form.aadhaar.slice(-4)}</strong>
                </p>
              </div>

              {!otpSent ? (
                <button onClick={handleSendOTP} disabled={loading} style={{ padding: "12px", background: "#0ea5e9", color: "#fff", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              ) : (
                <>
                  <div style={{ background: "#f0fdf4", borderRadius: 10, padding: 12, border: "1px solid #bbf7d0" }}>
                    <p style={{ fontSize: 13, color: "#16a34a", margin: 0 }}>
                      OTP sent successfully! Use <strong>1234</strong> for testing.
                    </p>
                  </div>
                  <div>
                    <label style={labelStyle}>Enter OTP *</label>
                    <input style={inputStyle("otp")} placeholder="Enter 4-digit OTP" value={form.otp} onChange={e => update("otp", e.target.value.replace(/\D/g, ""))} maxLength={4} />
                    {errors.otp && <p style={errorStyle}>{errors.otp}</p>}
                  </div>
                </>
              )}

              <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                <button onClick={() => setStep(2)} style={{ flex: 1, padding: "12px", background: "#f8fafc", color: "#64748b", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                  ← Back
                </button>
                {otpSent && (
                  <button onClick={handleRegister} disabled={loading} style={{ flex: 2, padding: "12px", background: "#22c55e", color: "#fff", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
                    {loading ? "Creating Account..." : "Create Account ✓"}
                  </button>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Login Link */}
        <p style={{ textAlign: "center", fontSize: 14, color: "#64748b", marginTop: 20 }}>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} style={{ color: "#0ea5e9", fontWeight: 600, cursor: "pointer" }}>
            Login here
          </span>
        </p>

      </div>
    </div>
  );
}