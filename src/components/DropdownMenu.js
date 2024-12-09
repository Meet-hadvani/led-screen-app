import React from "react";
import Select from "react-select";

const DropdownMenu = ({ options, placeholder, onChange }) => {
  return (
    <div style={{ margin: "0 10px", width: "200px" }}>
      <Select 
        options={options} 
        placeholder={placeholder} 
        onChange={onChange} 
        isClearable 
      />
    </div>
  );
};

export default DropdownMenu;