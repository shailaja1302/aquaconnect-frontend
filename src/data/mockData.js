export const mockComplaints = [
  { id: 1, type: "Shortage", area: "Kukatpally", status: "Registered", date: "2025-03-10", description: "No water supply since 2 days" },
  { id: 2, type: "Leakage", area: "Madhapur", status: "Assigned", date: "2025-03-11", description: "Pipe burst near main road" },
  { id: 3, type: "Contamination", area: "Ameerpet", status: "Resolved", date: "2025-03-09", description: "Dirty water coming from tap" },
  { id: 4, type: "Shortage", area: "KPHB", status: "Field Visit", date: "2025-03-12", description: "Low pressure for 3 days" },
];

export const mockSupplyStatus = [
  { area: "Kukatpally", status: "Disrupted", time: "6 AM - 8 AM" },
  { area: "Madhapur", status: "Normal", time: "5 AM - 9 AM" },
  { area: "Ameerpet", status: "Normal", time: "6 AM - 10 AM" },
  { area: "KPHB", status: "Delayed", time: "8 AM - 10 AM" },
];

export const mockChartData = [
  { month: "Oct", complaints: 30 },
  { month: "Nov", complaints: 45 },
  { month: "Dec", complaints: 38 },
  { month: "Jan", complaints: 52 },
  { month: "Feb", complaints: 41 },
  { month: "Mar", complaints: 60 },
];