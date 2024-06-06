import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

function AdminLayout() {
    const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <div className="h-screen w-screen flex flex-col justify-between">
        <Header sidebarToggler={setSidebarVisible} />
        <div className="flex h-full w-full">
            {sidebarVisible && <Sidebar />}
            <div className="h-full w-full">
                <Outlet />
            </div>
        </div>
        <Footer />
    </div>
  );
}

export default AdminLayout;