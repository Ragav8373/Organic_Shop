import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/products/${id}`);
        const data = await res.json();

        if (res.ok && data.success) {
          setProduct({
            name: data.product.name || '',
            price: data.product.price || '',
            category: data.product.category || '',
            stock: data.product.stock || ''
          });
        } else {
          alert("Product not found");
          navigate("/admin/products");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        alert("Error loading product");
        navigate("/admin/products");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:8000/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert("Product updated successfully");
        navigate("/admin/products");
      } else {
        alert(data.message || "Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Something went wrong while updating the product");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (

    <form onSubmit={handleSubmit} className="edit-product-form">
  <h2 className="edit-product-title">Edit Product</h2>

  <input
    type="text"
    name="name"
    value={product.name}
    onChange={handleChange}
    placeholder="Name"
    className="edit-input"
    required
  /><br />

  <input
    type="number"
    name="price"
    value={product.price}
    onChange={handleChange}
    placeholder="Price"
    className="edit-input"
    required
  /><br />

  <input
    type="text"
    name="category"
    value={product.category}
    onChange={handleChange}
    placeholder="Category"
    className="edit-input"
    required
  /><br />

  <input
    type="number"
    name="stock"
    value={product.stock}
    onChange={handleChange}
    placeholder="Stock"
    className="edit-input"
    required
  /><br />

  <button type="submit" className="edit-btn">Update Product</button>
</form>

  );
};

export default EditProduct;
