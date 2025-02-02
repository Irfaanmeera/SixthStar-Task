import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-1 flex-col ml-5 overflow-y-auto overflow-x-hidden bg-white border rounded-lg border-transparent ">
        <main className="w-[calc(130vw-240px)] ">
          <div className="w-full max-w-[960px] mx-auto bg-white p-2 md:p-6 lg:p-6 xl:p-6">
          
            
            <div className="w-full">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
