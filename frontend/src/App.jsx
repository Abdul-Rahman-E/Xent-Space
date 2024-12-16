import React from "react";
import "./App.css";
import { Layout, Flex, Menu, theme, Typography } from "antd";
import Sidebar from "./components/Sidebar";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
    </Layout>
  );
}

export default App;
