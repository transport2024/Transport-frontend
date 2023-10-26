import React, { memo, useEffect, useRef, useState } from "react";
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
  Drawer,
  Skeleton,
} from "antd";
import axios from "axios";
import { get, flatten } from "lodash";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useDownloadExcel } from "react-export-table-to-excel";
import PrintIcon from "@mui/icons-material/Print";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import moment from "moment" 
import {useDispatch} from "react-redux"
import {showOpen,hideOpen} from "../Redux/NetworkSlice.js"

function Memo() {
  const [memo, setMemo] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [updateId, setUpdateId] = useState("");
  const [searched, setSearched] = useState([]);
  const tableRef = useRef(null);
  const [vehicle, setVehicle] = useState([]);
  const componentRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [memoDetails, setMemoDetails] = useState([]);
  const dispatch=useDispatch()
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/api/memo?search=${searched}`
      );
      setMemo(get(result, "data.message"));
      const result2 = await axios.get(
        `${process.env.REACT_APP_URL}/api/vehicle`
      );

      const result3 = await axios.get(
        `${process.env.REACT_APP_URL}/api/memodetails`
      );
      setMemoDetails(get(result3, "data.message"));
      setVehicle(get(result2, "data.message"));
      
    } catch (err) {
      if (err.request.statusText === "Internal Server Error") {
        dispatch(showOpen())
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  
  const handleSubmit = async (value) => {
    if (updateId === "") {
      try {
        const formData = {
          gcno: Memo.length+121,
          drivername: value.drivername,
          date: moment(value.date).format('DD-MM-YYYY'),
          vehicleno: value.vehicleno,
          driverphone: value.driverphone,
          driverwhatsappno: value.driverwhatsappno,
        };


        await axios.post(`${process.env.REACT_APP_URL}/api/memo`, formData);
        fetchData();
        notification.success({
          message: "memo Added successfully",
        });
        setOpen(false);
        form.setFieldValue([]);
      } catch (err) {
        notification.error({
          message: "Something went wrong",
        });
      }
    } else {
      try {
        await axios.put(
          `${process.env.REACT_APP_URL}/api/memo/${updateId}`,
          value
        );
        fetchData();
        notification.success({
          message: "memo updated successfully",
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
    // form.setFieldsValue(value);
    setUpdateId(value._id);
    // setOpen(true);
    navigate(`/editmemo/${value._id}`);
  };

  const handleDelete = async (value) => {
    if (
      memoDetails.filter((res) => {
        return res?.memoId === value._id;
      })[0]?.memoId === value._id
    ) {
      Modal.warning({
        title: "This Memo entry Link With Memo Details",
        content: "if you really wanna delete this.. delete Memo details first",
      });
    } else {
      try {
        await axios.delete(
          `${process.env.REACT_APP_URL}/api/memo/${value._id}`
        );
        fetchData();
        notification.success({
          message: "Deleted Successfully",
        });
      } catch (err) {
        notification.error({
          message: "Something Went Wrong",
        });
      }
    }
  };

  const handleClear = () => {
    form.setFieldsValue([]);
  };
  const searchers = [];

 console.log(memo,"trigger")

  memo &&
    memo.map((data) => {
      
      return searchers.push(
        {
          label:data.drivername,
          value: data.drivername,
        },
        {
          label: data.driverphone,
          value: data.driverphone,
        },
        {
          label: data.vehicleno,
          value: data.vehicleno,
        }
      );
    });

  

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Web Users",
    sheet: "Web Users",
  });

  const columns = [
    {
      title: <h1 className="!text-[12px] lg:!text-[18px]">GC No</h1>,
      dataIndex: "serialNumber",
      key: "serialNumber",
      render: (text, record, index) => {
        // Calculate the GC No based on the current page and index
        const gcNo = (currentPage - 1) * 5 + index + 121;
        return <div className="text-[10px] lg:text-[12px]">{gcNo}</div>;
      },
    },

    {
      title: <h1 className="!text-[12px] lg:!text-[18px]">Date</h1>,
      dataIndex: "date",
      key: "date",
      render: (text) => <div className="text-[10px] lg:!text-[16px]">{text}</div>,
    },
    {
      title: <h1 className="!text-[12px] lg:!text-[18px]">Vehicle No</h1>,
      dataIndex: "vehicleno",
      key: "vehicleno",
      render: (text) => <div className="text-[10px]  lg:!text-[16px]">{text}</div>,
    },
    {
      title: <h1 className="!text-[12px] lg:!text-[18px]">Driver Name</h1>,
      dataIndex: "drivername",
      key: "drivername",
      render: (text) => <div className="text-[10px] lg:!text-[16px]">{text}</div>,
    },
    {
      title: <h1 className="!text-[12px] lg:!text-[18px]">DriverPhone</h1>,
      dataIndex: "driverphone",
      key: "driverphone",
      render: (text) => <div className="text-[10px] lg:!text-[16px]">{text}</div>,
    },
    {
      title: <h1 className="!text-[12px] lg:!text-[18px]">Driver WhatsappNo</h1>,
      dataIndex: "driverwhatsappno",
      key: "driverwhatsappno",
      render: (text) => <div className="text-[10px] lg:!text-[16px]">{text}</div>,
    },
    {
      title: <h1 className="!text-[12px] lg:!text-[18px]">Actions</h1>,
      render: (text) => (
        <div className="flex flex-col items-center justify-center">
          <div className="flex gap-1">
            <div>
              <EditNoteOutlinedIcon
                className="!text-md text-[--secondary-color] cursor-pointer"
                onClick={() => handleEdit(text)}
              />
            </div>

            <div>
              <DeleteOutlineOutlinedIcon
                className="!text-md text-[--secondary-color] cursor-pointer "
                onClick={() => {
                  handleDelete(text);
                }}
              />
            </div>
          </div>
          <div
            className={`${
              memoDetails &&
              memoDetails.filter((res) => {
                return get(res, "memoId") === get(text, "_id");
              })[0]?.memoId !== undefined
                ? "hidden"
                : "block"
            }`}
          >
            <PrintIcon
              className="!text-md text-[--secondary-color] cursor-pointer"
              onClick={() => {
                navigate(`/vehicleBill/${text._id}`);
              }}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="flex pt-[12vh] pl-4">
      <div className="w-[75vw] flex flex-col gap-8">
        <div className="flex items-center justify-center">
          <Select
            mode="tags"
            showSearch
            placeholder="Type here for Memoentry"
            options={searchers}
            onChange={(data) => {
              setSearched(data);
            }}
            className="w-[70vw] lg:w-1/2 !m-auto py-3"
            size="large"
            showArrow={false}
          />
        </div>
        <div className="  w-full flex gap-5 items-end justify-end">
          <div
            className="float-right w-[120px] py-1 rounded-md cursor-pointer text-white font-bold  flex items-center justify-center bg-[--secondary-color]"
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
              className="w-[120px] py-1  rounded-md cursor-pointer text-white font-bold  flex items-center justify-center bg-[--secondary-color] hover:!text-white"
            >
              Export Exel
            </Button>
          </div>
        </div>
        <Skeleton loading={loading}>
          <Table
            columns={columns}
            dataSource={memo}
            ref={tableRef}
            pagination={{
              pageSize: 5,
              current: currentPage, // Set the current page from the state
              onChange: (page) => {
                // Update the currentPage when changing the page
                setCurrentPage(page);
              },
            }}
            className="!overflow-x-scroll"
          />
        </Skeleton>
      </div>
      <Drawer
        destroyOnClose
        open={open}
        width={500}
        onCancel={() => {
          setOpen(!open);
          form.setFieldValue([]);
          setUpdateId("");
        }}
        onClose={() => {
          setOpen(!open);
          form.setFieldValue([]);
          setUpdateId("");
        }}
        footer={false}
      >
        <Form
          className="flex flex-col gap-1"
          layout="vertical"
          onFinish={handleSubmit}
          form={form}
        >
          {/* <Form.Item
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
          </Form.Item> */}
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

          {/* <Form.Item
            label={<p className="!text-[16px] font-semibold">Vehicle No</p>}
            name="vehicleno"
            rules={[
              {
                required: true,
                message: "Please input your vehicle no!",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item> */}

          <Form.Item
            name="vehicleno"
            label={<p className="!text-[16px] font-semibold">Vehicle No</p>}
          >
            <Select placeholder="Select vehicle no" size="large">
              {vehicle.map((res, i) => {
                return (
                  <Select.Option value={res.vehicleno} key={i}>
                    {res.vehicleno}
                  </Select.Option>
                );
              })}
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
                onClick={handleClear}
              >
                Clear
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                className="bg-green-600 w-[130px] float-left text-white font-bold tracking-wider"
              >
                {updateId === "" ? "Save" : "Update"}{" "}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Drawer>
    </div>
  );
}

export default Memo;
