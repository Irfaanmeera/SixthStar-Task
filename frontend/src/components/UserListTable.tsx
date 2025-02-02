/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import SearchBar from "./Searchbar"; 
import { getAllUsers } from "../api/adminApi";
import { Modal, Button } from "@mui/material"; 
interface User {
  name: string;
  email: string;
  mobile: string;
  status: string;
  referredBy: string;
  businessIncome: string;
  businessPromoters: string;
  receivePayment: string;
}

const UserListTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState(""); 
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedUser, setSelectedUser] = useState<User | null>(null); 

  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        console.log(data.users);
        setUsers(data.users);
      } catch (err) {
        setError("Failed to fetch users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on the search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle the "View" button click
  const handleViewUser = (user: User) => {
    setSelectedUser(user); 
    setIsModalOpen(true); 
  };

  const handlePaymentChange = (newValue: string) => {
    setSelectedUser((selectedUser) => {
      if (!selectedUser) return null;
      return {
        ...selectedUser,
        receivePayment: newValue, 
      };
    });
  };
  const handleStatusChange = (newValue: string) => {
    setSelectedUser((selectedUser) => {
      if (!selectedUser) return null; 
      return {
        ...selectedUser,
        status: newValue, 
      };
    });
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null); 
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="text-xl font-semibold text-left mb-4">User List</div>
      <SearchBar onChange={(e) => setSearchTerm(e.target.value)} />{" "}

      {/* SearchBar component */}
      <table className="w-full rounded-lg border border-slategray border-opacity-20 shadow-lg">
        <thead className="text-left text-sm bg-gray-blue border-slategray border-opacity-20 shadow-2">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Status</th>
            <th className="p-2">View</th>
          </tr>
        </thead>
        <tbody className="bg-gray-blue border-t border-b border-slategray border-opacity-20">
          {filteredUsers.map((user, index) => (
            <tr
              key={index}
              className="text-left text-sm border border-slategray border-opacity-20 shadow-1"
            >
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.mobile}</td>
              <td className="p-2">{user.status}</td>
              <td className="p-2 ml-2">
                <button
                  className="text-white px-4 py-1 rounded-lg"
                  style={{ backgroundColor: "#043B64" }}
                  onClick={() => handleViewUser(user)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal to display user details */}
      {isModalOpen && selectedUser && (
        <Modal open={isModalOpen} onClose={handleCloseModal}>
          <div
            className="w-[100%] max-w-3xl mx-auto mt-20 bg-white rounded-lg shadow-lg"
            style={{ outline: "none" }}
          >
            <div className="bg-[#043B64] -mt-3 p-1 rounded-t-lg">
              <h2 className="text-2xl font-semibold my-3 text-white text-center">
                View & Edit List
              </h2>
            </div>
            <form>
              <div className="flex flex-wrap justify-between gap-6 p-6">
                {/* Left Column */}
                <div className="w-full md:w-[50%]">
                  <label className="block mb-2 text-gunmetalgray text-sm">
                    Name
                    <input
                      type="text"
                      value={selectedUser?.name || ""}
                      readOnly
                      className="mt-1 w-full p-2 border border-body text-body text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </label>
                  <label className="block mb-2 text-gunmetalgray text-sm">
                    Phone
                    <input
                      type="text"
                      value={selectedUser?.mobile || ""}
                      readOnly
                      className="mt-1 w-full p-2 border border-body text-body rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </label>
                  <label className="block mb-2 text-gunmetalgray text-sm">
                    Business Promoters
                    <input
                      type="number"
                      value={selectedUser?.businessPromoters || ""}
                      readOnly
                      className="mt-1 w-full p-2 border border-body text-body text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </label>
                  <label className="block mb-2 text-gunmetalgray text-sm">
                    Status
                    <select
                      value={selectedUser?.status || ""}
                      onChange={(e) => handleStatusChange(e.target.value)} 
                      className="mt-1 w-full p-2 border border-body text-body text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </label>
                </div>

                {/* Right Column */}
                <div className="w-full md:w-[45%]">
                  <label className="block mb-2 text-gunmetalgray text-sm">
                    Email
                    <input
                      type="email"
                      value={selectedUser?.email || ""}
                      className="mt-1 w-full p-2 border border-body text-body text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </label>
                  <label className="block mb-2 text-gunmetalgray text-sm">
                    Business Income
                    <input
                      type="number"
                      value={selectedUser?.businessIncome || ""}
                      className="mt-1 w-full p-2 border border-body text-body text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </label>
                  <label className="block mb-2 text-gunmetalgray text-sm">
                    Referred By
                    <input
                      type="number"
                      value={selectedUser?.referredBy || ""}
                      className="mt-1 w-full p-2 border border-body text-body text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </label>

                  <label className="block mb-2 text-gunmetalgray text-sm">
                    Receive Payment
                    <select
                      value={selectedUser?.receivePayment || ""}
                      onChange={(e) => handlePaymentChange(e.target.value)} // Add a function to handle dropdown changes, if necessary
                      className="mt-1 w-full p-2 border border-body text-body text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      <option value="Accept">Accept</option>
                      <option value="Reject">Reject</option>
                    </select>
                  </label>
                </div>
              </div>
            </form>
            <div className="mt-1 mb-2 p-2 text-center">
              <Button
                variant="contained"
                onClick={handleCloseModal}
                className=" bg-[#043B64] hover:bg-cornflowerblue text-white py-2 px-4 rounded-md"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default UserListTable;
