import React from "react";
import "./Footer.css";

/** Fix footer position and sizing in css */
/** Add social media icons for leftFooter */

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>Our social media:</h4>
        <p>INSTAGRAM: @tenetwatches</p>
        <p>TWITTER: @tenetwatches</p>
        <p>VSCO: @tenetwatches</p>
        <p>LINKEDIN: Tenet Co.</p>
      </div>
      <div className="midFooter">
        <h1>TENET</h1>
        <h4>For all things time.</h4>
        <p>Copyrights 2021 &copy; Tenet</p>
      </div>
      <div className="rightFooter">
        <h4>Contact us!</h4>
        <p>EMAIL: tenetwatches@gmail.com</p>
        <p>TELEPHONE: +1 412-278-5539</p>
        <p>LOCATION: 1730 Cameo St</p>
        <p>Hartsville, South Carolina (SC),</p>
      </div>
    </footer>
  );
};

export default Footer;
