// src/components/UserForm.js
import React, { useState, useEffect } from 'react';
import './UserForm.css';

const UserForm = ({ onSaveUser, selectedUser, clearSelectedUser }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (selectedUser) {
      setName(selectedUser.name);
      setPhone(selectedUser.phone);
      setStatus(selectedUser.status);
      setNotes(selectedUser.notes);
    } else {
      setName('');
      setPhone('');
      setStatus('');
      setNotes('');
    }
  }, [selectedUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name, phone, status, notes };
    onSaveUser(userData, selectedUser ? selectedUser._id : null);
    clearForm();
  };

  const clearForm = () => {
    setName('');
    setPhone('');
    setStatus('');
    setNotes('');
    clearSelectedUser();
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="text"
        placeholder="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button type="submit" className="save-button">
        {selectedUser ? 'Update User' : 'Add User'}
      </button>
      {selectedUser && (
        <button type="button" onClick={clearForm} className="cancel-button">
          Cancel
        </button>
      )}
    </form>
  );
};

export default UserForm;
