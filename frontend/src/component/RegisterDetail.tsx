import { useState, useEffect, useMemo } from "react";
import {
  FaDownload,
  FaEye,
  FaEdit,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import axios from "axios";

type DataType = {
  _id: string;
  sn: number;
  firstName: string;
  lastName: string;
};

const RegisterDetail = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<DataType | null>(null);
  const [users, setUsers] = useState<DataType[]>([]);
  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      const data = response.data;
      const formattedData = data.map((user: any, index: number) => ({
        _id: user._id,
        sn: index + 1,
        firstName: user.firstName,
        lastName: user.lastName,
      }));
      setUsers(formattedData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleEdit = async () => {
    try {
      await axios.put(
        `http://localhost:5000/users/${selectedRow?._id}`,
        editForm
      );
      setShowEditModal(false);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/users/${selectedRow?._id}`);
      setShowDeleteModal(false);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const filteredData = useMemo(() => {
    return users.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [users, searchTerm]);

  const paginatedData = useMemo(() => {
    const start = currentPage * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const pageCount = Math.ceil(filteredData.length / pageSize);

  const exportToXlsx = () => {
    const headers = ["SN", "First Name", "Last Name"];
    const XlsxData = [
      headers.join(","),
      ...filteredData.map((row) =>
        [row.sn, row.firstName, row.lastName].join(",")
      ),
    ].join("\n");

    const blob = new Blob([XlsxData], { type: "text/xlsx" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "register-details.xlsx";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg">
        <div className="p-6 flex flex-col border-b">
          <h1 className="text-2xl font-bold text-gray-800">Register</h1>
          <p>
            Welcome to the Register Detail Page. You will find here all the user
            registered detail.
          </p>
        </div>

        <div className="p-6">
          <div className="flex flex-col justify-end md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 max-w-sm px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(0);
              }}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[10, 15, 20].map((size) => (
                <option key={size} value={size}>
                  {size} per page
                </option>
              ))}
            </select>
            <button
              onClick={exportToXlsx}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <FaDownload className="text-sm" /> Download
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    SN
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    First Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Last Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedData.map((row) => (
                  <tr key={row._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {row.sn}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {row.firstName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {row.lastName}
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        onClick={() => {
                          setSelectedRow(row);
                          setShowViewModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEye className="text-lg" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedRow(row);
                          setEditForm({
                            firstName: row.firstName,
                            lastName: row.lastName,
                          });
                          setShowEditModal(true);
                        }}
                        className="text-yellow-600 hover:text-yellow-800"
                      >
                        <FaEdit className="text-lg" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedRow(row);
                          setShowDeleteModal(true);
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash className="text-lg" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                disabled={currentPage === 0}
                className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-50"
              >
                <FaChevronLeft className="text-gray-600" />
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage + 1} of {pageCount}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(pageCount - 1, prev + 1))
                }
                disabled={currentPage === pageCount - 1}
                className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-50"
              >
                <FaChevronRight className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {showViewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">View Details</h2>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            {selectedRow && (
              <div className="space-y-3">
                <p className="text-gray-600">
                  <span className="font-semibold">First Name:</span>{" "}
                  {selectedRow.firstName}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Last Name:</span>{" "}
                  {selectedRow.lastName}
                </p>
              </div>
            )}
            <button
              onClick={() => setShowViewModal(false)}
              className="mt-6 w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      )}

      
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold">Edit User</h2>
            <input
              type="text"
              value={editForm.firstName}
              onChange={(e) =>
                setEditForm({ ...editForm, firstName: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              value={editForm.lastName}
              onChange={(e) =>
                setEditForm({ ...editForm, lastName: e.target.value })
              }
              className="w-full p-2 border rounded mt-2"
            />
            <button
              onClick={handleEdit}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold">Delete User</h2>
            <p>Are you sure you want to delete this user?</p>
            <button
              onClick={handleDelete}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterDetail;
