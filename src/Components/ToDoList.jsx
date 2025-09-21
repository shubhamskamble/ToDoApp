import { Button, Form, Input, message, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import Column from "antd/es/table/Column";
import React, { useState } from "react";
import { DeleteFilled, CheckSquareFilled, CheckCircleFilled, SnippetsFilled } from "@ant-design/icons";

const ToDoList = () => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [currentPage, setCurrentPage] = useState();
  let data = [];
  const column = [
    {
      title: "Activity",
      render: (_, record) => {
        debugger;
        return record?.flag == "C" ? (
          <span style={{ color: "green" }}><CheckCircleFilled /> {record.activity}  </span>
        ) : (
          <span style={{ color: "black" }}> {record.activity} </span>
        );
      },
    },
    {
      title: "Action",
      render: (_, record, index) => {
        return (
          <>
            <div>
              <Button  style={ !record.flag ? {color: "red", fontWeight: "bold", marginRight: "15px", borderColor: "red"} : {marginRight: "15px"}} onClick={() => handleDelete(record, index)} disabled = {record.flag}>
                Delete
                 <DeleteFilled />
              </Button>
              <Button style={!record.flag ? {color:"green", fontWeight: "bold", borderColor: "green"} : {marginRight: "15px"}} onClick={() => handleCompleted(record)} disabled = {record.flag}>
                Completed
                 <CheckSquareFilled />
                 </Button>
            </div>
          </>
        );
      },
    },
  ];
  const handleAdd = () => {
    const value = form.getFieldsValue();
    data.push({ activity: value.item });
    setDataSource((prev) => [...prev, ...data]);
    form.resetFields();
    setCurrentPage(Math.ceil((dataSource.length + 1 / 5)));
  };

  const handleDelete = (record) => {
    const filterData = dataSource.filter(
      (item) => item.activity != record.activity
    );
    setDataSource(filterData);
  };

  const handleCompleted = (record) => {
    const updatedData = dataSource.map((item) => {
      if (item.activity === record.activity) {
        return { ...item, flag: "C" };
      } else {
        return item;
      }
    });
    setDataSource(updatedData);
  };

  return (
    <>
      <div className=" main-container d-flex justify-content-center align-items-center bg-color">
        <div className="main main-container2">
          <div className="card card-size">
            <div className="card-body">
              <div className="h5 card-title pb-2" style={{color: "rgb(21, 28, 133)"}}>To Do List <SnippetsFilled /></div>
              <Form form={form}>
                <div className="row">
                  <div className="col">
                    <Form.Item name="item">
                      <Input className="" placeholder="Write your activity..."></Input>
                    </Form.Item>
                    </div>
                    <div className="col">
                    <Button className="btn-color" onClick={() => handleAdd()}>ADD</Button>
                  </div>
                </div>
              </Form>
              <Table columns={column} dataSource={dataSource} pagination= {{
                pageSize: 5,
                current: currentPage,
                onChange: (page) => setCurrentPage(page)
                }}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ToDoList;
