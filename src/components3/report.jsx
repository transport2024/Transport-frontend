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
  Drawer,
} from "antd";
import axios from "axios";
import { get } from "lodash";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useDownloadExcel } from "react-export-table-to-excel";

function Report() {
  const [Report, setReport] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [updateId, setUpdateId] = useState("");
	const [searched, setSearched] = useState([]);
	const tableRef = useRef(null);

    const fetchData = async () => {
        try {
          const result = await axios.get(`http://localhost:4001/api/report?search=${searched}`);
          setReport(get(result, "data.message"));
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
            await axios.post("http://localhost:4001/api/report", value);
            fetchData();
            notification.success({ message: "report Added successfully" });
            setOpen(false);
          } catch (err) {
            notification.error({ message: "Something went wrong" });
          }
        } else {
          try {
            await axios.put(
              `http://localhost:4001/api/memodetails/${updateId}`,
              value
            );
            fetchData();
            notification.success({ message: "report updated successfully" });
            setOpen(false);
            form.setFieldValue([]);
            setUpdateId("");
          } catch (err) {
            notification.error({ message: "Something went wrong" });
          }
        }
      };
    
      const handleEdit = (value) => {
        form.setFieldsValue(value);
        setUpdateId(value._id);
        setOpen(true);
      };
    
      const handleDelete = async(value) => {
        try {
          await axios.delete(`http://localhost:4001/api/report/${value._id}`)
          fetchData()
          notification.success({message:"Deleted Successfully"})
        } catch (err) {
          notification.error({message:"Something Went Wrong"})
        }
      }
    
      
      const handleClear = () => {
        form.setFieldsValue([]);
      };
    
      const searchers = [];
    
      Report &&
        Report.map((data) => {
          return searchers.push(
            { value: data.consignor },
            { value: data.consignee },
            { value: data.vehicleno }
          );
        });
    
	const { onDownload } = useDownloadExcel({
		currentTableRef: tableRef.current,
		filename: "Web Users",
		sheet: "Web Users",
	  });
	

      const columns = [

        {
            title: "From Date",
            dataIndex: "from date",
            key: "from date",
            render: (text) => <div className="!text-[16px]">{text}</div>,
          },
      
          {
              title: "To Date",
              dataIndex: "To Date",
              key: "To Date",
              render: (text) => <div className="!text-[16px]">{text}</div>,
            },
  
        {
            title: "Location From",
            dataIndex: "Location From",
            key: "Location From",
            render: (text) => <div className="!text-[16px]">{text}</div>,
          },

          {
            title: "Vehicle No",
            dataIndex: " Vehicle No",
            key: "Vehicle No",
            render: (text) => <div className="!text-[16px]">{text}</div>,
          },
      
        {
          title: "Location To",
          dataIndex: "Location To",
          key: "Location To",
          render: (text) => <div className="!text-[16px]">{text}</div>,
        },
    
        {
          title: "Consignor",
          dataIndex: "Consignor",
          key: "Consignor",
          render: (text) => <div className="!text-[16px]">{text}</div>,
        },
    
        {
            title: "Consignee",
            dataIndex: "Consignee",
            key: "Consignee",
            render: (text) => <div className="!text-[16px]">{text}</div>,
          },

      {
          title: "Broker Name",
          dataIndex: "broker Name",
          key: "broker name",
          render: (text) => <div className="!text-[16px]">{text}</div>,
        },

        {
            title: "LR No",
            dataIndex: " LR No",
            key: "LR No",
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
                <DeleteOutlineOutlinedIcon className="!text-md text-green-500 cursor-pointer " onClick={()=>{handleDelete(text)}} />
              </div>
            </div>
          ),
        },
      ];
    
      return (
    <div className="flex pt-[15vh] pl-4">
      <div className="w-[75vw] flex flex-col gap-10">
        <div className="flex items-center justify-center">
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
            <Table columns={columns} dataSource={Report} ref={tableRef} pagination={{pageSize:5}} />
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
      >
        <Form
          className="flex flex-col gap-1"
          layout="vertical"
          onFinish={handleSubmit}
          form={form}
        >
 <Form.Item
            label={<p className="!text-[16px] font-semibold">From Date </p>}
            name="from date"
            rules={[
              {
                required: true,
                message: "Please input your from date!",
              },
            ]}
          >
            <Input type="date" size="large" />
          </Form.Item>
          <Form.Item
            label={<p className="!text-[16px] font-semibold">To Date</p>}
            name="to date"
            rules={[
              {
                required: true,
                message: "Please input your to date!",
              },
            ]}
          >
            <Input type="date" size="large" />
          </Form.Item>
        
 <Form.Item
            label={<p className="!text-[16px] font-semibold"> Vehicle No </p>}
            name="vehicle no"
            rules={[
              {
                required: true,
                message: "Please input your vehicle no!",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>

          <Form.Item
            label={<p className="!text-[16px] font-semibold">Location From </p>}
            name="location from"
            rules={[
              {
                required: true,
                message: "Please input your from location!",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>
          <Form.Item
            label={<p className="!text-[16px] font-semibold">Location To</p>}
            name="location to"
            rules={[
              {
                required: true,
                message: "Please input your to location!",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>
          <Form.Item
            label={<p className="!text-[16px] font-semibold"> Consignor </p>}
            name="consignor"
            rules={[
              {
                required: true,
                message: "Please input your consignor!",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>

          <Form.Item label={<p className="!text-[16px] font-semibold">Consignee</p>}
           name="consignee"
        rules={[
            {
                required: true,  
                message: "Please input your consignee!",
              },
          ]}
          >
            <Input type="text" size="large" />
            </Form.Item> 

            <Form.Item label={<p className="!text-[16px] font-semibold">Broker Name</p>}
           name="broker name"
        rules={[
            {
                required: true,  
                message: "Please input your broker name",
              },
          ]}
          >
             <Input type="text" size="large" />
          </Form.Item>


          <Form.Item
            label={<p className="!text-[16px] font-semibold">LR No</p>}
            name="Lr no"
            rules={[
              {
                required: true,
                message: "Please input your driver lr no!",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>

          <div className="flex items-end gap-2 justify-end">
           
           <Form.Item >
             <Button
               htmlType="submit"
               className="bg-red-500 w-[130px] float-left text-white font-bold tracking-wider"
               onClick={handleClear}
             >
               Clear
             </Button>
           </Form.Item>
           <Form.Item >
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

export default Report;
