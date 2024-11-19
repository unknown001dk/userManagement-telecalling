import React from "react";
import "../styles/UserForm.css";

const UserForm = ({ formData, setFormData, handleSubmit, editingUser }) => {
  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />
      <select
        value={formData.status}
        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
      >
        <option value="" disabled>Select Status</option>
        <option value="Not attending">Not attending</option>
        <option value="Not interested">Not interested</option>
        <option value="Coming">Coming</option>
        <option value="Call back">Call back</option>
      </select>
      <textarea
        placeholder="Notes"
        value={formData.notes}
        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
      />
      <button type="submit">{editingUser ? "Update" : "Add"} User</button>
    </form>
  );
};

export default UserForm;
