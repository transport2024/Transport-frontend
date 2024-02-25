import { Button, Form, Input, Modal, notification } from "antd";
import axios from "axios";
import { get } from "lodash";
import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const [otp, setOtp] = useState("");
  const [open, setOpen] = useState("");
  const [otpError, setOtpError] = useState("");
  const [validOtp,setValidOtp] = useState("");
  const navigate=useNavigate()

  const validateEmail = (_, value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value && !emailRegex.test(value)) {
      return Promise.reject('Invalid email address');
    }

    return Promise.resolve();
  };
  const handleFinish = () => {};
  const handleOtpSubmit=()=>{

  }
  return (
    <div className="flex flex-col items-center w-screen pt-28 bg-blue-900 bg-opacity-70 backdrop-blur-md  h-screen gap-20">
      <div className="flex flex-col gap-5 pt-8">
        <h1 className="md:text-4xl text-white text-shadow-md decoration-clone text-center">
          Enter Your Register Email
        </h1>
        <Form
          className="w-[300px] md:w-[400px] rounded-md py-10 bg-white bg-opacity-70  shadow-md flex flex-col items-center justify-center"
          layout="vertical"
          onFinish={handleFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true }, { validator: validateEmail }]}
            className="w-[80%]"
            label={"Enter Your Email"}
          >
            <Input
              type="email"
              placeholder="Enter your email..."
              size="large"
            />
          </Form.Item>
          <Form.Item className="w-[80%]">
            <Button
              htmlType="submit"
              className="w-[100%] bg-blue-900 text-white h-[40px] hover:!text-white hover:scale-105 duration-700"
            >
              Request Otp
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Modal
        open={open}
        width={400}
        footer={false}
        onCancel={() => {
          setOpen(!open);
          setOtpError("");
        }}
      >
        <div className="py-4">
          <div className="flex items-center justify-center">
            <label
              htmlFor="otp"
              className="font-semibold text-lg pb-2 text-slate-700 text-center pl-2"
            >
              Enter your OTP
            </label>
          </div>
          <div className="pt-4 flex items-center justify-center">
            <OtpInput
              value={otp}
              onChange={(value) => {
                setOtp(value);
              }}
              numInputs={6}
              otpType="number"
              disabled={false}
              autoFocus
              renderInput={(props) => (
                <input {...props} className="border-2 h-8 !w-8 ml-2" />
              )}
            />
          </div>
          {/* {otpError && (
          <div className="text-red-500 text-sm text-center mt-2">
            {otpError}
          </div>
        )} */}
          <div className="flex items-center justify-center mt-4">
            <Button
              type="primary"
              onClick={handleOtpSubmit}
              className="bg-[--bg-color] w-[80%] text-white h-[40px] hover:!text-white hover:scale-105 duration-700"
            >
              Submit OTP
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ForgotPassword;
