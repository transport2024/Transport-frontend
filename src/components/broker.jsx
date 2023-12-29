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
  Skeleton,
} from "antd";
import axios from "axios";
import { get } from "lodash";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useDownloadExcel } from "react-export-table-to-excel";
import {useDispatch} from "react-redux"
import {showOpen,hideOpen} from "../Redux/NetworkSlice.js"
import * as XLSX from 'xlsx';


function Broker() {
  const [Broker, setBroker] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [updateId, setUpdateId] = useState("");
	const [searched, setSearched] = useState([]);
  const tableRef = useRef(null);
  const [loading,setLoading]=useState(false)
  const dispatch=useDispatch()
  const [exporting,setExporting]=useState(false)
  const [loadingBtn,setLoadingBtn]=useState(false)

  const fetchData = async () => {
    try {
      setLoading(true)
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/api/broker?search=${searched}`
      );
      setBroker(get(result, "data.message"));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, [searched]);

  const handleSubmit = async (value) => {
    if (updateId === "") {
      setLoadingBtn(true)
      try {
        await axios.post(`${process.env.REACT_APP_URL}/api/broker`, value);
        fetchData();
        notification.success({
          message: "Broker Added successfully",
        });
        setOpen(false);
        form.setFieldsValue([])
      } catch (err) {
        notification.error({
          message: "Something went wrong",
        });
      }finally{
        setLoadingBtn(false)
      }
    } else {
      try {
        setLoadingBtn(true)
        await axios.put(`${process.env.REACT_APP_URL}/api/broker/${updateId}`, value);
        fetchData();
        notification.success({
          message: "Broker updated successfully",
        });
        setOpen(false);
        form.setFieldValue([]);
        setUpdateId("");
      } catch (err) {
        notification.error({
          message: "Something went wrong",
        });
      }finally{
        setLoading(false)
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
      await axios.delete(`${process.env.REACT_APP_URL}/api/broker/${value._id}`);
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

  Broker &&
    Broker.map((data) => {
      
      return searchers.push(
        { value: data.brokername }
     );
    });

    const exportToExcel = () => {
      if (!exporting) {
        const dataForExport = Broker.map((broker) => ({
          brokername: broker.brokername, 
        }));
    
        const ws = XLSX.utils.json_to_sheet(dataForExport);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'exported_data.xlsx');
        setExporting(false);
      }
    };
	

  const columns = [
    {
      title: <p className="text-[12px] lg:text-[18px]">Broker Name</p>,
      dataIndex: "brokername",
      key: "brokername",
      render: (text) => <div className="!text-[12px] lg:!text-[16px]">{text}</div>,
    },

    {
      title:<p className="text-[12px] lg:text-[18px]">Actions</p> ,
      render: (text) => (
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
            placeholder="Type here for Broker"
            options={searchers}
            onChange={(data) => {
              setSearched(data);
            }}
            className="w-[70vw] lg:w-1/2 !m-auto py-3"
            size="large"
            showArrow={false}
            // open={searched.length===1?false:true}
          />
        </div>
        <div className="w-full flex gap-5 items-end justify-end">
          <div
            className=" w-[120px] py-1 rounded-md cursor-pointer text-white font-bold  flex items-center justify-center bg-[--secondary-color]"
            onClick={() => {
              setOpen(true);
            }}
          >
            <AddOutlinedIcon />
            Create
          </div>
          <div>
            <Button
              onClick={()=>{exportToExcel(Broker)}}
              className="w-[120px] py-1  rounded-md cursor-pointer text-white font-bold  flex items-center justify-center bg-[--secondary-color] hover:!text-white"
            >
              Export Exel
            </Button>
          </div>
        </div>
        <Skeleton loading={loading}>
        <Table columns={columns} dataSource={Broker} ref={tableRef} pagination={{pageSize:5}} />
        </Skeleton>
      
      </div>
      <Modal
        open={open}
        width={500}
        onCancel={() => {
          setOpen(!open);
          form.setFieldValue([]);
          setUpdateId("");
        }}
        footer={false}
        destroyOnClose
      >
        <Form
          className="flex flex-col gap-4"
          layout="vertical"
          onFinish={handleSubmit}
          form={form}
        >
          <Form.Item
            label={<p className="!text-[16px] font-semibold">Broker Name</p>}
            name="brokername"
            rules={[
              {
                required: true,
                message: "Please input your Broker Name!",
              },
            ]}
          >
            <Input type="text" size="large" placeholder="Enter broker"/>
          </Form.Item>

          <div className="flex pl-20 lg:pl-0 lg:justify-end lg:items-end">
            
            <Form.Item className="w-[10vw]">
              <Button
                htmlType="submit"
                className="bg-red-500 lg:w-[130px] float-left text-white font-bold tracking-wider"
                onClick={handleClear}
              >
                Clear
              </Button>
            </Form.Item>
            <Form.Item className="w-[10vw] pl-10 lg:pl-0">
              <Button
              loading={loadingBtn}
                htmlType="submit"
                className="bg-green-500  lg:w-[130px] float-left text-white font-bold tracking-wider"
              >
                {updateId === "" ? "Save" : "Update"}{" "}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default Broker;
