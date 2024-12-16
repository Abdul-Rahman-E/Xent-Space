import React, { useState } from "react";
import { Layout, Menu } from "antd";
import Sidebar from "./components/Sidebar";

const { Header, Content, Footer } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "#deecfa",
            transition: "all 0.3s ease",
            width: "100%",
          }}
        ></Header>
        <Content style={{ margin: "16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: "calc(100vh - 64px - 16px)", // Adjust for Header and Footer
              background: "#fff",
            }}
          >
            Content goes here
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Footer content here</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
