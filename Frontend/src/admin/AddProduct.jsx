import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    ratings: '',
    category: '',
    stock: '',
    description: '',
    image: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const res = await fetch('http://localhost:8000/single', {
        method: 'POST',
        body: data,
      });

      const result = await res.json();
      if (res.ok) {
        alert('Product added successfully!');
        navigate('/admin/products');
      } else {
        alert(result.error || 'Failed to add product');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      <form className="add-product-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
        <input type="number" name="ratings" placeholder="Ratings" step="0.1" onChange={handleChange} />
        <input type="text" name="category" placeholder="Category" onChange={handleChange} />
        <input type="number" name="stock" placeholder="Stock" onChange={handleChange} />
        <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
        <input type="file" name="image" accept="image/*" onChange={handleChange} required />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
