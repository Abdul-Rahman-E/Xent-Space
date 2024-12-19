import React, { useState } from "react";
import { Form } from "antd";
import EmployeeTable from "../components/EmployeeTable";

const Employees = () => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

  return (
    <Form form={form} component={false}>
      <EmployeeTable
        form={form}
        editingKey={editingKey}
        setEditingKey={setEditingKey}
      />
    </Form>
  );
};

export default Employees;

