

import React, { useEffect, useState } from 'react';

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/orders');
        const data = await res.json();
        if (data.success) {
          setOrders(data.orders);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="order-list-container">
      <h2>Order List</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Order Date</th>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>
                  <table className="inner-table">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, i) => (
                        <tr key={i}>
                          <td><img src={item.images?.[0]?.image} alt={item.name} width="50" /></td>
                          <td>{item.name}</td>
                          <td>₹{item.price}</td>
                          <td>{item.qty}</td>
                          <td>₹{item.price * item.qty}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminOrderList;
