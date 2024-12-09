import React, { useState, useEffect } from "react";
import RightPanel from "./components/RightPanel.js";
import jsPDF from "jspdf";
import svgToPdf from "svg-to-pdfkit";

const App = () => {
  const [models, setModels] = useState([]);
  const [mounts, setMounts] = useState([]);
  const [mediaPlayers, setMediaPlayers] = useState([]);
  const [receptacles, setReceptacles] = useState([]);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [orientation, setOrientation] = useState("horizontal"); // Track orientation
  const [description, setDescription] = useState({
    title: "",
    drawer: "",
    department: "",
    screenSize: "",
    date: "",
    floorDistance: 100,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const screensResponse = await fetch("http://localhost:5001/api/screens");
        const mountsResponse = await fetch("http://localhost:5001/api/mounts");
        const mediaPlayersResponse = await fetch("http://localhost:5001/api/media-players");
        const receptaclesResponse = await fetch("http://localhost:5001/api/receptacle-boxes");

        const models = await screensResponse.json();
        const mounts = await mountsResponse.json();
        const mediaPlayers = await mediaPlayersResponse.json();
        const receptacles = await receptaclesResponse.json();

        setModels(models);
        setMounts(mounts);
        setMediaPlayers(mediaPlayers);
        setReceptacles(receptacles);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectionChange = (type, selected) => {
    setSelectedDetails(selected?.value || null);
  };

  const handleDescriptionChange = (field, value) => {
    setDescription((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDownload = () => {
    const svgElement = document.querySelector("svg"); // Select the SVG element
    const svgRect = svgElement.getBoundingClientRect(); // Get the bounding rectangle of the SVG
  
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: [svgRect.width, svgRect.height], // Use bounding box dimensions
    });
  
    const svgString = new XMLSerializer().serializeToString(svgElement); // Serialize SVG to a string
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
  
    canvas.width = svgRect.width;
    canvas.height = svgRect.height;
  
    // Create an image from the serialized SVG
    const img = new Image();
    img.src = `data:image/svg+xml;base64,${btoa(svgString)}`;
    img.onload = () => {
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
  
      // Convert canvas to an image and add to PDF
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 0, 0, svgRect.width, svgRect.height);
      pdf.save("canvas.pdf");
    };
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
              <rect
                x={
                  500 -
                  (orientation === "horizontal"
                    ? selectedDetails.Width / 2
                    : selectedDetails.Height / 2) * 10
                }
                y={
                  500 -
                  (orientation === "horizontal"
                    ? selectedDetails.Height / 2
                    : selectedDetails.Width / 2) * 10
                }
                width={orientation === "horizontal" ? selectedDetails.Width * 10 : selectedDetails.Height * 10}
                height={orientation === "horizontal" ? selectedDetails.Height * 10 : selectedDetails.Width * 10}
                fill="white"
                stroke="black"
                strokeWidth="3"
              />
            )}

            /* Width and height annotations for the LED screen */
            {selectedDetails.Width && selectedDetails.Height && (
              <>
                {/* Width annotation */}
                <text
                  x={500}
                  y={
                    500 -
                    (orientation === "horizontal"
                      ? selectedDetails.Height / 2
                      : selectedDetails.Width / 2) * 10 - 10
                  }
                  textAnchor="middle"
                  fontSize="16"
                  fill="black"
                >
                  {orientation === "horizontal"
                    ? `${selectedDetails.Width} cm`
                    : `${selectedDetails.Height} cm`}
                </text>
                {/* Height annotation */}
                <text
                  x={
                    500 -
                    (orientation === "horizontal"
                      ? selectedDetails.Width / 2
                      : selectedDetails.Height / 2) * 10 - 10
                  }
                  y={500}
                  textAnchor="end"
                  fontSize="16"
                  fill="black"
                  transform={`rotate(-90, ${
                    500 -
                    (orientation === "horizontal"
                      ? selectedDetails.Width / 2
                      : selectedDetails.Height / 2) * 10 - 10
                  }, 500)`}
                >
                  {orientation === "horizontal"
                    ? `${selectedDetails.Height} cm`
                    : `${selectedDetails.Width} cm`}
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
        onOrientationChange={setOrientation} // Pass orientation handler
        onDownload={handleDownload}
      />
    </div>
  );
};

export default App;
