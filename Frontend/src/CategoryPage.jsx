import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Container, Row } from "react-bootstrap";

export default function CategoryPage() {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(`${process.env.REACT_APP_API_URL}/products?category=${name}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [name]);

  return (
    <Container style={{ marginTop: "20px" }}>
      <h2 style={{ textTransform: "capitalize" }}>{name} Products</h2>

      {loading ? (
        <p>Loading...</p>
      ) : products.length > 0 ? (
        <Row>
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </Row>
      ) : (
        <p>No products found in "{name}" category</p>
      )}
    </Container>
  );
}
