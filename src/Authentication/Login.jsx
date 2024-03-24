import React, { useEffect, useState } from "react";
import { Button, Form, Image, Input, notification } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {  isEmpty } from "lodash";
import { changeUservalues } from "../Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

function LoginAndRegistration() {
  const [login, setLogin] = useState(true);
  const [form] = Form.useForm();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleFinish = async (values) => {

    try {
      const result = await axios.post(
        `${process.env.REACT_APP_URL}/api/user/login`,
        values
      );
      localStorage.setItem("token", result?.data);
      fetchData();
      form.setFieldsValue([]);
      notification.success({message:"lets continue"})
    } catch (err) {
      // notification.error({ message: err?.response?.data });
      if (err.response.data.message !== "" || null || undefined) {
        notification.error({ message: err.response.data.message });
      }
    }
  };

  const fetchData = async () => {
    const token = localStorage.getItem("token");

    try {
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/api/user/validateToken`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(changeUservalues(result.data));
      if (!isEmpty(result.data)) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (user.user !== null) {
      navigate("/");
    }
  }, []);

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/80 to-black/70 opacity-50 blur-sm"></div>
      <div
        className="flex items-center justify-center  w-screen h-screen bg-center bg-cover bg-no-repeat"
        style={{
          backdropFilter: "blur(10)",
          backgroundImage:
            "url('https://img.freepik.com/premium-photo/transport-logistic-manager-checking-control-logistic-network-distribution-customer_34200-864.jpg?w=1060')",
        }}
      >
        <div className="min-h-[53vh]  w-[90vw] md:w-[80vw] lg:w-[65vw] xl:w-[55vw] px-3 flex rounded-tl-[60px] md:rounded-tl-[120px] rounded-br-[60px] md:rounded-br-[120px] rounded-tr-[10px] rounded-bl-[10px] items-center justify-center shadow-md bg-white/70 backdrop-blur-sm">
          <div className="w-[50%] pt-5 h-[100%] hidden md:flex border-r-2 border-r-[primary-color]  flex-col items-center px-5 gap-5 md:text-2xl lg:text-3xl">
            <Image
              preview={false}
              width={160}
              src="https://www.freeiconspng.com/uploads/user-login-icon-29.png"
            />
            <div id="text-color">
              <p> Your journey begins with a single step</p>
              <p className="text-lg pt-8 float-right">Login to continue</p>
            </div>
          </div>
          <div className="md:w-[50%] py-5 flex items-center justify-center">
            <Form
              onFinish={handleFinish}
              form={form}
              className="p-4"
              layout="vertical"
            >
              <h1 id="text-color" className=" text-xl md:text-2xl font-medium pb-2 text-center">
                Rock Fort Login
              </h1>
              <Form.Item
                label={<p id="text-color">Email</p>}
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
                  // onChange={handleChange}
                  placeholder="Enter username..."
                />
              </Form.Item>
              <Form.Item
                label={<p id="text-color">Password</p>}
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
                  // onChange={handleChange}
                  placeholder="Enter password..."
                />
              </Form.Item>

              <Form.Item>
                <Button  id="text-color" htmlType="submit" className="w-full" size="large">
                  Login
                </Button>
                <span
                id="text-color"
                  className=" cursor-pointer font-semibold pt-2"
                  onClick={() => {
                    navigate("/forgot_password");
                  }}
                >
                  forgot password?
                </span>
              </Form.Item>
              {login ? (
                <p
                  className=" font-medium cursor-pointer text-center"
                  onClick={() => {
                    setLogin(false);
                  }}
                  id="text-color"
                >
                  New user?
                  <span className="p-1" onClick={() => navigate("/register")}>
                    Register here
                  </span>
                </p>
              ) : (
                <p
                id="text-color"
                  className=" font-medium cursor-pointer text-center"
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
