# React SVG LED Display Configurator

This repository contains a mini React application that allows users to configure and visualize LED screens, mounts, media players, and receptacle boxes. The app dynamically fetches data from APIs, renders SVG representations of the configurations, and allows users to download the visualization as a PDF.

## Features
- **Dynamic Data Fetching:** Fetches LED models, mounts, media players, and receptacle boxes from backend APIs.
- **Interactive SVG Visualizations:** Displays an SVG representation of the LED screen based on user selections.
- **Orientation Control:** Switch between horizontal and vertical orientations for the LED screen.
- **PDF Export:** Download the SVG visualization as a PDF file.

## Project Structure
```
.
├── src
│   ├── App.js                  # Main component
│   ├── components
│   │   └── RightPanel.js       # Right-side configuration panel
│   ├── index.js                # Entry point
│   └── styles                  # (Optional) Add custom styles here
├── public
│   └── index.html              # HTML template
└── package.json                # Project dependencies and scripts
```

## Getting Started

### Prerequisites
- Node.js (v14 or above)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/react-svg-led-configurator.git
   cd react-svg-led-configurator
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Application
1. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```
2. Open your browser and navigate to `http://localhost:3000`.

### Backend Setup
Ensure the backend APIs are running at `http://localhost:5001` with the following endpoints:
- `GET /api/screens`
- `GET /api/mounts`
- `GET /api/media-players`
- `GET /api/receptacle-boxes`

You can adjust the API URLs in `App.js` if necessary.

### Building for Production
1. Build the application:
   ```bash
   npm run build
   # or
   yarn build
   ```
2. The optimized build will be available in the `build` directory.

## How to Use
1. Select configurations for the screen, media player, mount, and receptacle box from the dropdown menus.
2. Adjust properties like orientation (horizontal/vertical) and floor distance.
3. Enter additional details like title, drawer, department, screen size, and date.
4. Download the SVG visualization as a PDF by clicking the **Download PDF** button.

## Known Issues
- Switching between horizontal and vertical orientations may cause SVG dimensions to reset. Ensure correct user interaction to prevent unintended behavior.
- Backend API endpoints must be correctly configured to avoid fetch errors.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature description"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgments
- **[React](https://reactjs.org/):** JavaScript library for building user interfaces.
- **[jsPDF](https://github.com/parallax/jsPDF):** Library for generating PDF files.
- **[svg-to-pdfkit](https://github.com/alafr/SVG-to-PDFKit):** Library for converting SVGs to PDFs.

---

Happy Coding! 🚀

