import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { complaintAPI } from "../services/api";

const COMPLAINT_TYPES = ["Shortage", "Leakage", "Contamination", "Low Pressure", "Other"];
const HYDERABAD_AREAS = ["Kukatpally", "Madhapur", "Ameerpet", "KPHB", "Gachibowli", "Hitech City", "Banjara Hills"];

export default function SubmitComplaint() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await complaintAPI.submit(data);
      toast.success("Complaint submitted! Tracking ID: #" + res.data.complaint.id);
      reset();
    } catch (err) {
      toast.error(err.response?.data?.message || "Submission failed. Try again.");
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
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#f8fafc", minHeight: "100vh", padding: "40px 24px" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 6px" }}>Submit a Complaint</h1>
          <p style={{ color: "#64748b", margin: 0, fontSize: 14 }}>
            Report a water issue in your area. Our AI will automatically route it to the correct department.
          </p>
        </div>

        {/* Info Banner */}
        <div style={{ background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: 10, padding: 14, marginBottom: 24, display: "flex", gap: 10, alignItems: "flex-start" }}>
          <span style={{ fontSize: 18 }}>ℹ️</span>
          <p style={{ fontSize: 13, color: "#0369a1", margin: 0, lineHeight: 1.6 }}>
            Your complaint will be automatically tagged and routed to the correct department. You will receive updates via SMS as the status changes.
          </p>
        </div>

        {/* Form Card */}
        <div style={{ background: "#fff", borderRadius: 16, padding: 32, border: "1px solid #e2e8f0", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Complaint Type */}
            <div>
              <label style={labelStyle}>Complaint Type *</label>
              <select
                {...register("type", { required: "Please select a complaint type" })}
                style={inputStyle("type")}
              >
                <option value="">-- Select complaint type --</option>
                {COMPLAINT_TYPES.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              {errors.type && <p style={errorStyle}>{errors.type.message}</p>}
            </div>

            {/* Area */}
            <div>
              <label style={labelStyle}>Your Area *</label>
              <select
                {...register("area", { required: "Please select your area" })}
                style={inputStyle("area")}
              >
                <option value="">-- Select your area --</option>
                {HYDERABAD_AREAS.map(a => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
              {errors.area && <p style={errorStyle}>{errors.area.message}</p>}
            </div>

            {/* Description */}
            <div>
              <label style={labelStyle}>Description *</label>
              <textarea
                {...register("description", {
                  required: "Please describe the issue",
                  minLength: { value: 20, message: "Minimum 20 characters required" }
                })}
                rows={5}
                style={{ ...inputStyle("description"), resize: "vertical" }}
                placeholder="Describe the water issue in detail — when did it start, how severe is it, how many households are affected..."
              />
              {errors.description && <p style={errorStyle}>{errors.description.message}</p>}
            </div>

            {/* Phone */}
            <div>
              <label style={labelStyle}>Your Phone Number *</label>
              <input
                type="tel"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: "Enter a valid 10-digit Indian mobile number"
                  }
                })}
                style={inputStyle("phone")}
                placeholder="e.g. 9876543210"
                maxLength={10}
              />
              {errors.phone && <p style={errorStyle}>{errors.phone.message}</p>}
              <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>
                We'll send you SMS updates about your complaint status
              </p>
            </div>

            {/* Complaint Type Info */}
            <div style={{ background: "#f8fafc", borderRadius: 10, padding: 16, border: "1px solid #e2e8f0" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 10 }}>
                What type should I select?
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  { type: "Shortage", desc: "No water supply" },
                  { type: "Leakage", desc: "Pipe burst or leak" },
                  { type: "Contamination", desc: "Dirty or smelly water" },
                  { type: "Low Pressure", desc: "Weak water flow" },
                ].map(item => (
                  <div key={item.type} style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
                    <span style={{ color: "#0ea5e9", fontWeight: 700, fontSize: 12 }}>{item.type}:</span>
                    <span style={{ fontSize: 12, color: "#64748b" }}>{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: "14px",
                background: isSubmitting ? "#7dd3fc" : "#0ea5e9",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontSize: 16,
                fontWeight: 700,
                cursor: isSubmitting ? "not-allowed" : "pointer",
                marginTop: 4
              }}>
              {isSubmitting ? "Submitting..." : "Submit Complaint"}
            </button>

            <p style={{ fontSize: 12, color: "#94a3b8", textAlign: "center", margin: 0 }}>
              By submitting, you confirm this is a genuine water issue. False complaints may result in account suspension.
            </p>

          </form>
        </div>

        {/* What happens next */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0", marginTop: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>What happens after you submit?</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { step: "1", text: "AI reads your complaint and tags it as Shortage / Leakage / Contamination etc." },
              { step: "2", text: "It is automatically routed to the correct water department" },
              { step: "3", text: "A field officer is assigned and visits your area" },
              { step: "4", text: "You receive SMS updates at every stage until resolved" },
            ].map(item => (
              <div key={item.step} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#0ea5e9", color: "#fff", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {item.step}
                </div>
                <p style={{ fontSize: 13, color: "#475569", margin: 0, lineHeight: 1.6 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}