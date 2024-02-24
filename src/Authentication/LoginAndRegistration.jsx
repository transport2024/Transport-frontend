import React, { useState } from "react";
import { Button, Form, Input, notification } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        `${process.env.REACT_APP_URL}/api/user/${login?"login":"register"}`,
        inputs,
        { withCredentials: true }
      );  
      login ? notification.success({ message: "Lets Continue" }) :
        notification.success({ message: "Registered successfully lets login" })
      
      if (result&&login) {
        navigate('/')
        localStorage.setItem("token","login")
       }
       if(!login){
        setLogin(true)
       }
       form.setFieldsValue([])
    } catch (err) {
    
      notification.error({message:err?.response?.data})
    }
  };

 

  return (
    <div
      className="flex items-center  justify-center bg-gradient-to-r from-blue-200 via-slate-300 to-white-200  w-screen h-screen bg-center bg-cover bg-no-repeat"
      
    >
    <div>
      
    </div>
      <div className="xl:w-[22vw] xsm:w-[80vw] py-5 border-2 bg-white/70 backdrop-blur-sm rounded-md shadow-sm flex items-center justify-center">
        <Form form={form} className="xsm:w-[80vw] xl:w-[20vw]    p-4" layout="vertical">
          <h1 className="text-3xl text-blue-500 font-medium pb-2 text-center">
            Admin Login
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
  );
}

export default LoginAndRegistration;
