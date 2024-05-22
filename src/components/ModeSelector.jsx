import "../styles/ModeSelector.css";
import React, { useState } from "react";

const ModeSelector = () => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <div className="mode-selection-container">
      <div className="qa-option mode-option">
        <ion-icon name="help"></ion-icon>
      </div>
      <div
        className={`toggle-switch ${isOn ? "on" : "off"}`}
        onClick={handleToggle}
      >
        <div className="toggle-handle"></div>
      </div>
      <div className="sg-option mode-option">
        <ion-icon name="cog"></ion-icon>
      </div>
    </div>
  );
};

export default ModeSelector;
