import React from "react";
import SideNavbar from "../sideNavbar";
import LoginAndRegistration from "../Authentication/LoginAndRegistration";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Rootlayouts() {

  const locaion=useLocation()


  return (
    <div className="flex">
      {locaion.pathname.split('/')[1].includes("admin")?"":<SideNavbar />}
      <Outlet />
    </div>
  );
}

export default Rootlayouts;