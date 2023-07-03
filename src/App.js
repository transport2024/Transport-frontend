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
import Vehicle from "./components/vehicle"


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Rootlayouts />}>
      <Route path="consignor" element={<Consignor />} />
      <Route path="consignee" element={<Consignee />} />
      <Route path="vehicle" element={<Vehicle />} />
       <Route path="admin" element={<LoginAndRegistration />} />
      {/*<Route path="connect3" element={<Connect3 />} />
      <Route path="connect4" element={<Connect4 />} />
      <Route path="connect5" element={<Connect5 />} />
      <Route path="connect6" element={<Connect6 />} /> */}
    </Route>
  )
);




function App() {
  
   
  return <RouterProvider router={router} />;
}

export default App;