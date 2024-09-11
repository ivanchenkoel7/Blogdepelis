// src/ToggleSidebarButton.js
import React from 'react';

const ToggleSidebarButton = ({ toggleSidebar }) => {
    return (
        <button id="toggle-sidebar" className="toggle-sidebar" onClick={toggleSidebar}>
            ☰
        </button>
    );
};

export default ToggleSidebarButton;