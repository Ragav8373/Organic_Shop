import React from "react";
import { useForm } from "react-hook-form";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Checkout = ({ cartItems = [], setCartItems }) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();
  const paymentMethod = watch("paymentMethod");

  const handleCheckout = async (data) => {
    try {
      const payload = {
        ...data,
        cartItems: cartItems.map(item => ({
          productId: item.product._id,
          name: item.product.name,
          price: item.product.price,
          qty: item.qty,
        })),
        totalItems: cartItems.reduce((acc, item) => acc + item.qty, 0),
        totalPrice: cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0),
      };

      const res = await fetch('http://localhost:8000/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        localStorage.setItem('deliveryId', result.deliveryId);
        localStorage.setItem('deliveryDetails', JSON.stringify(payload));
        alert('✅ Order placed successfully!');

        // ✅ Clear cart after successful checkout
        localStorage.removeItem('cartItems');
        if (typeof setCartItems === 'function') setCartItems([]);

        // ✅ Redirect to home page
        navigate('/');
      } else {
        alert(result.message || 'Failed to save details.');
      }
    } catch (err) {
      console.error('Checkout Error:', err);
      alert('Something went wrong while saving your order.');
    }
  };

  // If cart is empty
  if (cartItems.length === 0) {
    return (
      <Container className="mt-5">
        <h2 className="text-center">Your cart is empty!</h2>
        <div className="text-center mt-3">
          <button onClick={() => navigate('/products')} className="btn btn-primary">
            Go to Products
          </button>
        </div>
      </Container>
    );
  }

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0);

  return (
    <Container className="mt-5 mb-5 checkout-container" style={{ maxWidth: '800px' }}>
      <h2 className="text-center mb-4">Delivery Details</h2>

      <form onSubmit={handleSubmit(handleCheckout)} className="checkout-form">
        {/* Name Fields */}
        <Row className="mb-3">
          <Col md={6}>
            <label className="form-label">First Name *</label>
            <input 
              type="text"
              className="form-control"
              {...register("firstName", { required: "First name is required" })}
            />
            <small className="text-danger">{errors.firstName?.message}</small>
          </Col>
          <Col md={6}>
            <label className="form-label">Last Name *</label>
            <input 
              type="text"
              className="form-control"
              {...register("lastName", { required: "Last name is required" })}
            />
            <small className="text-danger">{errors.lastName?.message}</small>
          </Col>
        </Row>

        {/* Mobile Number */}
        <Row className="mb-3">
          <Col>
            <label className="form-label">Mobile Number *</label>
            <input 
              type="tel"
              className="form-control"
              {...register("mobile", { 
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Mobile number must be 10 digits"
                }
              })}
            />
            <small className="text-danger">{errors.mobile?.message}</small>
          </Col>
        </Row>

        {/* Street Address */}
        <Row className="mb-3">
          <Col>
            <label className="form-label">Street Address *</label>
            <input 
              type="text"
              className="form-control"
              placeholder="House No., Building Name, Street"
              {...register("street", { required: "Street address is required" })}
            />
            <small className="text-danger">{errors.street?.message}</small>
          </Col>
        </Row>

        {/* City, State, Pincode */}
        <Row className="mb-3">
          <Col md={4}>
            <label className="form-label">City *</label>
            <input 
              type="text"
              className="form-control"
              {...register("city", { required: "City is required" })}
            />
            <small className="text-danger">{errors.city?.message}</small>
          </Col>
          <Col md={4}>
            <label className="form-label">State *</label>
            <input 
              type="text"
              className="form-control"
              {...register("state", { required: "State is required" })}
            />
            <small className="text-danger">{errors.state?.message}</small>
          </Col>
          <Col md={4}>
            <label className="form-label">Pincode *</label>
            <input 
              type="text"
              className="form-control"
              {...register("pincode", { 
                required: "Pincode is required",
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "Pincode must be 6 digits"
                }
              })}
            />
            <small className="text-danger">{errors.pincode?.message}</small>
          </Col>
        </Row>

        {/* Landmark (Optional) */}
        <Row className="mb-3">
          <Col>
            <label className="form-label">Landmark (Optional)</label>
            <input 
              type="text"
              className="form-control"
              placeholder="Near hospital, mall, etc."
              {...register("landmark")}
            />
          </Col>
        </Row>

        {/* Payment Method */}
        <Row className="mb-4">
          <Col>
            <label className="form-label d-block mb-2">Payment Method *</label>
            <div className="form-check form-check-inline">
              <input 
                type="radio"
                className="form-check-input me-2"
                id="cod"
                value="COD"
                {...register("paymentMethod", { required: "Please select a payment method" })}
              />
              <label className="form-check-label" htmlFor="cod ">Cash on Delivery</label>
            </div>
            <div className="form-check form-check-inline">
              <input 
                type="radio"
                className="form-check-input me-2"
                id="online"
                value="Online"
                {...register("paymentMethod", { required: "Please select a payment method" })}
              />
              <label className="form-check-label" htmlFor="online ">Online Payment</label>
            </div>
            <br />
            <small className="text-danger">{errors.paymentMethod?.message}</small>
          </Col>
        </Row>

        {paymentMethod === "Online" && (
          <div className="alert alert-info">
            <strong>Note:</strong> You will be redirected to payment gateway after confirming the order.
          </div>
        )}

        <Row>
          <Col className="text-center">
            <button type="submit" className="btn btn-success btn-lg px-5">
              Proceed to Confirm Order
            </button>
          </Col>
        </Row>
      </form>
    </Container>
  );
};

export default Checkout;
