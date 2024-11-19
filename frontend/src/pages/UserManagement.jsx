import React, { useEffect, useState } from "react";
import axios from "axios";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";
import { Doughnut } from "react-chartjs-2"; // Use Doughnut chart
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "../styles/UserManagement.css";

// Register the required chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

const UserManagement = () => {
  const [users, setUsers] = useState([]); // Ensure initial state is an array
  const [formData, setFormData] = useState({ name: "", phone: "", status: "", notes: "" });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users using Axios
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/users");
      console.log("API Response:", response.data);

      // Handle different response structures
      const userArray = Array.isArray(response.data)
        ? response.data
        : response.data.users || []; // Adjust based on the API response
      setUsers(userArray);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        // Update user with Axios PUT request
        await axios.put(`http://localhost:8081/api/users/${editingUser._id}`, formData);
        alert("User updated successfully!");
      } else {
        // Add user with Axios POST request
        await axios.post("http://localhost:8081/api/users", formData);
        alert("User added successfully!");
      }
      setFormData({ name: "", phone: "", status: "", notes: "" });
      setEditingUser(null);
      fetchUsers(); // Refresh the users list after adding/updating
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEdit = (user) => {
    setFormData({
      name: user.name,
      phone: user.phone,
      status: user.status,
      notes: user.notes,
    });
    setEditingUser(user);
  };

  const handleDelete = async (id) => {
    try {
      // Delete user with Axios DELETE request
      await axios.delete(`http://localhost:8081/api/users/${id}`);
      alert("User deleted successfully!");
      fetchUsers(); // Refresh the users list after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleExport = async () => {
    try {
      // Export data using Axios GET request with responseType 'blob'
      const response = await axios.get("http://localhost:8081/api/export", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "users.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  };

  // Count the occurrences of each status
  const statusCounts = {
    "Not attending": 0,
    "Not interested": 0,
    "Coming": 0,
    "Call back": 0,
  };

  if (Array.isArray(users)) {
    users.forEach((user) => {
      if (statusCounts[user.status] !== undefined) {
        statusCounts[user.status]++;
      }
    });
  } else {
    console.error("Users data is not an array:", users);
  }

  // Data for the Doughnut chart
  const chartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="user-management-container">
      <h1>User Management</h1>
      <UserForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        editingUser={editingUser}
      />
      <UserTable
        users={users}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleExport={handleExport}
      />

      <div className="chart-container">
        <h2>Status Analysis</h2>
        <Doughnut data={chartData} />
      </div>
    </div>
  );
};

export default UserManagement;
