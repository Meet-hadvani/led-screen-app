import React, { useState, useEffect } from "react";
import RightPanel from "./components/RightPanel.js";

const App = () => {
  const [models, setModels] = useState([]);
  const [mounts, setMounts] = useState([]);
  const [mediaPlayers, setMediaPlayers] = useState([]);
  const [receptacles, setReceptacles] = useState([]);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [description, setDescription] = useState({
    title: "",
    drawer: "",
    department: "",
    screenSize: "",
    date: "",
    floorDistance: 100, // Default floor distance
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const screensResponse = await fetch("http://localhost:5001/api/screens");
        const mountsResponse = await fetch("http://localhost:5001/api/mounts");
        const mediaPlayersResponse = await fetch("http://localhost:5001/api/media-players");
        const receptaclesResponse = await fetch("http://localhost:5001/api/receptacle-boxes");

        setModels(await screensResponse.json());
        setMounts(await mountsResponse.json());
        setMediaPlayers(await mediaPlayersResponse.json());
        setReceptacles(await receptaclesResponse.json());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectionChange = (type, selected) => {
    if (type === "model" && selected) {
      setSelectedDetails(selected.value);
    } else if (selected) {
      setSelectedDetails(selected.value);
    } else {
      setSelectedDetails(null);
    }
  };

  const handleDescriptionChange = (field, value) => {
    setDescription((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          flex: 1,
          position: "relative",
          border: "1px solid black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* SVG Display */}
        {selectedDetails && (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1000 1000"
            style={{
              background: "white",
              boxSizing: "border-box",
            }}
          >
            {/* Small Box on Top-Left */}
            <rect x="2" y="2" width="300" height="150" fill="#f5f5f5" stroke="#ccc" strokeWidth="1" />
            <text x="20" y="30" fontSize="18" fill="black">
              Title:     {description.title || "N/A"}
            </text>
            <text x="20" y="50" fontSize="18" fill="black">
              Drawer:    {description.drawer || "N/A"}
            </text>
            <text x="20" y="70" fontSize="18" fill="black">
              Dept:      {description.department || "N/A"}
            </text>
            <text x="20" y="90" fontSize="18" fill="black">
              Screen Size:      {description.screenSize || "N/A"}
            </text>
            <text x="20" y="110" fontSize="18" fill="black">
              Date:      {description.date || "N/A"}
            </text>
            <text x="20" y="130" fontSize="18" fill="black">
              Brand:     {selectedDetails?.Make || "N/A"}
            </text>

            {/* Small Box on Top-Right */}
            <rect x="698" y="2" width="300" height="150" fill="#f5f5f5" stroke="#ccc" strokeWidth="1" />
            <text x="710" y="30" fontSize="18" fill="black">
              Screen Dimensions
            </text>
            <text x="710" y="50" fontSize="18" fill="black">
              Height: {selectedDetails?.Height || "N/A"} cm
            </text>
            <text x="710" y="70" fontSize="18" fill="black">
              Width: {selectedDetails?.Width || "N/A"} cm
            </text>
            <text x="710" y="90" fontSize="18" fill="black">
              Floor Height: {description.floorDistance || "N/A"} cm
            </text>

            {/* Rectangle representing the LED screen */}
            {selectedDetails.Width && selectedDetails.Height && (
              <>
                <rect
                  x={500 - (selectedDetails.Width / 2) * 10}
                  y={500 - (selectedDetails.Height / 2) * 10}
                  width={selectedDetails.Width * 10}
                  height={selectedDetails.Height * 10}
                  fill="white"
                  stroke="black"
                  strokeWidth="3"
                />
                {/* Width text */}
                <text
                  x={500}
                  y={500 - (selectedDetails.Height / 2) * 10 - 10}
                  textAnchor="middle"
                  fontSize="16"
                  fill="black"
                >
                  {`${selectedDetails.Width} cm`}
                </text>
                {/* Height text */}
                <text
                  x={500 - (selectedDetails.Width / 2) * 10 - 10}
                  y={500}
                  textAnchor="end"
                  fontSize="16"
                  fill="black"
                  transform={`rotate(-90, ${500 - (selectedDetails.Width / 2) * 10 - 10}, 500)`}
                >
                  {`${selectedDetails.Height} cm`}
                </text>
              </>
            )}

            {/* Fixed Floor Line */}
            <line x1="0" y1="950" x2="1000" y2="950" stroke="black" strokeWidth="2" />
            <text x="500" y="940" textAnchor="middle" fontSize="16" fill="black">
              Floor
            </text>

            {/* Floor Distance Line */}
            <line
              x1="500"
              y1="500"
              x2="500"
              y2="950"
              stroke="black"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            <text x="510" y={(500 + 950) / 2} textAnchor="start" fontSize="16" fill="black">
              {`${description.floorDistance} cm`}
            </text>
          </svg>
        )}
      </div>
      <RightPanel
        models={models.map((item) => ({ label: item["Screen MFR"], value: item }))}
        mounts={mounts.map((item) => ({ label: item["Mount Type"], value: item }))}
        mediaPlayers={mediaPlayers.map((item) => ({ label: item["Media Player MFR"], value: item }))}
        receptacles={receptacles.map((item) => ({ label: item["Receptacle MFR"], value: item }))}
        onSelectionChange={handleSelectionChange}
        description={description}
        onDescriptionChange={handleDescriptionChange}
      />
    </div>
  );
};

export default App;
