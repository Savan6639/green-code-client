import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";


function HomeLayout() {
  return (
    <div className="h-screen w-screen flex flex-col">
        <Header />
        <div className="h-full">
            <Outlet />
        </div>
        <Footer />
    </div>
  );
}

export default HomeLayout;