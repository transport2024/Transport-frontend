import React, { useState } from "react";
import { Button, Form, Image, Input, notification } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowRightAltOutlined } from "@mui/icons-material";

function LoginAndRegistration() {
  const [login, setLogin] = useState(true);
  const [inputs, setInputs] = useState({});
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const handleChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_URL}/api/user/${login ? "login" : "register"}`,
        inputs,
        { withCredentials: true }
      );
      login
        ? notification.success({ message: "Lets Continue" })
        : notification.success({
            message: "Registered successfully lets login",
          });

      if (result && login) {
        navigate("/");
        localStorage.setItem("token", "login");
      }
      if (!login) {
        setLogin(true);
      }
      form.setFieldsValue([]);
    } catch (err) {
      notification.error({ message: err?.response?.data });
    }
  };

  return (
    <div className="relative">
    <div className="absolute inset-0 bg-gradient-to-r from-slate-400 via-slate-700 to-white-200 opacity-50 blur-sm">
      </div>
      <div
        className="flex items-center justify-center  w-screen h-screen bg-center bg-cover bg-no-repeat"
        style={{
          backdropFilter: "blur(10)",
          backgroundImage:
            "url('https://img.freepik.com/premium-photo/transport-logistic-manager-checking-control-logistic-network-distribution-customer_34200-864.jpg?w=1060')",
        }}
      >
        <div className="h-[55vh] w-[90vw] md:w-[80vw] lg:w-[65vw] xl:w-[55vw] px-3 flex rounded-tl-[120px] rounded-br-[120px] rounded-tr-[10px] rounded-bl-[10px] items-center justify-center shadow-md bg-white/70 backdrop-blur-sm">
          <div className="w-[50%] pt-5 h-[100%] hidden md:flex border-r-2 border-r-[primary-color]  flex-col items-center px-5 gap-5 md:text-2xl lg:text-3xl">
            <Image
              preview={false}
              width={160}
              src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
            />
            <div>
              <p> Your journey begins with a single step</p>
              <p className="text-lg pt-8 float-right">Login to continue</p>
            </div>
          </div>
          <div className="md:w-[50%] py-5 flex items-center justify-center">
            <Form
              form={form}
              className="p-4"
              layout="vertical"
            >
              <h1 className="text-2xl text-blue-900 font-medium pb-2 text-center">
                Rock Fort Login
              </h1>
              <Form.Item
                label="UserName"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input
                  type="text"
                  size="large"
                  name="username"
                  onChange={handleChange}
                  placeholder="Enter username..."
                />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter password..."
                />
              </Form.Item>

              <Form.Item>
                <Button
                  htmlType="submit"
                  className="w-full"
                  size="large"
                  onClick={handleSubmit}
                >
                  {login ? "Login" : "Register"}
                </Button>
              </Form.Item>
              {login ? (
                <p
                  className="text-blue-500 font-medium cursor-pointer text-center"
                  onClick={() => {
                    setLogin(false);
                  }}
                >
                  New user?<span className="p-1">Register here</span>
                </p>
              ) : (
                <p
                  className="text-blue-500 font-medium cursor-pointer text-center"
                  onClick={() => {
                    setLogin(true);
                  }}
                >
                  Already Login User?<span className="p-1">Login here</span>
                </p>
              )}
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginAndRegistration;
