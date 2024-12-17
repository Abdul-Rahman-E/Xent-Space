import React from "react";
import { Layout, Typography, Avatar, Button, Flex } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleCollapsed } from "../store/sidebarSlice";
import { IoMdNotifications, IoMdSearch } from "react-icons/io";

const { Header } = Layout;
const { Title } = Typography;

const Navbar = () => {
  const dispatch = useDispatch();
  const collapsed = useSelector((state) => state.sidebar.collapsed);
  const selectedKey = useSelector((state) => state.menu.selectedKey);

  const capitalizeFirstLetter = (str) => {
    return str
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handleToggle = () => {
    dispatch(toggleCollapsed());
  };

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
          {capitalizeFirstLetter(selectedKey)}
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
