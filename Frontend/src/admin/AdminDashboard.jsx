

import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [outOfStock, setOutOfStock] = useState(0);

  useEffect(() => {
    // Products
    fetch('http://localhost:8000/api/products')
      .then(res => res.json())
      .then(data => {
        const productList = data.products || [];
        setProducts(productList);
        const outOfStockCount = productList.filter(p => p.stock === 0).length;
        setOutOfStock(outOfStockCount);
      });

    // Orders
    fetch('http://localhost:8000/api/orders')
      .then(res => res.json())
      .then(data => {
        const orderList = data.orders || [];
        setOrders(orderList);

        const total = orderList.reduce((sum, o) => {
          return sum + o.items.reduce((s, i) => s + i.price * i.qty, 0);
        }, 0);

        setTotalAmount(total);
      });

    // Users
    fetch('http://localhost:8000/api/users/list')
      .then(res => res.json())
      .then(data => {
        const nonAdmins = (data.users || []).filter(u => !u.isAdmin);
        setUsers(nonAdmins);
      });
  }, []);

  return (
    <div className="row adrow">
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>

      <div className="col-12 col-md-10 dashboard">
        <div className="container mt-4">
          <h1 className="dashboard-title">Admin Dashboard</h1>

          <div className="row mb-4">
            <div className="col-12">
              <div className="dash-card card-highlight">
                <h2>Total Amount</h2>
                <p className="amount">₹{totalAmount.toFixed(2)}</p>
              </div>
            </div>
          </div>

          
          <div className="row">
            <div className="col-md-3 col-sm-6 mb-4">
              <div className="dash-card bg-green">
                <h4>Products</h4>
                <p>{products.length}</p>
              </div>
            </div>

            <div className="col-md-3 col-sm-6 mb-4">
              <div className="dash-card bg-blue">
                <h4>Orders</h4>
                <p>{orders.length}</p>
              </div>
            </div>

            <div className="col-md-3 col-sm-6 mb-4">
              <div className="dash-card bg-purple">
                <h4>Users</h4>
                <p>{users.length}</p>
              </div>
            </div>

            <div className="col-md-3 col-sm-6 mb-4">
              <div className="dash-card bg-orange">
                <h4>Out of Stock</h4>
                <p>{outOfStock}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
