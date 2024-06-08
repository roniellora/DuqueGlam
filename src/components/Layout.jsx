import PropTypes from "prop-types";
import "../styles/Layout.css";
import { AdminMenu, UserMenu } from "../Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  //EMPLOYEE MENU
  const EmployeeMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointment",
      path: "/appointment",
      icon: "fa-solid fa-list",
    },
    {
      name: "Profile",
      path: `/employee/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];
  //EMPLOYEE MENU

  //render menu list
  const SidebarMenu = user?.isAdmin
    ? AdminMenu
    : user?.isEmployee
    ? EmployeeMenu
    : UserMenu;

  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout successful");
    navigate("/login");
    window.location.reload();
  };

  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>DuqueGlam</h6>
              <hr />
            </div>
            <div className="menu">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <>
                    <div
                      key={menu.name}
                      className={`menu-item ${isActive && "active"}`}
                    >
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
              <div className={`menu-item`} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content">
                <Badge
                  count={user?.notifications.lenght}
                  className="mr-4"
                  onClick={() => {
                    navigate("/notifications");
                  }}
                >
                  <i
                    className="fa-solid fa-bell"
                    style={{ cursor: "pointer" }}
                  ></i>
                </Badge>
                <Link to="/profile">{user?.name}</Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
