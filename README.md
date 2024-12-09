# LED Screen Installation Diagram Tool

## Overview

The **LED Screen Installation Diagram Tool** is a React-based application designed to assist users in creating professional installation diagrams for LED screens. It enables users to select equipment, configure options, and generate a customizable drawing in real-time. The generated diagram, including measurements and dimensions, can be exported as a PDF file.

---

## Features

### 1. **Equipment Selection**
- Dropdown menus to select:
  - **LED Screen Model**
  - **Mount Type**
  - **Media Player (Mini Computer)**
  - **Receptacle Box (Power Outlet Box)**
- Equipment data is populated from a provided CSV file.

### 2. **Dynamic Drawing Display**
- Displays a simple, clear diagram of the LED screen.
- Updates in real-time as users make selections.
- Includes:
  - Measurements and dimensions.
  - Dashed box indicating the power outlet location.
  - Distance from the floor to the screen center.

### 3. **Configuration Options**
- Toggle between **horizontal** and **vertical** screen orientation.
- Choose between **Niche (Recessed)** or **Flat Wall** installation.
- Input:
  - Distance from the floor to the screen center.
  - Adjustable niche depth.
  
### 4. **Project Information**
- Input fields for:
  - Project Title
  - Designer’s Name
  - Department
  - Screen Size
  - Date

### 5. **PDF Export**
- Allows users to download the final diagram in PDF format.

---

## Data Requirements

- A CSV file is used as the data source for equipment details (e.g., models, sizes, etc.).
- The application reads and populates dropdown menus based on this data.

---

## Installation

### Prerequisites
- Node.js (>=16.x)
- npm or yarn

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Go to Server repository to start backend:
   ```bash
   cd server
   node server.js
   ```
6. Open the app in your browser at `http://localhost:3000`.

---

## Usage

1. **Upload CSV Data**: Use the provided sample CSV file to populate equipment options.
2. **Make Selections**: Use the dropdown menus to choose equipment and configure installation options.
3. **View the Diagram**: The diagram updates automatically based on user inputs.
4. **Input Project Details**: Fill in the required fields to personalize the project.
5. **Export to PDF**: Save the diagram by clicking the **Download PDF** button.

---

## Technical Details

### Formula for Niche Depth Calculation
The niche depth is calculated as:
```text
Screen Depth + Max(Media Player Depth, Mount Depth) + Depth Variance
```

### Gap Between Outer Box (Niche) and Screen
- For screens under 55″: 1.5″ on each side.
- For screens over 55″: 2″ on each side.
- This value can be adjusted via an input field.

---

## Development Guidelines

- Ensure all measurements are accurate and clearly displayed.
- Maintain clean and professional UI/UX design.
- Code should be:
  - Modular and well-organized.
  - Thoroughly commented for clarity.

---

## Tools and Libraries

- **React**: Front-end framework for building the UI.
- **React PDF**: To generate downloadable PDFs.
- **CSV Parser**: To read and process the provided CSV file.
- **CSS/SCSS**: For styling.

---

## Success Criteria

- **Usability**: Intuitive and user-friendly interface.
- **Real-Time Updates**: Diagrams update seamlessly with user input.
- **Accurate Outputs**: Precise measurements and dimensions.
- **Professional Design**: Clean and modern UI.

---

## Future Improvements

- Add drag-and-drop functionality for diagram elements.
- Integrate a 3D preview of the installation.
- Support for multiple languages.
- Enhance PDF styling for better presentation.

---

## Contribution

Feel free to contribute by submitting issues or creating pull requests.

---

## License

This project is licensed under the [MIT License](LICENSE).
