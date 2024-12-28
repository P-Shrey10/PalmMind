import React, { useState } from 'react'

const SettingDetail: React.FC = () => {
  const [theme, setTheme] = useState('light')
  const [language, setLanguage] = useState('en')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  
  const handleSave = () => {
    // Handle saving the settings (theme, language, role, password)
    console.log({ theme, language, role, password })
  }

  return (
    <div className="min-h-[83vh] max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6 flex justify-center">Settings</h1>
      
      {/* Theme Settings */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Theme</label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      {/* Language Settings */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Language</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="en">English</option>
          <option value="ne">Nepali</option>
        </select>
      </div>

      {/* Role Settings */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="sadmin">Sadmin</option>
        </select>
      </div>

      {/* Password Change */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Change Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter new password"
          className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Save Settings
      </button>
    </div>
  )
}

export default SettingDetail
