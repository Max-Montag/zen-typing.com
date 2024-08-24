import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex justify-evenly md:justify-center gap-x-2 sm:gap-x-8 md:gap-x-16 lg:gap-x-24 xl:justify-evenly text-sm md:text-md p-3 w-full border-t">
      <Link to="/impressum" className="text-gray-700 hover:underline ">
        Impressum
      </Link>
    </footer>
  );
};

export default Footer;
