const express = require('express');
const ExcelJS = require('exceljs');
const cors = require('cors');

const app = express();
const PORT = 5001;

// Enable CORS for requests from http://localhost:3000
app.use(cors({
  origin: 'http://localhost:3000',
}));

// Load and parse the spreadsheet
const loadSpreadsheet = async () => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile('./PDF Builder .xlsx');

  // Extract data from each sheet
  const sheets = {
    screens: workbook.getWorksheet('Screen MFR').getSheetValues(),
    mediaPlayers: workbook.getWorksheet('Media Player MFR').getSheetValues(),
    mounts: workbook.getWorksheet('Mounts').getSheetValues(),
    receptacleBoxes: workbook.getWorksheet('Receptacle Box').getSheetValues(),
  };

  // Convert data to JSON (remove empty rows and headers)
  for (const key in sheets) {
    sheets[key] = sheets[key]
      .slice(2)
      .map(row => {
        return row.reduce((obj, cell, index) => {
          const header = sheets[key][1]?.[index] || `Column${index}`;
          if (cell !== undefined && header) obj[header] = cell;
          return obj;
        }, {});
      });
  }

  return sheets;
};

// Initialize the sheets object
let sheets = {};
loadSpreadsheet().then(data => {
  sheets = data;
}).catch(err => {
  console.error('Error loading spreadsheet:', err);
});

// API Endpoints
app.get('/api/screens', (req, res) => res.json(sheets.screens || []));
app.get('/api/media-players', (req, res) => res.json(sheets.mediaPlayers || []));
app.get('/api/mounts', (req, res) => res.json(sheets.mounts || []));
app.get('/api/receptacle-boxes', (req, res) => res.json(sheets.receptacleBoxes || []));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
