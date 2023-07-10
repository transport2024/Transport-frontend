import React, { Component, useEffect, useState, useRef } from "react";
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

function Memodetails() {
  const [Memodetails, setMemodetails] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [updateId, setUpdateId] = useState("");
  const [searched, setSearched] = useState([]);
  const tableRef = useRef(null);

  const fetchData = async () => {
    try {
      const result = await axios.get(
        `http://localhost:4001/api/memodetails?search=${searched}`
      );
      setMemodetails(get(result, "data.message"));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searched]);

  const handleSubmit = async (value) => {
    if (updateId === "") {
      console.log(value)
      try {
        await axios.post("http://localhost:4001/api/memodetails", value);
        fetchData();
        notification.success({
          message: "memodetails Added successfully",
        });
        setOpen(false);
        form.setFieldsValue([])
      } catch (err) {
        notification.error({
          message: "Something went wrong",
        });
      }
    } else {
      try {
        await axios.put(
          `http://localhost:4001/api/memodetails/${updateId}`,
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
    form.setFieldsValue(value);
    setUpdateId(value._id);
    setOpen(true);
  };

  const handleDelete = async (value) => {
    try {
      await axios.delete(`http://localhost:4001/api/memo/${value._id}`);
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

  Memodetails &&
    Memodetails.map((data) => {
      return searchers.push(
        {
          value: data.drivername,
        },
        {
          value: data.driverphone,
        },
        {
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
      title: "Location From",
      dataIndex: "locationfrom",
      key: "locationfrom",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },

    {
      title: "Location To",
      dataIndex: "locationto",
      key: "locationto",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },

    {
      title: "Consignor",
      dataIndex: "consignor",
      key: "consignor",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },

    {
      title: "Consignee",
      dataIndex: "consignee",
      key: "consignee",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Lot No",
      dataIndex: "Lotno",
      key: "lotno",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "PR NO From",
      dataIndex: "prnoform",
      key: "prnofrom",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "PR NO To",
      dataIndex: "Prnoto",
      key: "prnoto",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "LR Amount",
      dataIndex: "lramount",
      key: "lramount",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Broker Name",
      dataIndex: "brokername",
      key: "brokername",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Broker Commission",
      dataIndex: "brokercommission",
      key: "brokerCommission",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Memo Method",
      dataIndex: "memomethod",
      key: "memomethod",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Lorry Foeight",
      dataIndex: "lorryfoeight",
      key: "lorryfoeight",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Account Paid",
      dataIndex: "accountpaid",
      key: "accountpaid",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Invoive No",
      dataIndex: "invoiceno",
      key: "invoiceno",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Value of Goods",
      dataIndex: "valueofgoods",
      key: "valueofgoods",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Quality",
      dataIndex: "quality",
      key: "quality",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Press Mark",
      dataIndex: "pressmark",
      key: "PressMark",
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
      <div className="w-[80vw] flex flex-col gap-10">
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
        <Table
          columns={columns}
          dataSource={Memodetails}
          ref={tableRef}
          scroll={{
            x: 2200,
          }}
          pagination={{pageSize:5}}
        />
      </div>
      <Drawer
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
          <Form.Item
            label={<p className="!text-[16px] font-semibold">Location From</p>}
            name="locationfrom"
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
            name="locationto"
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
            label={<p className="!text-[16px] font-semibold">Consignor</p>}
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

          <Form.Item
            label={<p className="!text-[16px] font-semibold">Consignee</p>}
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

          <Form.Item
            label={<p className="!text-[16px] font-semibold">Lot No</p>}
            name="Lotno"
            rules={[
              {
                required: true,
                message: "Please input your driver lot no!",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>

          <Form.Item
            label={<p className="!text-[16px] font-semibold">PR No From</p>}
            name="prnoform"
            rules={[
              {
                required: true,
                message: "Please input your driver pr no form!",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>

          <Form.Item
            label={<p className="!text-[16px] font-semibold">PR No To</p>}
            name="Prnoto"
            rules={[
              {
                required: true,
                message: "Please input your pr no to!",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>
          <Form.Item
            label={<p className="!text-[16px] font-semibold">Quantity</p>}
            name="quantity"
            rules={[
              {
                required: true,
                message: "Please input your quantity!",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>
          <Form.Item
            label={<p className="!text-[16px] font-semibold">LR Amount</p>}
            name="lramount"
            rules={[
              {
                required: true,
                message: "Please input your lr amount",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>

          <Form.Item
            label={<p className="!text-[16px] font-semibold">Broker Name</p>}
            name="brokername"
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
            label={
              <p className="!text-[16px] font-semibold">Broker Commission</p>
            }
            name="brokercommission"
            rules={[
              {
                required: true,
                message: "Please input your broker commission",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>

          <Form.Item
            label={<p className="!text-[16px] font-semibold">Memo Method</p>}
            name="memomethod"
            rules={[
              {
                required: true,
                message: "Please select your memo method",
              },
              <Select size="large">
                <Select.Option value="to pay">To Pay</Select.Option>
                <Select.Option value="tbb">TBB</Select.Option>
              </Select>,
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>
          <Form.Item
            label={<p className="!text-[16px] font-semibold">Lorry Foeight</p>}
            name="lorryfoeight"
            rules={[
              {
                required: true,
                message: "Please input your lorry foeight",
              },
            ]}
          >
         
            <Input type="text" size="large" />
          </Form.Item>

          <Form.Item
            label={<p className="!text-[16px] font-semibold">Remarks</p>}
            name="remarks"
            rules={[
              {
                required: true,
                message: "Please input remarks",
              },
              <Select size="large">
                <Select.Option value="party">Party</Select.Option>
                <Select.Option value="topay">To Pay</Select.Option>
                <Select.Option value="paid">Paid</Select.Option>
                <Select.Option value="fixed">Fixed</Select.Option>
              </Select>,
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>
          <Form.Item
            label={<p className="!text-[16px] font-semibold">Account Point</p>}
            name="accountpaid"
            rules={[
              {
                required: true,
                message: "Please input your account point",
              },
              <Select size="large">
                <Select.Option value="Yes">Yes</Select.Option>
                <Select.Option value="no">no</Select.Option>
              </Select>,
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>

          <Form.Item
            label={<p className="!text-[16px] font-semibold">Invoice No</p>}
            name="invoiceno"
            rules={[
              {
                required: true,
                message: "Please input your invoice no",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>
          <Form.Item
            label={<p className="!text-[16px] font-semibold">Value of Goods</p>}
            name="valueofgoods"
            rules={[
              {
                required: true,
                message: "Please input your value of goods",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>

          <Form.Item
            label={<p className="!text-[16px] font-semibold">Quality</p>}
            name="quality"
            rules={[
              {
                required: true,
                message: "Please input your quality",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>

          <Form.Item
            label={<p className="!text-[16px] font-semibold">Press Mark</p>}
            name="pressmark"
            rules={[
              {
                required: true,
                message: "Please input your press mark",
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

export default Memodetails;
