import { createSlice } from "@reduxjs/toolkit";
import employeesData from "../sampleData/employeesData.js";

const initialState = {
  employees: employeesData,
};

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setEmployees: (state, action) => {
      state.employees = action.payload;
    },
    updateEmployee: (state, action) => {
      const updatedEmployee = action.payload;
      const index = state.employees.findIndex(
        (employee) => employee.key === updatedEmployee.key
      );
      if (index !== -1) {
        state.employees[index] = updatedEmployee;
      }
    },
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
    },
    deleteEmployee: (state, action) => {
      const keysToDelete = action.payload;
      state.employees = state.employees.filter(
        (employee) => !keysToDelete.includes(employee.key)
      );
    },
  },
});

export const { setEmployees, updateEmployee, addEmployee, deleteEmployee } =
  employeesSlice.actions;

export default employeesSlice.reducer;
