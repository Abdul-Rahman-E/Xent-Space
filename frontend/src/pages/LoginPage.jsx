import React from "react";
import { Layout, Form, Input, Button, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Password from "antd/es/input/Password";
import { useDispatch } from "react-redux";
import { loginAsync } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Title } = Typography;

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      await dispatch(loginAsync(values)).unwrap();
      message.success("Login successful");
      navigate("/");
    } catch (error) {
      message.error(error || "Invalid username or password");
    }
  };
  return (
    <Layout className="login-layout">
      <Content
        className="login-content"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          padding: "0 15px",
        }}
      >
        <div
          className="login-form-container"
          style={{
            background: "#fff",
            padding: "40px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "400px",
            textAlign: "center",
          }}
        >
          <Title
            level={2}
            style={{ color: "#333", fontSize: "2em", marginBottom: "20px" }}
          >
            Admin Login Panel
          </Title>
          <Form
            name="basic"
            style={{
              width: "100%",
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={handleLogin}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Username"
                style={{
                  borderRadius: "4px",
                  padding: "10px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                style={{
                  borderRadius: "4px",
                  padding: "10px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{
                  borderRadius: "4px",
                  backgroundColor: "#1890ff",
                  borderColor: "#1890ff",
                  padding: "10px",
                }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default LoginPage;
