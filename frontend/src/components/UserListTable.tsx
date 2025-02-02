/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import SearchBar from "./Searchbar";
import { deleteUser, getAllUsers } from "../api/adminApi";
import { Button } from "@mui/material";
import { Edit, Trash2 } from "lucide-react";
import EditUserModal from "./EditUserModal";
import AddUserModal from "./AddUserModal";

interface User {
  _id?: string;
  name: string;
  email: string;
  group: string;
}

const UserListTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data.users);
      } catch (err) {
        setError("Failed to fetch users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId: string) => {
    try {
      await deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((u) => u._id !== userId));
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.group.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleAddUser = (newUser: {
    name: string;
    email: string;
    group: string;
  }) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const handleSaveUser = (updatedUser: User) => {
    setUsers((prevList) =>
      prevList.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      )
    );
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="text-left text-2xl mb-10 font-bold">User Management</div>
      <div className="flex justify-end mb-4">
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#043B64",
            "&:hover": { backgroundColor: "#032D4F" },
            color: "white",
            textTransform: "none",
            borderRadius: "8px",
            padding: "8px 16px",
            fontSize: "16px",
            marginRight: "5px",
          }}
          onClick={() => setIsAddModalOpen(true)}
        >
          Add User
        </Button>
      </div>
      <div>
        <SearchBar
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          placeholder="Search by name or email"
        />
      </div>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-8">
        <table className="w-full text-sm text-left text-body">
          <thead className="text-xs uppercase bg-lightgray text-gunmetalgray">
            <tr>
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={index}
                className="border-b text-sm border-lightgray hover:bg-lightblue"
              >
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.group}</td>
                <td className="px-6 py-4">
                  <Button color="primary" onClick={() => handleViewUser(user)}>
                    <Edit className="mr-2" />
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => user._id && handleDelete(user._id)}
                    size="small"
                  >
                    <Trash2 className="mr-2" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditUserModal
        open={isEditModalOpen}
        user={selectedUser}
        onSave={handleSaveUser}
        onClose={handleCloseEditModal}
      />

      <AddUserModal
        open={isAddModalOpen}
        onClose={handleCloseAddModal}
        onAddUser={handleAddUser}
      />
    </>
  );
};

export default UserListTable;
