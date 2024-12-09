import React, { useState, useEffect } from "react";
const RightPanel = ({
  models,
  mounts,
  mediaPlayers,
  receptacles,
  onSelectionChange,
  description,
  onDescriptionChange,
}) => {
  return (
    <div
      style={{
        padding: "1rem",
        width: "300px",
        backgroundColor: "#2a2a3e",
        borderLeft: "1px solid #444455",
        color: "#e0e0e0",
      }}
    >
      <div style={{ marginBottom: "2rem" }}>
        <h2>Configuration</h2>
        <div style={{ marginBottom: "1rem" }}>
          <label>Screen</label>
          <select
            onChange={(e) => onSelectionChange("model", models[e.target.selectedIndex])}
            style={{ width: "100%" }}
          >
            {models.map((option, index) => (
              <option key={index} value={index}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Media Player</label>
          <select
            onChange={(e) => onSelectionChange("mediaPlayer", mediaPlayers[e.target.selectedIndex])}
            style={{ width: "100%" }}
          >
            {mediaPlayers.map((option, index) => (
              <option key={index} value={index}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Mount</label>
          <select
            onChange={(e) => onSelectionChange("mount", mounts[e.target.selectedIndex])}
            style={{ width: "100%" }}
          >
            {mounts.map((option, index) => (
              <option key={index} value={index}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Receptacle Box</label>
          <select
            onChange={(e) => onSelectionChange("receptacle", receptacles[e.target.selectedIndex])}
            style={{ width: "100%" }}
          >
            {receptacles.map((option, index) => (
              <option key={index} value={index}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
          <button style={{ flex: 1, marginRight: "0.5rem" }}>Vertical</button>
          <button style={{ flex: 1 }}>Horizontal</button>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
          <button style={{ flex: 1, marginRight: "0.5rem" }}>Niche</button>
          <button style={{ flex: 1 }}>Flat Wall</button>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <label style={{ flex: 1 }}>Floor Distance</label>
          <input
            type="number"
            placeholder="50"
            value={description.floorDistance || ""}
            onChange={(e) => onDescriptionChange("floorDistance", e.target.value)}
            style={{ flex: 1 }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <label style={{ flex: 1 }}>Depth Var</label>
          <input type="text" placeholder="0.5" style={{ flex: 1 }} />
        </div>
      </div>
      <div>
        <h2>Description</h2>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
          <label style={{ flex: 1 }}>Title</label>
          <input
            type="text"
            value={description.title}
            onChange={(e) => onDescriptionChange("title", e.target.value)}
            style={{ flex: 1 }}
          />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Drawer</label>
          <input
            type="text"
            value={description.drawer}
            onChange={(e) => onDescriptionChange("drawer", e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Department</label>
          <input
            type="text"
            value={description.department}
            onChange={(e) => onDescriptionChange("department", e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Screen Size</label>
          <input
            type="text"
            value={description.screenSize}
            onChange={(e) => onDescriptionChange("screenSize", e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Date</label>
          <input
            type="date"
            value={description.date}
            onChange={(e) => onDescriptionChange("date", e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
        <button style={{ width: "100%", backgroundColor: "#0078D7", color: "white", borderRadius: "4px" }}>
          Download
        </button>
      </div>
    </div>
  );
};

export default RightPanel;