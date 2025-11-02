

import { Container, Row } from 'react-bootstrap';
import ProductCard from './ProductCard';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ add this

function Shop() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // ✅ create navigate function

  const fetchProducts = (category) => {
    let url = process.env.REACT_APP_API_URL + '/products';
    if (category) url += `?category=${category}`;

    fetch(url)
      .then(res => res.json())
      .then(res => setProducts(res.products));
  };

  useEffect(() => {
    fetchProducts(); // Load all by default
  }, []);

  return (
    <Fragment>
      <div className='sec5'>
        <Container className='sec5container'>

          {/* Category buttons */}
           <div className="category-buttons">
            <button className="cat-btn all" onClick={() => navigate("/products")}>All</button>
             <button className="cat-btn fruit" onClick={() => navigate("/fruits")}>Fruit</button>
             <button className="cat-btn vegetables" onClick={() => navigate("/vegetables")}>Vegetables</button>
             <button className="cat-btn spices" onClick={() => navigate("/spices")}>Spices</button>
            <button className="cat-btn dried" onClick={() => navigate("/dried")}>Dried Products</button>
          </div>

          <Row className='sec5r1'>
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </Row>
        </Container>
      </div>
    </Fragment>
  );
}

export default Shop;
