import React, { useState } from "react";

export default function GovtSchemes() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Schemes");

  const schemesData = [
    {
      name: "Jal Jeevan Mission",
      category: "Drinking Water & Sanitation",
      ministry: "Ministry of Jal Shakti",
      status: "Active",
      description: "Provides tap water to rural households."
    },
    {
      name: "Atal Bhujal Yojana",
      category: "Groundwater & River",
      ministry: "Ministry of Jal Shakti",
      status: "Active",
      description: "Groundwater sustainability program."
    },
    {
      name: "Namami Gange",
      category: "Groundwater & River",
      ministry: "Ministry of Jal Shakti",
      status: "Active",
      description: "Cleaning and conservation of Ganga."
    },
    {
      name: "PM Krishi Sinchayee Yojana",
      category: "Irrigation & Agriculture",
      ministry: "Ministry of Agriculture",
      status: "Active",
      description: "Improves irrigation efficiency."
    }
  ];

  const categories = [
    "All Schemes",
    "Drinking Water & Sanitation",
    "Irrigation & Agriculture",
    "Watershed & Conservation",
    "Flood Management",
    "Groundwater & River",
    "Urban Water Management"
  ];

  const filteredSchemes = schemesData.filter(
    (scheme) =>
      (selectedCategory === "All Schemes" ||
        scheme.category === selectedCategory) &&
      scheme.name.toLowerCase().includes(search.toLowerCase())
  );

  const styles = {
    container: {
      padding: "30px",
      background: "#0b1e2d",
      color: "white",
      minHeight: "100vh",
      fontFamily: "Poppins"
    },
    title: { textAlign: "center" },
    subtitle: { textAlign: "center", opacity: 0.8, marginBottom: "20px" },
    stats: { display: "flex", justifyContent: "center", gap: "15px" },
    card: {
      background: "#132f45",
      padding: "15px",
      borderRadius: "10px"
    },
    search: {
      width: "100%",
      padding: "10px",
      margin: "20px 0",
      borderRadius: "10px",
      border: "none"
    },
    categories: { display: "flex", flexWrap: "wrap", gap: "10px" },
    button: {
      padding: "8px 15px",
      borderRadius: "20px",
      border: "none",
      background: "#1c3d5a",
      color: "white",
      cursor: "pointer"
    },
    activeButton: {
      background: "#00bcd4"
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "15px",
      marginTop: "20px"
    },
    schemeCard: {
      background: "#132f45",
      padding: "15px",
      borderRadius: "12px"
    },
    status: {
      background: "green",
      padding: "5px 10px",
      borderRadius: "10px",
      display: "inline-block",
      marginTop: "10px"
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>💧 AquaConnect – Water for All</h1>
      <p style={styles.subtitle}>
        Explore water-related government schemes
      </p>

      {/* Stats */}
      <div style={styles.stats}>
        <div style={styles.card}>Total: {schemesData.length}</div>
        <div style={styles.card}>Active: {schemesData.length}</div>
        <div style={styles.card}>Categories: {categories.length - 1}</div>
        <div style={styles.card}>Ministries: 2</div>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search schemes..."
        style={styles.search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Categories */}
      <div style={styles.categories}>
        {categories.map((cat) => (
          <button
            key={cat}
            style={{
              ...styles.button,
              ...(selectedCategory === cat ? styles.activeButton : {})
            }}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Schemes */}
      <div style={styles.grid}>
        {filteredSchemes.map((scheme, i) => (
          <div key={i} style={styles.schemeCard}>
            <h3>{scheme.name}</h3>
            <p><b>Category:</b> {scheme.category}</p>
            <p><b>Ministry:</b> {scheme.ministry}</p>
            <p>{scheme.description}</p>
            <span style={styles.status}>{scheme.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}