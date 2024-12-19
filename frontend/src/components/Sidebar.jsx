import React, { useEffect } from "react";
import { Layout, Menu, Typography, Button } from "antd";
import { RxDashboard } from "react-icons/rx";

import { IoBarChartSharp } from "react-icons/io5";
import { BsPeopleFill } from "react-icons/bs";
import { AiTwotoneAppstore } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { selectItem } from "../store/menuSlice";
import { toggleCollapsed } from "../store/sidebarSlice";
import { CloseOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

const { Sider } = Layout;
const { Title } = Typography;

const menuItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <RxDashboard />,
    path: "/",
  },
  {
    key: "employee-management",
    label: "Employee Management",
    path: "/employee-management",
    icon: <BsPeopleFill />,
    children: [
      { key: "onboarding", label: "Onboarding", path: "/onboarding" },
      { key: "employees", label: "Employees", path: "/employees" },
    ],
  },
  {
    key: "tools",
    label: "Tools",
    path: "/tools",
    icon: <AiTwotoneAppstore />,
    children: [
      { key: "calendar", label: "Calendar", path: "/calendar" },
      { key: "kanban", label: "Kanban", path: "/kanban" },
    ],
  },
  {
    key: "charts",
    label: "Charts",
    path: "/charts",
    icon: <IoBarChartSharp />,
    children: [
      { key: "line", label: "Line", path: "/charts/line" },
      { key: "area", label: "Area", path: "/charts/area" },
      { key: "bar", label: "Bar", path: "/charts/bar" },
    ],
  },
];

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const collapsed = useSelector((state) => state.sidebar.collapsed);
  const selectedKey = useSelector((state) => state.menu.selectedKey);

  useEffect(() => {
    const currentPath = location.pathname;
    console.log("currentPath: " + currentPath);

    // Find the selected menu item based on the current path
    const selectedMenu = menuItems.find((item) => {
      // If the item has children, check for any match with the children
      if (item.children) {
        // Check if the current path starts with any child path
        return item.children.some((child) =>
          currentPath.startsWith(child.path)
        );
      }

      // For top-level items (like Dashboard), match only exact path
      return currentPath === item.path;
    });

    // If a menu is found, select it
    if (selectedMenu) {
      dispatch(selectItem(selectedMenu.key));
    }
  }, [location.pathname, dispatch]);

  const handleMenuClick = (e) => {
    const clickedItem = menuItems.find((item) => item.key === e.key);

    if (clickedItem?.path) {
      navigate(clickedItem.path);
    }

    dispatch(selectItem(e.key));
  };

  return (
    <Sider
      className="xent-space sider-mobile"
      collapsible
      collapsed={collapsed}
      onCollapse={() => dispatch(toggleCollapsed())}
      collapsedWidth="0"
      trigger={null}
      breakpoint="md"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        background: "#001529",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 20px",
        }}
      >
        <Title
          level={4}
          style={{
            color: "white",
            margin: 0,
            fontSize: "24px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {collapsed ? "X" : "Xent Space"}
        </Title>

        {!collapsed && (
          <Button
            className="close-btn"
            type="text"
            icon={
              <CloseOutlined style={{ color: "white", fontSize: "18px" }} />
            }
            onClick={() => dispatch(toggleCollapsed())}
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
            }}
          />
        )}
      </div>

      <Menu
        theme="dark"
        selectedKeys={[selectedKey]}
        onClick={handleMenuClick}
        mode="inline"
        items={menuItems.map((item) => ({
          key: item.key,
          label: item.label,
          icon: item.icon,
          children: item.children
            ? item.children.map((subItem) => ({
                key: subItem.key,
                label: subItem.label,
                onClick: (e) => {
                  handleMenuClick(e);
                  navigate(subItem.path);
                },
              }))
            : undefined,
        }))}
      />
    </Sider>
  );
};

export default Sidebar;
