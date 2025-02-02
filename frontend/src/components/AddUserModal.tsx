import React, { useState } from "react";
import { Modal, Button } from "@mui/material";
import { addUser } from "../api/adminApi";
import { toast } from "react-toastify";

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
  onAddUser: (newUser: {
    name: string;
    email: string;
    password: string;
    group: string;
  }) => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  open,
  onClose,
  onAddUser,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [group, setGroup] = useState("IT");

  const handleAddUser = async () => {
    try {
      const newUser = { name, email, password, group };
      const response = await addUser(newUser);
      console.log("response in add user", response);
      onAddUser(response);
      onClose();
      toast.success("User added successfully!");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div
        className="w-[100%] max-w-xl mx-auto mt-20 bg-white rounded-lg shadow-lg"
        style={{ outline: "none" }}
      >
        <div className="bg-[#043B64] -mt-3 p-1 rounded-t-lg">
          <h2 className="text-2xl font-semibold my-3 text-white text-center">
            Add New User
          </h2>
        </div>
        <form className="p-6">
          <div className="space-y-4">
            {/* Name Field */}
            <div className="w-full">
              <label
                className="block text-sm text-gunmetalgray mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-body text-body text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email Field */}
            <div className="w-full">
              <label
                className="block text-sm text-gunmetalgray mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-body text-body text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-full">
              <label
                className="block text-sm text-gunmetalgray mb-2"
                htmlFor="email"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-body text-body text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Department Dropdown */}
            <div className="w-full">
              <label
                className="block text-sm text-gunmetalgray mb-2"
                htmlFor="department"
              >
                Department
              </label>
              <select
                id="department"
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                className="w-full p-2 border border-body text-body text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="IT">IT</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Guarantee">Guarantee</option>
              </select>
            </div>
          </div>

          <div className="mt-4 text-center">
            <Button
              variant="contained"
              onClick={handleAddUser} // Trigger the API call
              className="bg-[#043B64] hover:bg-cornflowerblue text-white py-2 px-4 rounded-md"
            >
              Add User
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddUserModal;
