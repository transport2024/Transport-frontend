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
import Broker from "./components/broker"
import Memo from "./components2/memoentry";
import Report from "./components3/report";
import Dashboard from "./Dashboard";
import VehicleBills from "./Bills/VehicleBills";
import AddMemoDetails from "./components2/addMemoDetails";
import Ccv from "./allBills/ccv";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
     <Route path="/" element={<Rootlayouts />}>
    <Route path="/" element={<Dashboard />}/>
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
      <Route path="vehicleBill" element={<VehicleBills />} />
      <Route path="ccv" element={<Ccv />} />
    </>
  )
);


function App() {
  return (
      <RouterProvider router={router} />   
  );
}

export default App;