import React from "react";
import SideNavbar from "../sideNavbar";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Rootlayouts() {
  const locaion = useLocation();

  return (
    <div className="flex">
      {locaion.pathname.split("/")[1].includes("login") ||
      locaion.pathname.split("/")[1].includes("register") ||
      locaion.pathname.split("/")[1].includes("forgot_password") ||
      locaion.pathname.split("/")[1].includes("password_reset") ? (
        ""
      ) : (
        <SideNavbar />
      )}
      <Outlet />
    </div>
  );
}

export default Rootlayouts;
