import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";

export function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const sidebarOffsetClass = isSidebarOpen ? "ml-64" : "ml-[4.75rem]";
  const curveLeftClass = isSidebarOpen ? "left-64" : "left-[4.75rem]";

  return (
    <div className="flex min-h-screen w-full bg-[#1C4452] text-white">
      {/* Sidebar */}
      <AppSidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen((prev) => !prev)}
      />

      {/* Main Dashboard Area */}
      <main
        className={`
          flex-1 
          ${sidebarOffsetClass}      /* pushes dashboard to the right of sidebar */
          bg-[#DDEEF3]               /* top accent light area */
          rounded-tl-3xl             /* smooth top-left corner transition */
          p-8                        /* padding around content */
          overflow-auto 
          transition-all 
          duration-300 
          text-gray-900              /* text visible on light background */
        `}
      >
        {/* Header background curve effect */}
        <div
          className={`absolute top-0 ${curveLeftClass} right-0 h-48 bg-[#DDEEF3] rounded-b-[4rem] shadow-md -z-10`}
        ></div>

        {/* Content container */}
        <div className="relative z-10 bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
