import React, { useEffect } from "react";
import { Layout, Typography, Avatar, Button, Flex } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleCollapsed } from "../store/sidebarSlice";
import { IoMdNotifications, IoMdSearch } from "react-icons/io";
import { useLocation } from "react-router-dom";

const { Header } = Layout;
const { Title } = Typography;

const menuItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/",
  },
  {
    key: "employee-management",
    label: "Employee Management",
    path: "/employee-management",
    children: [
      { key: "onboarding", label: "Onboarding", path: "/onboarding" },
      { key: "employees", label: "Employees", path: "/employees" },
    ],
  },
  {
    key: "tools",
    label: "Tools",
    path: "/tools",
    children: [
      { key: "calendar", label: "Calendar", path: "/calendar" },
      { key: "kanban", label: "Kanban", path: "/kanban" },
    ],
  },
  {
    key: "charts",
    label: "Charts",
    path: "/charts",
    children: [
      { key: "line", label: "Line", path: "/charts/line" },
      { key: "area", label: "Area", path: "/charts/area" },
      { key: "bar", label: "Bar", path: "/charts/bar" },
    ],
  },
];

const Navbar = () => {
  const dispatch = useDispatch();
  const collapsed = useSelector((state) => state.sidebar.collapsed);
  const selectedKey = useSelector((state) => state.menu.selectedKey);
  const location = useLocation();

  useEffect(() => {}, [location.pathname]);

  const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    return str
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handleToggle = () => {
    dispatch(toggleCollapsed());
  };

  const currentPath = location.pathname;

  const selectedMenu = menuItems.find((item) => {
    if (currentPath === item.path) {
      return true;
    }
    if (item.children) {
      return item.children.some((child) => currentPath.startsWith(child.path));
    }
    return false;
  });

  const title =
    selectedMenu && selectedMenu.children
      ? selectedMenu.children.find((child) =>
          currentPath.startsWith(child.path)
        )?.label
      : selectedMenu?.label;

  return (
    <Header
      className="header-mobile"
      style={{
        width: "100%",
        zIndex: 999,
        background: "#F8FAFC",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={handleToggle}
          style={{ fontSize: "18px" }}
        />
        <Title className="navbar-title" style={{ margin: 0, fontSize: "20px" }}>
          {capitalizeFirstLetter(title)}
        </Title>
      </div>

      <Flex align="center" gap="1rem">
        <Button size="large" shape="circle" icon={<IoMdSearch />} />
        <Button size="large" shape="circle" icon={<IoMdNotifications />} />
        <Avatar size="large" src="https://bit.ly/4fnWZDt" />
      </Flex>
    </Header>
  );
};

export default Navbar;
