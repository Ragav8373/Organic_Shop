import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // ✅ add this


export default function Fruits() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // ✅ create navigate function

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + `/products?category=fruits`)
      .then(res => res.json())
      .then(data => setProducts(data.products))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <div className='sec8bg'>
        <h1 className='sec8h1'>Fruits</h1>
        <ul className='sec8ul'>
          <li className='sec8li1'>
            <Link to='/products' style={{ color: '#f8ca38', textDecoration:'none'}} className='link'>Shop</Link>
          </li>
          <li>Fruits</li>
        </ul>
      </div>

      <Container style={{ marginTop: "20px" }}>
          <div className="category-buttons">
            <button className="cat-btn all" onClick={() => navigate("/products")}>All</button>
             <button className="cat-btn fruit" onClick={() => navigate("/fruits")}>Fruit</button>
             <button className="cat-btn vegetables" onClick={() => navigate("/vegetables")}>Vegetables</button>
             <button className="cat-btn spices" onClick={() => navigate("/spices")}>Spices</button>
            <button className="cat-btn dried" onClick={() => navigate("/dried")}>Dried Products</button>
          </div>


        <Row>
          {products?.map(p => (
            <ProductCard key={p._id} product={p} />
          ))}
        </Row>
      </Container>
    </div>
  );
}
