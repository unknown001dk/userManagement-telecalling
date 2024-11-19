import React from "react";
import "../styles/UserTable.css";

const UserTable = ({ users, handleEdit, handleDelete, handleExport }) => {
  return (
    <div className="table-container">
      <button className="export-button" onClick={handleExport}>
        Export to Excel
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.status}</td>
              <td>{user.notes}</td>
              <td className="action-buttons">
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
