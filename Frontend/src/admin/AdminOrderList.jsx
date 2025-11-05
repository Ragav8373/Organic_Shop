// import React, { useEffect, useState } from 'react';

// const AdminOrderList = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await fetch('http://localhost:8000/api/orders');
//         const data = await res.json();
//         if (data.success) {
//           setOrders(data.orders);
//         }
//       } catch (err) {
//         console.error("Error fetching orders:", err);
//       }
//     };

//     fetchOrders();
//   }, []);

//   return (
//     <div className="order-list-container">
//       <h2>Order List</h2>
//       {orders.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         <table className="order-table">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Order Date</th>
//               <th>Items</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order, index) => (
//               <tr key={order._id}>
//                 <td>{index + 1}</td>
//                 <td>{new Date(order.createdAt).toLocaleString()}</td>
//                 <td>
//                   <table className="inner-table">
//                     <thead>
//                       <tr>
//                         <th>Image</th>
//                         <th>Name</th>
//                         <th>Price</th>
//                         <th>Qty</th>
//                         <th>Total</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {order.items.map((item, i) => (
//                         <tr key={i}>
//                           <td><img src={item.images?.[0]?.image} alt={item.name} width="50" /></td>
//                           <td>{item.name}</td>
//                           <td>₹{item.price}</td>
//                           <td>{item.qty}</td>
//                           <td>₹{item.price * item.qty}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default AdminOrderList;
import React, { useEffect, useState } from "react";

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/admin/orders");
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
    <div className="order-list-container" style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Order List</h2>

      {orders.length === 0 ? (
        <p style={{ textAlign: "center" }}>No orders found.</p>
      ) : (
        <table
          className="order-table"
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr style={{ background: "#f0f0f0" }}>
              <th>#</th>
              <th>Username</th>
              <th>Contact Number</th>
              <th>Delivery Address</th>
              <th>Items</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              const orderTotal = order.items.reduce(
                (sum, item) => sum + item.price * item.qty,
                0
              );

              return (
                <tr key={order.orderId} style={{ borderBottom: "1px solid #ddd" }}>
                  <td>{index + 1}</td>
                  <td>{order.username}</td>
                  <td>{order.contactNumber}</td>
                  <td>{order.deliveryAddress}</td>
                  <td>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead>
                        <tr style={{ background: "#fafafa" }}>
                          <th>Product ID</th>
                          <th>Name</th>
                          <th>Price</th>
                          <th>Qty</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map((item, i) => (
                          <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                            <td>{item.productId}</td>
                            <td>{item.name}</td>
                            <td>₹{item.price}</td>
                            <td>{item.qty}</td>
                            <td>₹{item.price * item.qty}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                  <td>₹{orderTotal}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminOrderList;
