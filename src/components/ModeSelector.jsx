import "../styles/ModeSelector.css";
import React, { useState } from "react";

const ModeSelector = ({ mode, setMode }) => {
  const handleModeChange = (selectedMode) => {
    setMode(selectedMode);
  };

  return (
    <div className="mode-selection-container">
      <button
        className={mode === 1 ? "selected" : ""}
        onClick={() => handleModeChange(1)}
      >
        Question & Answer
      </button>
      <button
        className={mode === 0 ? "selected" : ""}
        onClick={() => handleModeChange(0)}
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
