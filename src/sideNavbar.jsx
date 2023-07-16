import React, { useEffect } from "react";
import { Menu } from "antd";
import { items } from "./helper/menu";
import { useLocation, useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";

function SideNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("name");
    if (isEmpty(localStorage.getItem("name"))) {
      navigate("/admin");
    }
  };

  const onClick = (e) => {
    setCurrent(e.key);
  };

  // Load the selected key from localStorage when the component mounts
  useEffect(() => {
    const selectedKey = localStorage.getItem("selectedKey");
    if (selectedKey) {
      setCurrent(selectedKey);
    }
  }, []);

  // Save the selected key to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("selectedKey", current);
  }, [current]);

  return (
    <div className="w-[14vw] h-screen bg-[--secondary-color]">
      <div className="w-[14vw] h-screen border-r border-gray-100  fixed bg-[--primary-color]">
        <div className="text-center !z-40 flex text-xl border-b border-gray-100 font-bold items-center  justify-around  text-[--primary-color]   !bg-[--secondary-color] h-[10vh]   w-screen py-3">
          <h1>Logo</h1>
          <div>{location.pathname.split("/")[1]?location.pathname.split("/")[1]:"Dashboard"}</div>
          <div>Vehicle Transport Management System</div>
          <div
            onClick={handleLogout}
            className="!text-[15px]  px-3 !bg-[--primary-color] !text-[--secondary-color]  pb-1 cursor-pointer text-center rounded-md"
          >
            <LogoutIcon className="!text-[16px]" />Logout
          </div>
        </div>

        <Menu
          items={items}
          defaultSelectedKeys={[localStorage.getItem("selectedKey")]}
          defaultOpenKeys={['sub1','sub2','sub3']}
          mode="inline"
          onClick={onClick}
        ></Menu>
      </div>
    </div>
  );
}

export default SideNavbar;
