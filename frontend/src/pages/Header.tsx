import React, { useState } from "react";
import { Popover, Button, Input, Avatar } from "antd";
import { useCookies } from "react-cookie";
import { AiOutlineSearch } from "react-icons/ai";
import {
  FaTachometerAlt,
  FaCog,
  FaDatabase,
  FaPlusSquare,
} from "react-icons/fa";
import logo from "../assets/logo.png";

interface User {
  avatarUrl: string;
}

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [user] = useState<User>({
    avatarUrl: "https://i.pravatar.cc/150?img=3",
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Use the cookies hook to manage cookies
  const [cookies, setCookie, removeCookie] = useCookies(["authToken"]);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleLogout = () => {
    removeCookie("authToken", { path: "/", sameSite: "lax" });
    localStorage.removeItem("user");
    sessionStorage.clear();
    window.location.href = "/login"; // Redirect to login
  };

  const handleCancel = () => {
    setPopoverOpen(false); // Close popover on cancel
  };

  const popoverContent = (
    <div className="flex space-x-4">
      <Button
        type="primary"
        onClick={handleLogout}
        className="flex items-center space-x-3 px-4 py-2"
      >
        Logout
      </Button>
      <Button
        onClick={handleCancel}
        className="flex items-center space-x-3 bg-red-500 text-white border-red-600 hover:bg-red-600"
      >
        Cancel
      </Button>
    </div>
  );

  return (
    <header className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg rounded-b-lg">
      <div className="flex items-center space-x-6">
        <img src={logo} alt="Logo" className="h-12" />
        <nav className="flex space-x-6 text-sm font-medium">
          <a
            href="/"
            className="flex items-center space-x-2 hover:text-yellow-400 transition duration-300"
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </a>
          <a
            href="/register"
            className="flex items-center space-x-2 hover:text-yellow-400 transition duration-300"
          >
            <FaPlusSquare />
            <span>Register</span>
          </a>
          <a
            href="/workspace"
            className="flex items-center space-x-2 hover:text-yellow-400 transition duration-300"
          >
            <FaCog />
            <span>Workspace</span>
          </a>
          <a
            href="/data-management"
            className="flex items-center space-x-2 hover:text-yellow-400 transition duration-300"
          >
            <FaDatabase />
            <span>Data Management</span>
          </a>
          <a
            href="/settings"
            className="flex items-center space-x-2 hover:text-yellow-400 transition duration-300"
          >
            <FaCog />
            <span>Settings</span>
          </a>
        </nav>
      </div>

      <div className="flex items-center space-x-6">
        <Input
          prefix={<AiOutlineSearch style={{ color: "rgba(0,0,0,0.5)" }} />}
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Quick Action..."
          className="w-60 rounded-full shadow-md"
        />
        <div className="flex flex-col items-center space-y-2">
          <Popover
            content={popoverContent}
            title="Logout Confirmation"
            open={popoverOpen}
            onOpenChange={(visible) => setPopoverOpen(visible)}
            trigger="click"
          >
            <Avatar
              src={user.avatarUrl}
              className="mr-2 border-2 border-white"
            />
          </Popover>
        </div>
      </div>
    </header>
  );
};

export default Header;
