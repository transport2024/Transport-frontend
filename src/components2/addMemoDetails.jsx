import { Button, Form, Input, Select, Skeleton,Table } from "antd";
import axios from "axios";
import { get } from "lodash";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

function AddMemoDetails() {
  const [form] = Form.useForm();
  const [memoDetails, setMemoDetails] = useState([]);
  const [searched, setSearched] = useState([]);
  const [id, setId] = useState([]);
  const location = useLocation();
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/api/memo`
      );

      setMemoDetails(get(result, "data.message"));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setId(location.pathname.split("/")[2]);
    setFilterData(
      memoDetails.filter((res) => {
        return res._id === id;
      })
    );

    form.setFieldsValue(filterData[0]);
  }, [id, memoDetails]);
    
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    ];
    


  return (
    <div className="pt-24 pl-[5vw]">
      <Skeleton loading={loading}>
        <Form
          className="grid grid-cols-3 gap-x-[5vw]"
          layout="vertical"
          form={form}
        >
          <Form.Item
            label={<p className="!text-[16px] font-semibold">Memo/GC No</p>}
            name="gcno"
            rules={[
              {
                required: true,
                message: "Please input your memogc!",
              },
            ]}
          >
            <Input type="number" size="large" />
          </Form.Item>
          <Form.Item
            label={<p className="!text-[16px] font-semibold">Date</p>}
            name="date"
            rules={[
              {
                required: true,
                message: "Please input your date!",
              },
            ]}
          >
            <Input type="date" size="large" />
          </Form.Item>

          <Form.Item
            name="vehicleno"
            label={<p className="!text-[16px] font-semibold">Vehicle No</p>}
          >
            <Select placeholder="Select vehicle no" size="large">
              {/* {vehicle.map((res, i) => {
                return ( */}
              {/* <Select.Option value={res.vehicleno} key={i}>
                    {res.vehicleno}
                  </Select.Option> */}
              {/* );
              })} */}
              <Select.Option>Hello</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label={<p className="!text-[16px] font-semibold"> Driver Name</p>}
            name="drivername"
            rules={[
              {
                required: true,
                message: "Please input your drivername",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>
          <Form.Item
            label={<p className="!text-[16px] font-semibold">DriverPhone</p>}
            name="driverphone"
            rules={[
              {
                required: true,
                message: "Please input your driver phone!",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>

          <Form.Item
            label={
              <p className="!text-[16px] font-semibold">
                Driver Whatsapp Number
              </p>
            }
            name="driverwhatsappno"
            rules={[
              {
                required: true,
                message: "Please input your driver whtasapp number!",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>

          <div className="flex items-end gap-2 justify-end">
            <Form.Item>
              <Button
                htmlType="submit"
                className="bg-red-500 w-[130px] float-left text-white font-bold tracking-wider"
              >
                Clear
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                className="bg-green-600 w-[130px] float-left text-white font-bold tracking-wider"
              >
                Save
              </Button>
            </Form.Item>
          </div>
        </Form>
          </Skeleton>
          <div className="">
              <p className="bg-[--secondary-color] w-40 float-right text-white text-center rounded-md  h-8 pt-1">Add Memo Details</p>
          <Table dataSource={dataSource} columns={columns}/>
          </div>
         
    </div>
  );
}

export default AddMemoDetails;
