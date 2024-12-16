import React, { useState } from "react";
import { Layout, Menu, Typography } from "antd";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineAccountBalance } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";

const { Sider } = Layout;
const { Title } = Typography;

const menuItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <RxDashboard />,
  },
  {
    key: "accounts",
    label: "Accounts",
    icon: <MdOutlineAccountBalance />,
    children: [
      { key: "statement", label: "Statement" },
      { key: "bill", label: "Bill" },
      {
        key: "insights",
        label: "Insights",
        children: [
          { key: "business", label: "Business" },
          { key: "finance", label: "Finance" },
        ],
      },
    ],
  },
  { type: "divider" },
  {
    key: "employee-management",
    label: "Employee Management",
    icon: <BsPeopleFill />,
    children: [
      { key: "roles-permissions", label: "Roles & Permissions" },
      { key: "operations", label: "Operations" },
      { key: "salary", label: "Salary" },
      { key: "report", label: "Report" },
    ],
  },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
      <div style={{ padding: "15px 10px", textAlign: "center" }}>
        <Title
          level={4}
          style={{
            color: "white",
            margin: 0,
            fontSize: collapsed ? "24px" : "20px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            transition: "all 0.3s ease",
          }}
        >
          {collapsed ? "X" : "Xent Space"}
        </Title>
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={["dashboard"]}
        mode="inline"
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;