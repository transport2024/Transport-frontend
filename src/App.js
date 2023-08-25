import "./App.css";
import Consignor from "./components/consignor";
import SideNavbar from "./sideNavbar";
import LoginAndRegistration from "./Authentication/LoginAndRegistration";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Rootlayouts from "./layouts/rootlayout";
import Consignee from "./components/consignee";
import Vehicle from "./components/vehicle";
import Location from "./components/location";
import Broker from "./components/broker";
import Memo from "./components2/memoentry";
import Report from "./components3/report";
import Dashboard from "./Dashboard";
import VehicleBills from "./Bills/VehicleBills";
import AddMemoDetails from "./components2/addMemoDetails";
import Ccv from "./allBills/ccv";
import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "antd";
import {hideOpen,showOpen} from "./Redux/NetworkSlice"
import {useDispatch,useSelector} from "react-redux"
import SignalCellularConnectedNoInternet0BarIcon from "@mui/icons-material/SignalCellularConnectedNoInternet0Bar";
import SignalCellularConnectedNoInternet4BarIcon from "@mui/icons-material/SignalCellularConnectedNoInternet4Bar";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Rootlayouts />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="consignor" element={<Consignor />} />
        <Route path="consignee" element={<Consignee />} />
        <Route path="vehicle" element={<Vehicle />} />
        <Route path="location" element={<Location />} />
        <Route path="broker" element={<Broker />} />
        <Route path="memo" element={<Memo />} />
        <Route path="editmemo/:id" element={<AddMemoDetails />} />
        <Route path="report" element={<Report />} />
        <Route path="admin" element={<LoginAndRegistration />} />
      </Route>
      <Route path="vehicleBill/:id" element={<VehicleBills />} />
      <Route path="ccv/:id" element={<Ccv />} />
    </>
  )
);

function App() {
  const dispatch=useDispatch()
  const open=useSelector((state) => state.network.isOpen)
  console.log(open,"rbruh")

  return (
    <div>
      <RouterProvider router={router} />
      <Modal open={open} footer={false} closable={false} width={400}>
        <div className="text-md">
          <p className="font-bold flex items-center gap-1">
            No Internet
            <SignalCellularConnectedNoInternet4BarIcon
              fontSize="14px"
              className="text-yellow-500"
            />
          </p>
          <div className="pl-10">
            <span className="font-bold">Try:</span>
            <ul className="list-disc">
              <li>Check Your internet Connection</li>
              <li>Reconnet your Wifi</li>
              <button
                className="bg-blue-500 px-3 rounded-md py-1 text-white text-[12px] ml-[15vw]"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Refresh
              </button>
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
