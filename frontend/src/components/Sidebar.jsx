import React from "react";
import { Layout, Menu, Typography, Button } from "antd";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineAccountBalance } from "react-icons/md";
import { IoBarChartSharp } from "react-icons/io5";
import { BsPeopleFill } from "react-icons/bs";
import { AiTwotoneAppstore } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { selectItem } from "../store/menuSlice";
import { toggleCollapsed } from "../store/sidebarSlice";
import { CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

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
    icon: <BsPeopleFill />,
    children: [
      { key: "employees", label: "Employees", path: "/employees" },
      { key: "salary", label: "Salary", path: "/orders" },
    ],
  },
  {
    key: "tools",
    label: "Tools",
    icon: <AiTwotoneAppstore />,
    children: [
      { key: "calendar", label: "Calendar", path: "/calendar" },
      { key: "kanban", label: "Kanban", path: "/kanban" },
    ],
  },
  {
    key: "charts",
    label: "Charts",
    icon: <IoBarChartSharp />,
    children: [
      { key: "line", label: "Line", path: "/charts/line" },
      { key: "area", label: "Area", path: "/charts/area" },
      { key: "bar", label: "Bar", path: "/charts/bar" },
    ],
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const collapsed = useSelector((state) => state.sidebar.collapsed);
  const selectedKey = useSelector((state) => state.menu.selectedKey);

  const handleMenuClick = (e) => {
    const clickedItem = menuItems.find((item) => item.key === e.key);

    if (clickedItem?.path) {
      navigate(clickedItem.path);
    }

    dispatch(selectItem(e.key));
  };

  const handleCollapse = () => {
    dispatch(toggleCollapsed());
  };

  return (
    <Sider
      className="xent-space sider-mobile"
      collapsible
      collapsed={collapsed}
      onCollapse={handleCollapse}
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
            onClick={handleCollapse}
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
