import React, { useState } from "react";
import { Button, Form, Input, InputNumber } from "antd";
import myimage from "../assets/1.jpg";
function LoginAndRegistration() {
  const [register, setRegiser] = useState(false);
  const [login, setLogin] = useState(true);
  return (
    <div
      className="flex items-center justify-center w-screen h-screen bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${myimage})`,
      }}
    >
      <div className="xl:w-[25vw] xsm:w-[80vw] py-5 bg-white/70 backdrop-blur-sm rounded-md  flex items-center justify-center">
        <Form className="xsm:w-[80vw] xl:w-[20vw]    p-4" layout="vertical">
          <h1 className="text-3xl text-blue-500 font-medium pb-2 text-center">Admin Login</h1>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input type="email" size="large" />
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
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" className="w-full" size="large">
              {login ? "Login" : "Register"}
            </Button>
          </Form.Item>
          {login ? (
            <p
              className="text-blue-500 font-medium cursor-pointer text-center"
              onClick={() => {
                  setRegiser(true);
                  setLogin(false)
              }}
            >
             
              New user?<span className="p-1">Register here</span>
            </p>
          ) : (
            <p className="text-blue-500 font-medium cursor-pointer text-center"  onClick={() => {
                setRegiser(false);
                setLogin(true)
            }}>
              Already Login User?<span className="p-1">Login here</span>
            </p>
          )}
        </Form>
      </div>
    </div>
  );
}

export default LoginAndRegistration;
