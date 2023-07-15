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
    <div className="w-[14vw] h-screen bg-[--secondary-color]">
      <div className="w-[14vw] h-screen border-r border-gray-100  fixed bg-[--primary-color]">
      <div className="text-center flex text-xl border-b border-gray-100 font-bold items-center  justify-around  text-[--primary-color]   !bg-[--secondary-color] h-[10vh]   w-screen py-3">
        <h1>Logo</h1>
        <div>{location.pathname.split("/")[1]}</div>
        <div>Vehicle Transport Management System</div>
        <div onClick={handleLogout} className="!text-[15px]  px-3 !bg-[--primary-color] !text-[--secondary-color]  pb-1 cursor-pointer text-center rounded-md"><LogoutIcon className="!text-[16px]"/>Logout</div>
      </div>
      <Menu items={items} mode="inline"></Menu>
    </div>
    </div>
  );
}

export default SideNavbar;