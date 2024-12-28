import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-600 text-white py-4">
      <div className="container mx-auto flex justify-center items-center text-center">
        <p className="text-sm">
          &copy; {currentYear} | All rights reserved by Register.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
