
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch products from the backend
  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/products');
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await fetch(`http://localhost:8000/api/products/${id}`, {
          method: 'DELETE'
        });
        const data = await res.json();
        if (data.success) {
          setProducts(prev => prev.filter(prod => prod._id !== id));
        } else {
          alert('Failed to delete product');
        }
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-product/${id}`);
  };

  const handleAddProduct = () => {
    navigate('/admin/add-product');
  };

  return (


    <div className="admin-product-list">
  <h2>Admin Panel - Products</h2>
  <button className="add-product" onClick={handleAddProduct}>Add Product</button>

  <table>
    <thead>
      <tr>
        <th>Image</th>
        <th>Name</th>
        <th>Price</th>
        <th>Ratings</th>
        <th>Category</th>
        <th>Stock</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {products.map(prod => (
        <tr key={prod._id}>
          <td><img src={prod.images[0]?.image} alt={prod.name} /></td>
          <td>{prod.name}</td>
          <td>₹{prod.price}</td>
          <td>{prod.ratings}</td>
          <td>{prod.category}</td>
          <td>{prod.stock}</td>
          <td className="action-buttons">
            <button onClick={() => handleEdit(prod._id)}>Edit</button>
            <button onClick={() => handleDelete(prod._id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div> 

   );
};

export default AdminProductList;



 