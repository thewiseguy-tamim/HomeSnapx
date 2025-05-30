// import { useState } from "react";
// import Navbar from "../components/Dashboard/Navbar";
// import Sidebar from "../components/Dashboard/Sidebar";
// import { Outlet } from "react-router";

// const DashboardLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <div className="drawer lg:drawer-open min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
//       {/* Mobile drawer checkbox */}
//       <input
//         id="drawer-toggle"
//         type="checkbox"
//         className="drawer-toggle"
//         checked={sidebarOpen}
//         onChange={toggleSidebar}
//       />

//       {/* Page content */}
//       <div className="drawer-content flex flex-col min-h-screen">
//         {/* Navbar */}
//         <Navbar sidebarOpen={sidebarOpen} />

//         {/* Main content */}
//         <main className="flex-1 p-8 lg:p-10 text-xl">
//           <div className="max-w-8xl mx-auto">
//             <div className="dashboard-content">
//               <Outlet />
//             </div>
//           </div>
//         </main>
//       </div>

//       {/* Sidebar */}
//       <Sidebar />
//     </div>
//   );
// };

// export default DashboardLayout;

import { useState } from "react";
import Navbar from "../components/Dashboard/Navbar";
import Sidebar from "../components/Dashboard/Sidebar";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <input
        id="drawer-toggle"
        type="checkbox"
        className="drawer-toggle"
        checked={sidebarOpen}
        onChange={toggleSidebar}
      />
      <div className="drawer-content flex flex-col min-h-screen">
        <Navbar sidebarOpen={sidebarOpen} />
        <main className="flex-1 p-8 lg:p-10 text-xl">
          <div className="max-w-8xl mx-auto">
            <div className="dashboard-content">
              <Outlet key={window.location.pathname} />
            </div>
          </div>
        </main>
      </div>
      <Sidebar />
    </div>
  );
};

export default DashboardLayout;