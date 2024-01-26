import { NavLink } from "react-router-dom";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import PersonIcon from "@mui/icons-material/Person";
import PatternRoundedIcon from "@mui/icons-material/PatternRounded";
import ReportRoundedIcon from "@mui/icons-material/ReportRounded";
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
    "/",
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
        "/consignor"
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
        "/consignee"
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
        "/vehicle"
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
        "/location"
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
        "/broker"
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
        "/memo"
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
        "/report"
      ),
    ]
  ),
];
