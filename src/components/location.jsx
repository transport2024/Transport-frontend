import React, { Component, useEffect, useState,useRef } from "react";
import SideNavbar from "../sideNavbar.jsx";
import {
  Space,
  Table,
  Tag,
  Select,
  Modal,
  Form,
  Input,
  Button,
  notification,
} from "antd";
import axios from "axios";
import { get } from "lodash";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useDownloadExcel } from "react-export-table-to-excel";

function Location() {
  const [Location, setLocation] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [updateId, setUpdateId] = useState("");
	const [searched, setSearched] = useState([]);
	const tableRef = useRef(null);

  const fetchData = async () => {
    try {
      const result = await axios.get(
        `http://localhost:4001/api/location?search=${searched}`
      );
      setLocation(get(result, "data.message"));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searched]);

  const handleSubmit = async (value) => {
    if (updateId === "") {
      try {
        await axios.post("http://localhost:4001/api/location", value);
        fetchData();
        notification.success({
          message: "Location Added successfully",
        });
        setOpen(false);
      } catch (err) {
        notification.error({
          message: "Something went wrong",
        });
      }
    } else {
      try {
        await axios.put(`http://localhost:4001/api/location/${updateId}`, value);
        fetchData();
        notification.success({
          message: "Location updated successfully",
        });
        setOpen(false);
        form.setFieldValue([]);
        setUpdateId("");
      } catch (err) {
        notification.error({
          message: "Something went wrong",
        });
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
      await axios.delete(`http://localhost:4001/api/location/${value._id}`);
      fetchData();
      notification.success({
        message: "Deleted Successfully",
      });
    } catch (err) {
      notification.error({
        message: "Something Went Wrong",
      });
    }
  };

  const handleClear = () => {
    form.setFieldsValue([]);
  };

  const searchers = [];

  Location &&
    Location.map((data) => {
      return searchers.push(
        { value: data.name }
     );
    });


	const { onDownload } = useDownloadExcel({
		currentTableRef: tableRef.current,
		filename: "Web Users",
		sheet: "Web Users",
	  });
	

  const columns = [
    {
      title: "Location Name",
      dataIndex: "Location Name",
      key: "Location Name",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },

    {
      title: "Actions",
      render: (text) => (
        <div className="flex gap-1">
          <div>
            <EditNoteOutlinedIcon
              className="!text-md text-green-500 cursor-pointer"
              onClick={() => handleEdit(text)}
            />
          </div>

          <div>
            <DeleteOutlineOutlinedIcon
              className="!text-md text-green-500 cursor-pointer "
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
    <div className="flex pt-[15vh] pl-4">
      <div className="w-[75vw] flex flex-col gap-10">
        <div className="flex items-center justify-center">
          {/* <Input placeholder="Search here" size="large" className="w-[50%] !m-auto py-3"
						onChange={
							(e) => {
								setSearched(e.target.value);
							}
						} /> */}

          <Select
            mode="tags"
            showSearch
            placeholder="Type here for Category"
            options={searchers}
            onChange={(data) => {
              setSearched(data);
            }}
            className="w-[50%] !m-auto py-3"
            size="large"
            showArrow={false}
          />
        </div>
        <div className="w-full flex gap-5 items-end justify-end">
          <div
            className=" w-[120px] py-1 rounded-md cursor-pointer text-white font-bold  flex items-center justify-center bg-green-500"
            onClick={() => {
              setOpen(true);
            }}
          >
            <AddOutlinedIcon />
            Create
          </div>
          <div>
            <Button
              onClick={onDownload}
              className="w-[120px] py-1  rounded-md cursor-pointer text-white font-bold  flex items-center justify-center bg-green-500 hover:!text-white"
            >
              Export Exel
            </Button>
          </div>
        </div>
        <Table columns={columns} dataSource={Location}  ref={tableRef}/>
      </div>
      <Modal
        open={open}
        width={700}
        onCancel={() => {
          setOpen(!open);
          form.setFieldValue([]);
          setUpdateId("");
        }}
        footer={false}
      >
        <Form
          className="grid grid-cols-2 gap-4"
          layout="vertical"
          onFinish={handleSubmit}
          form={form}
        >
          <Form.Item
            label={<p className="!text-[16px] font-semibold">Location Name</p>}
            name="Broker Name"
            rules={[
              {
                required: true,
                message: "Please input your Location Name!",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>

          <div className="save">
            <Form.Item className="w-[40vw]">
              <Button
                htmlType="submit"
                className="bg-green-500 w-[130px] float-left text-white font-bold tracking-wider"
              >
                {updateId === "" ? "Save" : "Update"}{" "}
              </Button>
            </Form.Item>
            <Form.Item className="w-[40vw]">
              <Button
                htmlType="submit"
                className="bg-red-500 w-[130px] float-left text-white font-bold tracking-wider"
                onClick={handleClear}
              >
                Clear
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default Location;
