import React, { useEffect, useState } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/users/list')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.users)) {
          const nonAdmins = data.users.filter(user => !user.isAdmin);
          setUsers(nonAdmins);
        } else {
          console.error("Invalid response structure:", data);
        }
      })
      .catch(err => {
        console.error("Error fetching users:", err);
      });
  }, []);

  return (
    <div className="container user-list-container">
      <h3 className="user-list-title">User List</h3>
      <div className="table-responsive">
        <table className="table user-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>City</th>
              <th>Country</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">No users found.</td>
              </tr>
            ) : (
              users.map((u, i) => (
                <tr key={u._id}>
                  <td>{i + 1}</td>
                  <td>{u.firstname} {u.lastname}</td>
                  <td>{u.email}</td>
                  <td>{u.number}</td>
                  <td>{u.address || '-'}</td>
                  <td>{u.city || '-'}</td>
                  <td>{u.country || '-'}</td>
                  <td>{u.gender || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
