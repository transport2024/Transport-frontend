import React from "react";
import SideNavbar from "../sideNavbar";
import LoginAndRegistration from "../Authentication/LoginAndRegistration";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Rootlayouts() {

  const location=useLocation()


  return (
    <div className="flex">
      {location.pathname.split('/')[1].includes("admin")?"":<SideNavbar />}
      <Outlet />
    </div>
  );
}

export default Rootlayouts;