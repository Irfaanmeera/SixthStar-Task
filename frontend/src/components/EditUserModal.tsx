import React, { useState, useEffect } from "react";
import { Modal, Button } from "@mui/material";
import { updateUser } from "../api/adminApi";
import { toast } from "react-toastify";

interface User {
  _id: string;
  name: string;
  email: string;
  group: string;
}

interface EditUserModalProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  open,
  user,
  onClose,
  onSave,
}) => {
  const [updatedUser, setUpdatedUser] = useState<User | null>(null);

  useEffect(() => {
    setUpdatedUser(user);
  }, [user]);

  if (!updatedUser) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUpdatedUser((prev) =>
      prev ? { ...prev, [e.target.name]: e.target.value } : null
    );
  };

  const handleUpdateUser = async () => {
    console.log(updateUser, "updated user");
    if (!updatedUser) return;

    try {
      const updatedData = await updateUser(updatedUser);

      console.log(updatedData, "updated data");
      onSave(updatedData);
      toast.success("User added successfully!");
      onClose();
    } catch (err) {
      console.error("Update failed:", err);
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
            Update User
          </h2>
        </div>
        <form>
          <div className="flex flex-wrap justify-between gap-6 p-6">
            <div className="w-full md:w-[100%]">
              <label className="block mb-2 text-gunmetalgray text-sm">
                Name
                <input
                  type="text"
                  name="name"
                  value={updatedUser.name}
                  readOnly
                  className="mt-1 w-full p-2 border border-body text-body text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <label className="block mb-2 text-gunmetalgray text-sm">
                Email
                <input
                  type="email"
                  name="email"
                  value={updatedUser.email}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 border border-body text-body text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <label className="block mb-2 text-gunmetalgray text-sm">
                Department
                <select
                  name="group"
                  value={updatedUser.group}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 border border-body text-body text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="IT">IT</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Guarantee">Guarantee</option>
                </select>
              </label>
            </div>
          </div>
        </form>
        <div className="mt-1 mb-6 p-2 text-center">
          <Button
            variant="contained"
            onClick={handleUpdateUser}
            className=" bg-[#043B64] hover:bg-cornflowerblue text-white py-2 px-4 rounded-md"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditUserModal;
