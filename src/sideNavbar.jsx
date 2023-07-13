import React, { useEffect } from "react";
import { Menu } from "antd";
import { items } from "./helper/menu";
import { useLocation, useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";
import LogoutIcon from '@mui/icons-material/Logout';
function SideNavbar() {
    const location = useLocation();
    const navigate=useNavigate()
    
    const handleLogout = () => {
        localStorage.removeItem("name")
        if (isEmpty(localStorage.getItem("name"))) {
            navigate("/admin")
        }
        
    }

  return (
    <div className="w-[14vw] h-screen ">
      <div className="w-[14vw] h-screen border-r border-gray-700 shadow fixed bg-[--primary-color]">
      <div className="text-center flex text-xl border-b border-gray-700 font-bold items-center shadow justify-between pl-[6vw] pr-[3vw]  !bg-[--primary-color] h-[10vh]   w-screen py-3">
        <h1>Logo</h1>
        {/* <div>{location.pathname.split("/")[1]}</div> */}
        <div>Vehicle Transport Management System</div>
        <div onClick={handleLogout} className="!text-[12px] text-white px-3 !bg-[--secondary-color]  pb-1 cursor-pointer text-center rounded-md"><LogoutIcon className="!text-[16px]"/>Logout</div>
      </div>
      <Menu items={items} mode="inline"></Menu>
    </div>
    </div>
  );
}

export default SideNavbar;