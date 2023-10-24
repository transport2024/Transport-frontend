import { NavLink } from "react-router-dom";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import PersonIcon from "@mui/icons-material/Person";
import Man4Icon from "@mui/icons-material/Man4";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PlaceIcon from "@mui/icons-material/Place";
import AttributionIcon from "@mui/icons-material/Attribution";
import InputIcon from "@mui/icons-material/Input";
import MemoryIcon from "@mui/icons-material/Memory";
import PatternRoundedIcon from "@mui/icons-material/PatternRounded";
import DetailsRoundedIcon from "@mui/icons-material/DetailsRounded";
import ReportRoundedIcon from "@mui/icons-material/ReportRounded";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

export const items = [
  getItem(
    <NavLink
      to="/"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        paddingLeft: "2px",
        gap: 2,
      }}
    >
      <DashboardCustomizeIcon fontSize="10px" />
      DashBoard
    </NavLink>,
    "0",
    ""
  ),
  getItem(
    <p
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        gap: 2,
      }}
    >
      <PersonIcon fontSize="10px" />
      Master
    </p>,
    "sub1",
    "",
    [
      getItem(
        <NavLink
          to="consignor"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            gap: 2,
          }}
        >
          Consignor
        </NavLink>,
        "1"
      ),
      getItem(
        <NavLink
          to="consignee"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            gap: 2,
          }}
        >
          Consignee
        </NavLink>,
        "2"
      ),
      getItem(
        <NavLink
          to="vehicle"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            gap: 2,
          }}
        >
          Vehicle
        </NavLink>,
        "3"
      ),
      getItem(
        <NavLink
          to="location"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            gap: 2,
          }}
        >
          Location
        </NavLink>,
        "4"
      ),
      getItem(
        <NavLink
          to="broker"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            gap: 2,
          }}
        >
          Broker
        </NavLink>,
        "5"
      ),
    ]
  ),
  getItem(
    <h1
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        gap: 2,
      }}
    >
      <PatternRoundedIcon fontSize="10px" />
      Entry
    </h1>,
    "sub2",
    "",
    [
      getItem(
        <NavLink
          to="memo"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            gap: 2,
          }}
        >
          Memo Entry
        </NavLink>,
        "6"
      ),
    ]
  ),

  getItem(
    <h1
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        gap: 2,
      }}
    >
      <ReportRoundedIcon fontSize="10px" />
      Reports
    </h1>,
    "sub3",
    "",
    [
      getItem(
        <NavLink
          to="report"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            gap: 2,
          }}
        >
          Report Entry
        </NavLink>,
        "7"
      ),
    ]
  ),
];
