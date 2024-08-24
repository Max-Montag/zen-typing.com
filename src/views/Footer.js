import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="fixed bottom-3 left-4">
      <Link to="/impressum" className="text-zinc-400 text-xs">
        Impressum
      </Link>
    </footer>
  );
};

export default Footer;
