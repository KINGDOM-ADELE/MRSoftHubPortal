// Footer.js
import React from "react";

function Footer() {
  return (
    <footer style={footerStyle}>
      <p>&copy; {new Date().getFullYear()} M-R International</p>
    </footer>
  );
}

const footerStyle = {
  backgroundColor: "#333",
  color: "#fff",
  textAlign: "center",
  padding: "10px",
};

export default Footer;
