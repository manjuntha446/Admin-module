import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen w-full bg-[#1C4452] text-white">
      {/* Sidebar */}
      <AppSidebar />

      {/* Main Dashboard Area */}
      <main
        className="
          flex-1 
          ml-64               /* pushes dashboard to the right of sidebar */
          bg-[#DDEEF3]        /* top accent light area */
          rounded-tl-3xl      /* smooth top-left corner transition */
          p-8                 /* padding around content */
          overflow-auto 
          transition-all 
          duration-300 
          text-gray-900       /* text visible on light background */
        "
      >
        {/* Header background curve effect */}
        <div className="absolute top-0 left-64 right-0 h-48 bg-[#DDEEF3] rounded-b-[4rem] shadow-md -z-10"></div>

        {/* Content container */}
        <div className="relative z-10 bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
