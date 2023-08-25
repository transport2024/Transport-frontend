import React, { useEffect } from "react";
import { Avatar, Drawer, Image, Menu, Modal } from "antd";
import { items } from "./helper/menu";
import { useLocation, useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import Cookies from "js-cookie";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import logo from "./assets/logo.png";

function SideNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [menu, setMenu] = useState(false);

  const handleLogout = () => {
    Cookies.remove("token");
    if (
      isEmpty(Cookies.get("token")) ||
      isEmpty(localStorage.getItem("token"))
    ) {
      navigate("/admin");
    }
  };

  const onClick = (e) => {
    setCurrent(e.key);
    setMenu(false)
  };

  useEffect(() => {
    const selectedKey = localStorage.getItem("selectedKey");
    if (selectedKey !== null) {
      setCurrent(selectedKey);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedKey", current);
  }, [current, location, localStorage.getItem("selectedKey")]);

  // Save the selected key to localStorage when it changes
  useEffect(() => {
    isEmpty(localStorage.getItem("token")) && navigate("/admin");
  }, []);

  return (
    <div className="w-[14vw] h-screen !z-50 bg-[--secondary-color] ">
      <div className="w-[14vw] h-screen  lg:shadow fixed bg-[--primary-color]">
        <div className="text-center !z-50 flex text-xl border-b border-gray-100 font-bold items-center  justify-around  text-[--primary-color]   !bg-[--secondary-color] h-[9vh]   w-screen py-3">
          <h1 className="text-[12px] lg:text-xl xsm:pl-1 lg:pl-0 flex items-center justify-center">
            <Image src={logo} className="!w-14 !h-8 lg:!w-24 lg:!h-12"/>
          </h1>
          <div className="hidden lg:block">
            {location.pathname.split("/")[1]
              ? location.pathname.split("/")[1]
              : "Dashboard"}
          </div>
          <div className="text-[12px] lg:text-xl">
            Vehicle Transport Management System
          </div>
          <div
            onMouseOver={() => {
              setOpen(true);
            }}
            onMouseLeave={() => {
              setOpen(false);
            }}
            className="mr-4 cursor-pointer"
          >
            <div className="hidden lg:block">
              <Avatar
                style={{
                  backgroundColor: "red",
                }}
                size="default"
              >
                T
              </Avatar>
            </div>
            <div className="lg:hidden">
              <Avatar
                style={{
                  backgroundColor: "red",
                }}
                size="small"
              >
                T
              </Avatar>
            </div>
            <div
              className={`absolute   h-[4.5vh] w-[6vw] top-4 left-[91vw]  border-b bg-white rounded-md text-[--secondary-color] flex items-center justify-center ${
                open ? "flex" : "hidden"
              }`}
            >
              <button
                className="text-[16px] "
                onClick={() => {
                  setModal(!modal);
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <Modal
          open={modal}
          footer={false}
          closable={false}
          width={400}
          className="!py-40"
        >
          <p className="text-slate-600 font-bold">
            Are You sure Want to Logout ?
          </p>
          <div className="flex gap-2 items-end justify-end  pt-2">
            <button
              onClick={handleLogout}
              className="bg-[--secondary-color] flex items-center justify-center text-white w-[4vw] h-[4vh] rounded-md "
            >
              Yes
            </button>
            <button
              onClick={() => {
                setModal(!modal);
              }}
              className="bg-[--secondary-color] flex items-center justify-center text-white w-[3vw] h-[4vh] rounded-md "
            >
              no
            </button>
          </div>
        </Modal>
        <p
          className="lg:hidden bg-white border-b border-slate-200 w-[100vw] pl-1"
          onClick={() => {
            setMenu(true);
          }}
          
        >
          <MenuOpenIcon />
        </p>
        <Drawer
          open={menu}
          width={200}
          destroyOnClose
          footer={false}
          placement="left"
          closeIcon={false}
          onClose={() => {
            setMenu(false);
          }}
          className="absolute top-[9vh]"
        >
          <Menu
            items={items}
            defaultSelectedKeys={[localStorage.getItem("selectedKey")]}
            defaultOpenKeys={["sub1", "sub2", "sub3"]}
            mode="inline"
            onClick={onClick}
            className="absolute left-0 top-0"
          ></Menu>
        </Drawer>
        <Menu
          items={items}
          defaultSelectedKeys={[localStorage.getItem("selectedKey")]}
          defaultOpenKeys={["sub1", "sub2", "sub3"]}
          mode="inline"
          onClick={onClick}
          className="hidden lg:flex lg:flex-col"
        ></Menu>
      </div>
    </div>
  );
}

export default SideNavbar;
