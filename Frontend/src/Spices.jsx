import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';

export default function Spices() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + `/products?category=spices`)
      .then(res => res.json())
      .then(data => setProducts(data.products))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <div className='sec8bg'>
        <h1 className='sec8h1'>Spices</h1>
        <ul className='sec8ul'>
          <li className='sec8li1'>
            <Link to='/products' style={{ color: '#f8ca38', textDecoration:'none'}} className='link'>Shop</Link>
          </li>
          <li>Spices</li>
        </ul>
      </div>

      <Container style={{ marginTop: "20px" }}>
        <Row>
          {products?.map(p => (
            <ProductCard key={p._id} product={p} />
          ))}
        </Row>
      </Container>
    </div>
  );
}
