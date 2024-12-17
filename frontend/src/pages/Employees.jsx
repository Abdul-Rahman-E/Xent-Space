import React, { useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import employeesData from "../sampleData/employeesData";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const Employees = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(employeesData);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      department: "",
      position: "",
      email: "",
      phone: "",
      address: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      editable: true,
      width: "13%",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Department",
      dataIndex: "department",
      editable: true,
      width: "13%",
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
      width: "13%",
      filters: [
        { text: "Software Engineer", value: "Software Engineer" },
        { text: "HR Manager", value: "HR Manager" },
        { text: "Marketing Executive", value: "Marketing Executive" },
        { text: "Financial Analyst", value: "Financial Analyst" },
        { text: "DevOps Engineer", value: "DevOps Engineer" },
        { text: "Recruitment Lead", value: "Recruitment Lead" },
        { text: "Sales Representative", value: "Sales Representative" },
        { text: "Accountant", value: "Accountant" },
        { text: "Frontend Developer", value: "Frontend Developer" },
        { text: "Sales Manager", value: "Sales Manager" },
        { text: "HR Executive", value: "HR Executive" },
        { text: "Backend Developer", value: "Backend Developer" },
      ],
      onFilter: (value, record) => record.position === value,
    },
    {
      title: "Email",
      dataIndex: "email",
      editable: true,
      width: "18%",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      editable: true,
      width: "13%",
      responsive: ["md"],
    },
    {
      title: "City",
      dataIndex: "city",
      editable: true,
      width: "18%",
      responsive: ["md"],
      filters: [
        { text: "London", value: "London" },
        { text: "New York", value: "New York" },
        { text: "Paris", value: "Paris" },
        { text: "Tokyo", value: "Tokyo" },
        { text: "Madrid", value: "Madrid" },
        { text: "Singapore", value: "Singapore" },
        { text: "Rome", value: "Rome" },
      ],
      onFilter: (value, record) => record.city === value,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      width: "12%",
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
    <Form form={form} component={false}>
      <Table
        components={{
          body: { cell: EditableCell },
        }}
        bordered
        dataSource={data}
        scroll={{ x: "max-content", y: 400 }}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{ pageSize: 8 }}
      />
    </Form>
  );
};

export default Employees;

// import React, { useState } from "react";
// import { Table, Input, InputNumber, Popconfirm, Form, Typography } from "antd";
// import employeesData from "../sampleData/employeesData";

// const { Title } = Typography;

// // Editable Cell component
// const EditableCell = ({
//   editing,
//   dataIndex,
//   title,
//   inputType,
//   record,
//   index,
//   children,
//   ...restProps
// }) => {
//   const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
//   return (
//     <td {...restProps}>
//       {editing ? (
//         <Form.Item
//           name={dataIndex}
//           style={{
//             margin: 0,
//           }}
//           rules={[
//             {
//               required: true,
//               message: `Please Input ${title}!`,
//             },
//           ]}
//         >
//           {inputNode}
//         </Form.Item>
//       ) : (
//         children
//       )}
//     </td>
//   );
// };

// const Employees = () => {
//   const [form] = Form.useForm();
//   const [data, setData] = useState(employeesData);
//   const [editingKey, setEditingKey] = useState("");
//   const [loading, setLoading] = useState(false);

//   const isEditing = (record) => record.key === editingKey;

//   const edit = (record) => {
//     form.setFieldsValue({
//       name: record.name,
//       department: record.department,
//       position: record.position,
//       email: record.email,
//       address: record.address,
//       phone: record.phone,
//     });
//     setEditingKey(record.key);
//   };

//   const cancel = () => {
//     setEditingKey("");
//   };

//   const save = async (key) => {
//     try {
//       const row = await form.validateFields();
//       const newData = [...data];
//       const index = newData.findIndex((item) => key === item.key);
//       if (index > -1) {
//         const item = newData[index];
//         newData.splice(index, 1, {
//           ...item,
//           ...row,
//         });
//         setData(newData);
//         setEditingKey("");  // Reset the editing state after saving
//       }
//     } catch (errInfo) {
//       console.log("Validate Failed:", errInfo);
//     }
//   };

//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       editable: true,
//       sorter: (a, b) => a.name.localeCompare(b.name),
//     },
//     {
//       title: "Department",
//       dataIndex: "department",
//       editable: true,
//       filters: [
//         { text: "Engineering", value: "Engineering" },
//         { text: "HR", value: "HR" },
//         { text: "Finance", value: "Finance" },
//         { text: "Marketing", value: "Marketing" },
//       ],
//       onFilter: (value, record) => record.department === value,
//     },
//     {
//       title: "Position",
//       dataIndex: "position",
//       editable: true,
//       sorter: (a, b) => a.position.localeCompare(b.position),
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       editable: true,
//     },
//     {
//       title: "Address",
//       dataIndex: "address",
//       editable: true,
//     },
//     {
//       title: "Phone",
//       dataIndex: "phone",
//       editable: true,
//     },
//     {
//       title: "Action",
//       dataIndex: "operation",
//       render: (_, record) => {
//         const editable = isEditing(record);
//         return editable ? (
//           <span>
//             <Typography.Link
//               onClick={() => save(record.key)}
//               style={{
//                 marginInlineEnd: 8,
//               }}
//             >
//               Save
//             </Typography.Link>
//             <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
//               <a>Cancel</a>
//             </Popconfirm>
//           </span>
//         ) : (
//           <Typography.Link
//             disabled={editingKey !== ""}
//             onClick={() => edit(record)}
//           >
//             Edit
//           </Typography.Link>
//         );
//       },
//     },
//   ];

//   const mergedColumns = columns.map((col) => ({
//     ...col,
//     onCell: (record) => ({
//       record,
//       inputType: col.dataIndex === "phone" ? "number" : "text", // Add more types if needed
//       dataIndex: col.dataIndex,
//       title: col.title,
//       editing: isEditing(record),
//     }),
//   }));

//   return (
//     <div style={{ padding: "24px", background: "#f0f2f5", minHeight: "100vh" }}>
//       <Title level={2} style={{ marginBottom: "16px" }}>
//         Employees
//       </Title>

//       <Form form={form} component={false}>
//         <Table
//           components={{
//             body: {
//               cell: EditableCell,
//             },
//           }}
//           bordered
//           dataSource={data}
//           columns={mergedColumns}
//           pagination={{ pageSize: 5 }}
//           loading={loading}
//           rowClassName="editable-row"
//           scroll={{ x: 768 }}
//           responsive
//         />
//       </Form>
//     </div>
//   );
// };

// export default Employees;
