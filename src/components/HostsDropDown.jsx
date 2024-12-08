import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/hostsDropDown.css";

const HostsDropdown = ({ hosts }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(null); // Controla qual dropdown está aberto

  const hostDetails = (uuid) => {
    navigate("/host-details", { state: { uuid } });
  };

  const toggleDropdown = (type) => {
    setIsOpen(isOpen === type ? null : type); // Alterna o dropdown aberto
  };

  const renderDropdown = (type, data) => (
    <div style={{ position: "relative", marginBottom: "20px" }}>
      <button
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          backgroundColor: "#fff",
          cursor: "pointer",
        }}
        onClick={() => toggleDropdown(type)}
      >
        {type} Hosts ({data.length})
      </button>
      {isOpen === type && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#fff",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            width: "200px",
          }}
        >
          {data.map((host) => (
            <div
              key={host[0]}
              style={{
                padding: "10px",
                borderBottom: "1px solid #eee",
                cursor: "pointer",
                color: "blue",
                textDecoration: "none",
              }}
              onClick={() => {
                hostDetails(host[0]);
                setIsOpen(null);
              }}
            >
              {host[1]} - {host[2].toFixed(2)}%
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {renderDropdown("Critical", hosts["CRITICAL HOSTS"])}
      {renderDropdown("Warning", hosts["WARNING HOSTS"])}
      {renderDropdown("Normal", hosts["NORMAL HOSTS:"])}
    </div>
  );
};

export default HostsDropdown;