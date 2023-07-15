import "./App.css";
import Consignor from "./components/consignor";
// import Connect2 from "./components/connect2";
// import Connect3 from "./components/connect3";
// import Connect4 from "./components/connect4";
// import Connect5 from "./components/connect5";
// import Connect6 from "./components/connect6";
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
import Memodetails from "./components2/memodetails";
import Report from "./components3/report";
import Dashboard from "./Dashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Rootlayouts />}>
    <Route path="/" element={<Dashboard />}/>
      <Route path="consignor" element={<Consignor />} />
      <Route path="consignee" element={<Consignee />} />
      <Route path="vehicle" element={<Vehicle />} />
      <Route path="location" element={<Location />} />
      <Route path="broker" element={<Broker />} />
      <Route path="memo" element={<Memo />} />
      <Route path="memodetails" element={<Memodetails />} />
      <Route path="report" element={<Report />} />
      <Route path="admin" element={<LoginAndRegistration />} />
    </Route>
  )
);


function App() {
  return (
      <RouterProvider router={router} />   
  );
}

export default App;