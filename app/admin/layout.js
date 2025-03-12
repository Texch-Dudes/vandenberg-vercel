"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import "../../styles/admin.scss";
import Sidebar from "@/components/admin/Sidebar";
import TopBar from "@/components/admin/TopBar";
import SmoothScroll from "@/components/SmoothScroll/SmoothScroll";

const AdminPanelLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div>
      <TopBar toggleSidebar={toggleSidebar} />
      <div className="admin-panel">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div
          className={`admin-content py-5  ${
            sidebarOpen ? "with-sidebar" : "full-width"
          }`}
        >
          <SmoothScroll> {children}</SmoothScroll>
        </div>
      </div>
      {sidebarOpen && <div className="backdrop" onClick={toggleSidebar}></div>}
    </div>
  );
};

export default AdminPanelLayout;
