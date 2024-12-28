import React, { useState } from "react";
import { Menu, Dropdown, Input, Avatar } from "antd";
import { AiOutlineSearch } from "react-icons/ai";
import {
  FaRegUser,
  FaSignOutAlt,
  FaTachometerAlt,
  FaCog,
  FaDatabase,
  FaPlusSquare,
} from "react-icons/fa";
import logo from "../assets/logo.png";

interface User {
  name: string;
  email: string;
  avatarUrl: string;
}

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [user] = useState<User>({
    name: "John Doe",
    email: "johndoe@example.com",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const menu = (
    <Menu className="shadow-lg rounded-lg">
      <Menu.Item
        key="profile"
        className="flex items-center space-x-3 px-4 py-2"
      >
        <FaRegUser className="text-gray-600 text-lg" />
        <span className="text-gray-800 font-medium">{user.name}</span>
      </Menu.Item>
      <Menu.Item key="email" className="flex items-center space-x-3 px-4 py-2">
        <FaRegUser className="text-gray-600 text-lg" />
        <span className="text-gray-600">{user.email}</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="logout"
        className="flex items-center space-x-3 px-4 py-2 text-red-500 hover:bg-red-50"
      >
        <FaSignOutAlt className="text-lg" />
        <a href="/logout" className="font-medium">
          Logout
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
      <div className="flex items-center space-x-6">
        <img src={logo} alt="Logo" className="h-12" />
        <nav className="flex space-x-6 text-sm font-medium">
          <a
            href="/"
            className="flex items-center space-x-2 hover:text-yellow-400"
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </a>
          <a
            href="/register"
            className="flex items-center space-x-2 hover:text-yellow-400"
          >
            <FaPlusSquare />
            <span>Register</span>
          </a>
          <a
            href="/workspace"
            className="flex items-center space-x-2 hover:text-yellow-400"
          >
            <FaCog />
            <span>Workspace</span>
          </a>
          <a
            href="/data-management"
            className="flex items-center space-x-2 hover:text-yellow-400"
          >
            <FaDatabase />
            <span>Data Management</span>
          </a>
          <a
            href="/settings"
            className="flex items-center space-x-2 hover:text-yellow-400"
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
        <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
          <div className="flex items-center cursor-pointer">
            <Avatar
              src={user.avatarUrl}
              className="mr-2 border-2 border-white"
            />
            <span className="hidden sm:block font-medium">{user.name}</span>
          </div>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
