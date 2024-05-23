import "../styles/ModeSelector.css";
import React, { useState } from "react";

const ModeSelector = () => {
  const [mode, setMode] = useState("q&a");

  const handleModeChange = (selectedMode) => {
    setMode(selectedMode);
  };

  return (
    <div className="mode-selection-container">
      <button
        className={mode === "q&a" ? "selected" : ""}
        onClick={() => handleModeChange("q&a")}
      >
        Question & Answer
      </button>
      <button
        className={mode === "sg" ? "selected" : ""}
        onClick={() => handleModeChange("sg")}
      >
        Syllabus Generation
      </button>
      {/* <button
        className={mode === "precise" ? "selected" : ""}
        onClick={() => handleModeChange("precise")}
      >
        Precise
      </button> */}
    </div>
  );
};

export default ModeSelector;
