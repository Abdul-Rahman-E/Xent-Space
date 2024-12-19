import React, { useState } from "react";
import { Button, Table, Typography, Popconfirm } from "antd";
import EditableCell from "./EditableCell";
import { useDispatch, useSelector } from "react-redux";
import {
  updateEmployee,
  addEmployee,
  deleteEmployee,
} from "../store/employeesSlice";

const EmployeeTable = ({ form, editingKey, setEditingKey }) => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employees);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      department: "",
      position: "",
      email: "",
      phone: "",
      city: "",
      ...record,
    });
    setEditingKey(record.key); // Sets the current editing key
  };

  const cancel = () => {
    setEditingKey(""); // Resets editing key
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...employees];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        const updatedEmployee = { ...item, ...row };
        newData.splice(index, 1, updatedEmployee);
        dispatch(updateEmployee(updatedEmployee)); // Update Redux state
        setEditingKey(""); // Reset editing key
      }
    } catch (errInfo) {
      console.error("Validation failed:", errInfo);
    }
  };

  const handleDelete = (keys) => {
    dispatch(deleteEmployee(keys));
    setSelectedRowKeys([]);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => setSelectedRowKeys(selectedRowKeys),
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      editable: true,
      width: 150,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Department",
      dataIndex: "department",
      editable: true,
      width: 150,
      filters: [
        { text: "Engineering", value: "Engineering" },
        { text: "HR", value: "HR" },
        { text: "Finance", value: "Finance" },
        { text: "Marketing", value: "Marketing" },
      ],
      onFilter: (value, record) => record.department === value,
    },
    {
      title: "Position",
      dataIndex: "position",
      editable: true,
      width: 150,
      filters: [
        { text: "Software Engineer", value: "Software Engineer" },
        { text: "HR Manager", value: "HR Manager" },
        { text: "Marketing Executive", value: "Marketing Executive" },
        { text: "Financial Analyst", value: "Financial Analyst" },
        { text: "DevOps Engineer", value: "DevOps Engineer" },
        { text: "Recruitment Lead", value: "Recruitment Lead" },
        { text: "Marketing Executive", value: "Marketing Executive" },
        { text: "Sales Representative", value: "Sales Representative" },
        { text: "Content Strategist", value: "Content Strategist" },
        { text: "Frontend Developer", value: "Frontend Developer" },
        { text: "Backend Developer", value: "Backend Developer" },
        { text: "Sales Manager", value: "Sales Manager" },
        { text: "HR Executive", value: "HR Executive" },
      ],
      onFilter: (value, record) => record.position === value,
    },
    {
      title: "Email",
      dataIndex: "email",
      editable: true,
      width: 150,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      editable: true,
      width: 150,
    },
    {
      title: "Salary",
      dataIndex: "salary",
      editable: true,
      width: 150,
      render: (text) => {
        const formatter = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "INR",
        });
        return formatter.format(text);
      },
    },
    {
      title: "Operation",
      dataIndex: "operation",
      width: 150,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: ["phone"].includes(col.dataIndex) ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={() => {
            console.log(selectedRowKeys);
            handleDelete(selectedRowKeys);
          }}
          disabled={selectedRowKeys.length === 0}
        >
          Delete Selected
        </Button>
      </div>
      <Table
        components={{
          body: { cell: EditableCell },
        }}
        bordered
        dataSource={employees}
        scroll={{ x: "max-content", y: 450 }}
        columns={mergedColumns}
        rowClassName="editable-row"
        rowSelection={rowSelection}
        pagination={{ pageSize: 9 }}
      />
    </>
  );
};

export default EmployeeTable;
