import React, { useEffect } from "react";
import { Menu } from "antd";
import { items } from "./helper/menu";
import { useLocation, useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";
<<<<<<< HEAD


=======
import LogoutIcon from '@mui/icons-material/Logout';
>>>>>>> 94595cc9b0fc0db18d57dd8422b30bcbf25164e7
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
<<<<<<< HEAD
    <div className="w-[15vw] h-screen shadow">
      <div className="text-center flex text-xl font-bold items-center shadow justify-between px-[6vw]  !bg-white h-[10vh]  text-green-500 w-screen py-3">
      <h1> Logo </h1>    
=======
    <div className="w-[15vw]">
      <div className="w-[15vw] h-screen shadow fixed">
      <div className="text-center flex text-xl font-bold items-center shadow justify-between pl-[6vw] pr-[3vw]  !bg-white h-[10vh]  text-green-500 w-screen py-3">
        <h1>Logo</h1>
>>>>>>> 94595cc9b0fc0db18d57dd8422b30bcbf25164e7
        {/* <div>{location.pathname.split("/")[1]}</div> */}
        <div>Vehicle Transport Management System</div>
        <div onClick={handleLogout} className="!text-[16px] text-white bg-green-500 px-2 pb-1 cursor-pointer text-center rounded-md"><LogoutIcon className="!text-[16px]"/>Logout</div>
      </div>
      <Menu items={items} mode="inline"></Menu>
    </div>
    </div>
  );
}

export default SideNavbar;