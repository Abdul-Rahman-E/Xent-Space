import React, { useState, useEffect } from "react";
import { Card, Col, Row, Statistic, Spin, Button } from "antd";
import {
  LoadingOutlined,
  TeamOutlined,
  UserAddOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { StatisticCard } from "@ant-design/pro-components";
import RcResizeObserver from "rc-resize-observer";

const { Divider } = StatisticCard;

const Dashboard = () => {
  const [responsive, setResponsive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statistics, setStatistics] = useState([
    {
      title: "Total Employees",
      value: 120,
      color: "#3f8600",
      icon: <TeamOutlined />,
    },
    {
      title: "New Employees Today",
      value: 5,
      color: "#cf1322",
      icon: <UserAddOutlined />,
    },
    {
      title: "Active Employees",
      value: 100,
      color: "#1890ff",
      icon: <CheckCircleOutlined />,
    },
  ]);

  const fetchStatistics = () => {
    setLoading(true);
    setTimeout(() => {
      setStatistics([
        {
          title: "Total Employees",
          value: 130,
          color: "#3f8600",
          icon: <TeamOutlined />,
        },
        {
          title: "New Employees Today",
          value: 8,
          color: "#cf1322",
          icon: <UserAddOutlined />,
        },
        {
          title: "Active Employees",
          value: 110,
          color: "#1890ff",
          icon: <CheckCircleOutlined />,
        },
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div style={{ padding: "24px", background: "#f0f2f5", minHeight: "100vh" }}>
      <h2 style={{ marginBottom: "20px" }}>Company Dashboard</h2>

      <Button
        type="primary"
        onClick={fetchStatistics}
        disabled={loading}
        style={{ marginBottom: "16px" }}
      >
        {loading ? <Spin indicator={<LoadingOutlined />} /> : "Refresh Data"}
      </Button>

      <Row gutter={16}>
        {statistics.map((stat, index) => (
          <Col key={index} xs={24} sm={12} md={8}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                valueStyle={{ color: stat.color }}
                prefix={stat.icon}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={16} style={{ marginTop: 24 }}>
        <RcResizeObserver
          key="resize-observer"
          onResize={(offset) => {
            setResponsive(offset.width < 596);
          }}
        >
          <StatisticCard.Group direction={responsive ? "column" : "row"}>
            <StatisticCard
              statistic={{
                title: "Total Revenue",
                value: 6019865,
                suffix: "USD",
              }}
            />
            <Divider type={responsive ? "horizontal" : "vertical"} />
            <StatisticCard
              statistic={{
                title: "Tasks Completed",
                value: 120,
                description: <Statistic title="Proportion" value="61.5%" />,
              }}
              chart={
                <img
                  src="https://gw.alipayobjects.com/zos/alicdn/ShNDpDTik/huan.svg"
                  alt="percentage"
                  width="100%"
                />
              }
              chartPlacement="left"
            />
            <StatisticCard
              statistic={{
                title: "Tasks Pending",
                value: 75,
                description: <Statistic title="Proportion" value="38.5%" />,
              }}
              chart={
                <img
                  src="https://gw.alipayobjects.com/zos/alicdn/6YR18tCxJ/huanlv.svg"
                  alt="percentage"
                  width="100%"
                />
              }
              chartPlacement="left"
            />
          </StatisticCard.Group>
        </RcResizeObserver>
      </Row>
    </div>
  );
};

export default Dashboard;
