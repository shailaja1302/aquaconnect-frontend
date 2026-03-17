import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { mockComplaints } from "../data/mockData";

const COMPLAINT_TYPES = ["Shortage", "Leakage", "Contamination", "Low Pressure", "Other"];
const HYDERABAD_AREAS = ["Kukatpally", "Madhapur", "Ameerpet", "KPHB", "Gachibowli", "Hitech City", "Banjara Hills"];

export default function SubmitComplaint() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log("Complaint submitted:", data);
      mockComplaints.push({ id: Date.now(), ...data, status: "Registered", date: new Date().toISOString().split("T")[0] });
      toast.success("Complaint submitted! Tracking ID: #" + Date.now());
      reset();
    } catch (err) {
      toast.error("Submission failed. Try again.");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: "0 20px" }}>
      <h2>Submit a Water Complaint</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 16 }}>

        <div>
          <label>Complaint Type</label>
          <select {...register("type", { required: "Select a type" })} style={{ width: "100%", padding: 8 }}>
            <option value="">-- Select --</option>
            {COMPLAINT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          {errors.type && <span style={{ color: "red" }}>{errors.type.message}</span>}
        </div>

        <div>
          <label>Area</label>
          <select {...register("area", { required: "Select your area" })} style={{ width: "100%", padding: 8 }}>
            <option value="">-- Select Area --</option>
            {HYDERABAD_AREAS.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
          {errors.area && <span style={{ color: "red" }}>{errors.area.message}</span>}
        </div>

        <div>
          <label>Description</label>
          <textarea
            {...register("description", { required: "Describe the issue", minLength: { value: 20, message: "Minimum 20 characters" } })}
            rows={4} style={{ width: "100%", padding: 8 }}
            placeholder="Describe the water issue in detail..."
          />
          {errors.description && <span style={{ color: "red" }}>{errors.description.message}</span>}
        </div>

        <div>
          <label>Your Phone Number</label>
          <input
            type="tel"
            {...register("phone", { required: "Phone is required", pattern: { value: /^[6-9]\d{9}$/, message: "Enter valid Indian mobile number" } })}
            style={{ width: "100%", padding: 8 }}
            placeholder="e.g. 9876543210"
          />
          {errors.phone && <span style={{ color: "red" }}>{errors.phone.message}</span>}
        </div>

        <button type="submit" style={{ padding: "10px 24px", background: "#0ea5e9", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 16 }}>
          Submit Complaint
        </button>
      </form>
    </div>
  );
}