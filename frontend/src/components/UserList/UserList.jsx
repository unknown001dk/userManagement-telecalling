import React from 'react';
import './UserList.css';

const UserList = ({ users, deleteUser, editUser }) => {
  return (
    <div className="user-list-container">
      <h2 className="user-list-title">User List</h2>
      <table className="user-table">
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
            <tr key={user._id} className="user-row">
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.status}</td>
              <td>{user.notes}</td>
              <td>
                <button onClick={() => editUser(user)} className="edit-button">
                  Edit
                </button>
                <button onClick={() => deleteUser(user._id)} className="delete-button">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
