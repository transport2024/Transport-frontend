/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";

import {
  Table,
  Select,
  Form,
  Input,
  Button,
  notification,
  Drawer,
  Skeleton,
} from "antd";
import axios from "axios";
import { get } from "lodash";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import * as XLSX from "xlsx";
import { useSelector } from "react-redux";

function Consignee() {
  const [Consignee, setConsignee] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [updateId, setUpdateId] = useState("");
  const tableRef = useRef(null);
  const [searched, setSearched] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const userId=useSelector((state)=>state.user?.user?.userId)

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/api/consignee?search=${searched}&userId=${userId}`
      );
      setConsignee(get(result, "data.message"));
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(userId){
      fetchData();
    }
  }, [searched,userId]);

  const handleSubmit = async (value) => {
    if (updateId === "") {
      setLoadingBtn(true);
      try {
        const dataToSend={...value,userId}
        await axios.post(`${process.env.REACT_APP_URL}/api/consignee`, dataToSend);
        fetchData();
        notification.success({ message: "Consignee Added successfully" });
        setOpen(false);
        form.setFieldsValue([]);
      } catch (err) {
        notification.error({ message: "Something went wrong" });
      } finally {
        setLoadingBtn(false);
      }
    } else {
      setLoadingBtn(true);
      try {
        await axios.put(
          `${process.env.REACT_APP_URL}/api/consignee/${updateId}`,
          value
        );
        fetchData();
        notification.success({ message: "Consignee updated successfully" });
        setOpen(false);
        form.setFieldValue([]);
        setUpdateId("");
      } catch (err) {
        notification.error({ message: "Something went wrong" });
      } finally {
        setLoadingBtn(false);
      }
    }
  };

  const handleEdit = (value) => {
    form.setFieldsValue(value);
    setUpdateId(value._id);
    setOpen(true);
  };

  const handleDelete = async (value) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_URL}/api/consignee/${value._id}`
      );
      fetchData();
      notification.success({ message: "Deleted Successfully" });
    } catch (err) {
      notification.error({ message: "Something Went Wrong" });
    }
  };

  const searchers = [];

  Consignee &&
    Consignee.map((data) => {
      return searchers.push({ value: data.name }, { value: data.place });
    });

  const exportToExcel = () => {
    if (!exporting) {
      const dataForExport = Consignee.map((consignee) => ({
        name: consignee.name,
        address: consignee.address,
        contactPerson: consignee.contactPerson,
        gstno: consignee.gstno,
        mail: consignee.mail,
        phone: consignee.phone,
        place: consignee.place,
      }));

      const ws = XLSX.utils.json_to_sheet(dataForExport);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, "exported_data.xlsx");
      setExporting(false);
    }
  };

  const handleClear = () => {
    form.setFieldsValue([]);
  };

  const columns = [
    {
      title: <h1 className="!text-[12px] lg:!text-[16px]">Name</h1>,
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <div className="text-[10px] lg:!text-[16px]">{text}</div>
      ),
    },

    {
      title: <h1 className="!text-[12px] lg:!text-[16px]">Address</h1>,
      dataIndex: "address",
      key: "address",
      render: (text) => (
        <div className="text-[10px] lg:!text-[16px]">{text}</div>
      ),
    },
    {
      title: <h1 className="!text-[12px] lg:!text-[16px]">Place</h1>,
      dataIndex: "place",
      key: "place",
      render: (text) => (
        <div className="text-[10px] lg:!text-[16px]">{text}</div>
      ),
    },
    {
      title: (
        <h1 className="!text-[12px] lg:!text-[16px] !w-[30vw] md:!w-[10vw]">
          Contact Person
        </h1>
      ),
      dataIndex: "contactPerson",
      key: "contactPerson",
      render: (text) => (
        <div className="text-[10px] lg:!text-[16px] ">{text}</div>
      ),
    },
    {
      title: <h1 className="!text-[12px] lg:!text-[16px]">Phone</h1>,
      dataIndex: "phone",
      key: "phone",
      render: (text) => (
        <div className="text-[10px] lg:!text-[16px]">{text}</div>
      ),
    },
    {
      title: <h1 className="!text-[12px] lg:!text-[16px] w-[15vw]">GST NO</h1>,
      dataIndex: "gstno",
      key: "gstno",
      render: (text) => (
        <div className="text-[10px] lg:!text-[16px]">{text}</div>
      ),
    },
    {
      title: <h1 className="!text-[12px] lg:!text-[16px]">Mail ID</h1>,
      dataIndex: "mail",
      key: "mail",
      render: (text) => (
        <div className="text-[10px] lg:!text-[16px]">{text}</div>
      ),
    },

    {
      title: <h1 className="!text-[12px] lg:!text-[16px]">Actions</h1>,
      render: (text) => (
        <div className="flex gap-1">
          <div>
            <EditNoteOutlinedIcon
              className="!text-md !text-green-500 cursor-pointer"
              onClick={() => handleEdit(text)}
            />
          </div>

          <div>
            <DeleteOutlineOutlinedIcon
              className="!text-md !text-red-500 cursor-pointer "
              onClick={() => {
                handleDelete(text);
              }}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="flex pt-[10vh] lg:pl-4">
      <div className="w-[100vw] lg:w-[78vw] flex flex-col gap-8">
        <div className="flex items-center justify-center">
          <Select
            mode="tags"
            showSearch
            placeholder="Type here for Consignee"
            options={searchers}
            onChange={(data) => {
              setSearched(data);
            }}
            className="w-[70vw] lg:w-1/2 !m-auto py-2"
            size="large"
            showArrow={false}
            // open={searched.length===1?false:true}
          />
        </div>
        <div className="w-[100vw] lg:w-[78vw] flex justify-end items-end gap-5 pr-3   md:pr:10 lg:pr-20">
          <div
            className=" bg-[--secondary-color] h-[30px] !text-[10px] lg:!text-[14px] px-3 lg:px-5 py-1 rounded-md cursor-pointer text-white font-bold  flex items-center justify-center "
            onClick={() => {
              setOpen(true);
            }}
          >
            <AddOutlinedIcon className="!text-[18px] lg:!text-[22px]"/> Create
          </div>
          <div>
            <Button
  
              onClick={() => {
                exportToExcel(Consignee);
              }}
              className="!text-[10px] h-[30px] lg:!text-[14px] border-none px-3 lg:px-5 bg-[--secondary-color] rounded-md cursor-pointer text-white font-bold  flex items-center justify-centeryy hover:!text-white"
            >
              Export Exel
            </Button>
          </div>
        </div>
        <Skeleton loading={loading}>
          <Table
            columns={columns}
            dataSource={Consignee}
            ref={tableRef}
            pagination={{ pageSize: 5 }}
            scroll={{x:800}}
          />
        </Skeleton>
      </div>
      <Drawer
        open={open}
        width={500}
        onCancel={() => {
          setOpen(!open);
          form.setFieldValue([]);
          setUpdateId("");
        }}
        footer={false}
        onClose={() => {
          setOpen(!open);
          form.setFieldValue([]);
          setUpdateId("");
        }}
        className="!bg-[--primary-color] !text-white"
        title={<h1 className="text-lg text-white">Consignee</h1>}
        destroyOnClose
      >
        <Form
          className="flex flex-col gap-1"
          layout="vertical"
          onFinish={handleSubmit}
          form={form}
        >
          <Form.Item
            label={<p className="!text-[16px] font-semibold">Name</p>}
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input type="text" size="large" placeholder="Enter name" />
          </Form.Item>
          <Form.Item
            label={<p className="!text-[16px] font-semibold">Address</p>}
            name="address"
            rules={[
              {
                required: true,
                message: "Please input your address!",
              },
            ]}
          >
            <Input type="text" size="large" placeholder="Enter address" />
          </Form.Item>
          <Form.Item
            label={<p className="!text-[16px] font-semibold">Place</p>}
            name="place"
            rules={[
              {
                required: true,
                message: "Please input your place!",
              },
            ]}
          >
            <Input type="text" size="large" placeholder="Enter place" />
          </Form.Item>
          <Form.Item
            label={<p className="!text-[16px] font-semibold">Phone</p>}
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone!",
              },
              {
                pattern: /^\d{10}$/,
                message: "Phone number must be exactly 10 digits.",
              },
            ]}
          >
            <Input type="text" size="large" placeholder="Enter phone" />
          </Form.Item>
          <Form.Item
            label={<p className="!text-[16px] font-semibold">Contact Person</p>}
            name="contactPerson"
            rules={[
              {
                required: true,
                message: "Please input your contact person!",
              },
            ]}
          >
            <Input
              type="text"
              size="large"
              placeholder="Enter contact person"
            />
          </Form.Item>
          <Form.Item
            label={<p className="!text-[16px] font-semibold">GST NO</p>}
            name="gstno"
            rules={[
              {
                required: true,
                message: "Please input your gstno!",
              },
            ]}
          >
            <Input type="text" size="large" placeholder="Enter gstno" />
          </Form.Item>
          <Form.Item
            label={<p className="!text-[16px] font-semibold">Mail</p>}
            name="mail"
            rules={[
              {
                required: true,
                message: "Please input your mail!",
              },
            ]}
          >
            <Input type="mail" size="large" placeholder="Enter mail" />
          </Form.Item>

          <div className="flex gap-4 items-end justify-end">
            <Form.Item>
              <Button
                htmlType="submit"
                className="bg-red-500 w-[130px] !cursor-pointer float-right text-white font-bold tracking-wider"
                onClick={handleClear}
              >
                Clear
              </Button>
            </Form.Item>

            <Form.Item>
              <Button
                loading={loadingBtn}
                htmlType="submit"
                className="bg-green-600 w-[120px] float-right text-white font-bold tracking-wider"
              >
                {updateId === "" ? "Save" : "Update"}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Drawer>
    </div>
  );
}

export default Consignee;
