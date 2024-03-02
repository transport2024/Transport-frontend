/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Avatar, Button, Drawer, Image, Menu, Modal } from "antd";
import { items } from "./helper/menu";
import { useLocation, useNavigate } from "react-router-dom";
import { get, isEmpty } from "lodash";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import Cookies from "js-cookie";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import logo from "./assets/logo.png";
import { useDispatch } from "react-redux";
import { changeUservalues } from "./Redux/userSlice";

function SideNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [menu, setMenu] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("token");
    dispatch(changeUservalues(null));
    if (
      isEmpty(Cookies.get("token")) ||
      isEmpty(localStorage.getItem("token"))
    ) {
      navigate("/login");
    }
  };

  const onClick = (e) => {
    setMenu(false);
  };

  useEffect(() => {
    isEmpty(localStorage.getItem("token")) && navigate("/login");
  }, []);

  return (
    <div className="md:w-[18vw] md:h-screen  !z-50  ">
      <div className="md:w-[18vw] md:h-screen  lg:border-r lg:border-slate-200 fixed ">
        <div
          id="sidenavbar"
          className="text-center !z-50 flex text-xl border-b border-gray-100 font-bold items-center  justify-around  text-[--primary-color]    h-[9vh]   w-screen py-3"
        >
          <h1 className="text-[12px] lg:text-xl xsm:pl-1 lg:pl-0 flex items-center justify-center">
            {/* <Image src={logo} className="!w-14 !h-8 lg:!w-24 lg:!h-12" /> */}
          </h1>
          <div className="hidden lg:block">
            {location.pathname.split("/")[1]
              ? location.pathname.split("/")[1]
              : "Dashboard"}
          </div>
          <div className="text-[12px] lg:text-xl">
            Vehicle Transport Management System
          </div>
          <div className="mr-4 cursor-pointer">
            <div className="hidden lg:block">
              <Avatar
                style={{
                  backgroundColor: "blue",
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
              id="btn"
              onClick={handleLogout}
              className=" flex items-center justify-center px-2 text-white lg:w-[4vw] lg:px-0 lg:h-[4vh] rounded-md "
            >
              Yes
            </button>
            <button
              id="btn"
              onClick={() => {
                setModal(!modal);
              }}
              className="bg-[--secondary-color] flex items-center justify-center text-white px-2 lg:px-0 lg:w-[3vw] lg:h-[4vh] rounded-md "
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
          className="absolute top-[9vh] !bg-[--secondary-color]"
        >
          <Menu
            items={items}
            defaultSelectedKeys={get(location, "pathname", "/")}
            mode="inline"
            onClick={onClick}
            defaultOpenKeys={["sub1", "sub2", "sub3"]}
            className="absolute left-0 top-0"
          ></Menu>

          <p
            className="absolute font-semibold left-0 bottom-28 border-t-2 w-[100%] border-slate-200 pt-3 text-center cursor-pointer"
            onClick={() => {
              setModal(!modal);
            }}
          >
            <Button className="text-white hover:scale-110 hover:bg-white  hover:text-black duration-1000">
              <LogoutIcon className="!text-[18px] text-center" />
              Logout
            </Button>
          </p>
        </Drawer>
        <div className="h-screen hidden bg-gradient-to-r from-red-700 via-red-600 to-yellow-700  lg:flex flex-col items-center">
          <Menu
            items={items}
            defaultSelectedKeys={get(location, "pathname", "/")}
            mode="inline"
            onClick={onClick}
            defaultOpenKeys={["sub1", "sub2", "sub3"]}
          ></Menu>

          <p
            className="absolute   font-semibold bottom-8 border-t w-[100%] border-slate-200 pt-3 text-center cursor-pointer"
            onClick={() => {
              setModal(!modal);
            }}
          >
            <Button className="text-white hover:scale-110 hover:bg-white hover:text-black duration-1000">
              <LogoutIcon className="!text-[18px] text-center" />
              Logout
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SideNavbar;
