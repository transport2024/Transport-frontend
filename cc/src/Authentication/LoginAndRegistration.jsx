import React, { useState } from "react";
import { Button, Form, Input, InputNumber, notification } from "antd";
import myimage from "../assets/1.jpg";
import axios from "axios"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {isEmpty} from "lodash"

function LoginAndRegistration() {
  const [register, setRegiser] = useState(false);
  const [login, setLogin] = useState(true);
  const [inputs, setInputs] = useState({});

  const navigate=useNavigate()

  const handleChange = (event) => {
    event.preventDefault()
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }
  
 
  const handleSubmit = async () => {
    // try {
    //   await axios.post("http://localhost:4001/api/user/register", inputs, { withCredentials: true });
    //   notification.success({ message: "Registration successful" });
    // } catch (err) {
    //   console.log(err);
    //   notification.error({ message: "User Already Exists" });
    // }

    localStorage.setItem("name", inputs.username)
    
    console.log(localStorage.getItem("name"))
     
    if (!isEmpty(localStorage.getItem("name"))) {
    navigate('/')
    }   
 
  };
  
  useEffect(() => { 
    
  })

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
            label="UserName"
            name="email"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input type="text" size="large" name="username" onChange={handleChange}/>
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
            <Input.Password size="large" name="password" onChange={handleChange}/>
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" className="w-full" size="large" onClick={handleSubmit}>
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
