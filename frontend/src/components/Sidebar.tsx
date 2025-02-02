import React from "react";
import logo from "/logo.webp";
import { NavLink } from "react-router-dom";
// import LogoutIcon from "@mui/icons-material/Logout";

const Sidebar: React.FC = () => {
  const menuItems = [
    { name: "Dashboard", path: "/admin" },
    { name: "User List", path: "/admin/users" },
    { name: "Transaction List", path: "/admin/transactions" },
    { name: "Video Management", path: "/admin/videos" },
    { name: "Top Receivers List", path: "/admin/receivers" },
  ];

  return (
    <div
      className="fixed top-0 left-0 h-screen w-[290px] text-white flex flex-col"
      style={{ backgroundColor: "#043B64" }}
    >
      {/* Logo */}
      <div className="flex ml-5 mt-7 mb-10">
        <img src={logo} alt="Company Logo" className="h-10 w-auto" />
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col space-y-2">
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }: { isActive: boolean })=>
                `block py-2 pl-5 pr-0  rounded-sm text-left ${
                  isActive
                    ? "bg-white text-midnightblue rounded-r-sm"
                    : "hover:bg-white hover:text-midnightblue"
                }`
              }
            >
              {item.name}
            </NavLink>
            {index < menuItems.length - 1 && (
              <hr className="border-t-2 border-opacity-50 border-meta-9 " />
            )}{" "}
            {/* Line between items */}
          </React.Fragment>
        ))}
      </nav>

      {/* Logout Button */}
      <button className="flex items-center mt-3 py-2 pl-5 rounded-lg text-left text-white hover:bg-white hover:text-midnightblue">
        {/* <LogoutIcon className="h-5 w-5 text-left mr-2" /> */}
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
