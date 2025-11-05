// import 'bootstrap/dist/css/bootstrap.min.css';
// import './Nav.css';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './Header';
// import One from './Nav'
// import Home from './Home';
// import About from './About';
// import Services from './Services';
// import Products from './Products';
// import Contact from './Contact';
// import Cart from './Cart';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
// import ProductDetail from './ProductDetails';
// import { useState } from 'react';
// import {ToastContainer} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import RegisterForm from './Form';
// import LoginForm from './LoginForm';
// import OrderSummary from './OrderSummary';
// import AddProduct from './admin/AddProduct';
// import AdminDashboard from './admin/AdminDashboard';
// import AdminLogin from './admin/AdminLogin';
// import AdminOrderList from './admin/AdminOrderList';
// import EditProduct from './admin/EditProduct';
// import ProductList from './admin/ProductList';
// import UserList from './admin/UserList';
// import Sidebar from './admin/Sidebar';
// import Checkout from './Checkout';
// import Shop from './Shop';
// import Fruits from './Fruits';
// import Spices from './Spices';
// import Vegetables from './Vegetables'
// import DriedProducts from './DriedProducts'
// import CategoryPage from './CategoryPage';


// function App() {

// const [cartItems, setCartItems] = useState(
//   JSON.parse(localStorage.getItem('cartItems')) || []
// );

//   return (
//      <div>
//     <Router>
//       <div>
//       <Header />
//       </div>
//       <div className='ten'>
//         <ToastContainer theme='dark' position="top-center"/>
//       <One cartItems={cartItems}/>
//       </div>
//       <Routes>
//         <Route path="/" element={<Home />}/>
//         <Route path="/about" element={<About />} />
//         <Route path="/services" element={<Services />} />
//         <Route path="/products" element={<Products />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/product/:id" element={<ProductDetail cartItems={cartItems} setCartItems={setCartItems}/>}/>
//          <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems}/>}/>
//          <Route path='/register' element={<RegisterForm/>}/>
//          <Route path='/login' element={<LoginForm/>}/>
//          <Route path='/order-summary' element={<OrderSummary cartItems={cartItems} setCartItems={setCartItems}/>}/>
//           <Route path='/addproduct' element={<AddProduct cartItems={cartItems} setCartItems={setCartItems}/>}/>
//           <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
//           <Route path='/admin/login' element={<AdminLogin/>}/>
//           <Route path='/admin/orders' element={<AdminOrderList/>}/>
//           <Route path='/editproduct' element={<EditProduct/>}/>
//           <Route path='/admin/products' element={<ProductList/>}/>
//           <Route path='/sidebar' element={<Sidebar/>}/>
//           <Route path='/admin/users' element={<UserList/>}/>
//           {/* <Route path="/checkout" element={<Checkout cartItems={cartItems} />} /> */}
//           <Route path="/checkout" element={<Checkout cartItems={cartItems} setCartItems={setCartItems} />} />

//           <Route path="/order-summary" element={<OrderSummary cartItems={cartItems} setCartItems={setCartItems} />} />
//           <Route path='/shop' element={<Shop/>}/>
//            <Route path='/fruits' element={<Fruits/>}/>
//           <Route path='/vegetables' element={<Vegetables/>}/>
//           <Route path='/spices' element={<Spices/>}/>
//            <Route path='/dried' element={<DriedProducts/>}/>
//           <Route path="/category/:name" element={<CategoryPage />} />


//       </Routes>
//     </Router>
//     <Router>
//     </Router>
//     </div>
//   );
// }

// export default App;

import 'bootstrap/dist/css/bootstrap.min.css';
import './Nav.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import One from './Nav';
import Home from './Home';
import About from './About';
import Services from './Services';
import Products from './Products';
import Contact from './Contact';
import Cart from './Cart';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import ProductDetail from './ProductDetails';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterForm from './Form';
import LoginForm from './LoginForm';
import OrderSummary from './OrderSummary';
import AddProduct from './admin/AddProduct';
import AdminDashboard from './admin/AdminDashboard';
import AdminLogin from './admin/AdminLogin';
import AdminOrderList from './admin/AdminOrderList';
import EditProduct from './admin/EditProduct';
import ProductList from './admin/ProductList';
import UserList from './admin/UserList';
import Sidebar from './admin/Sidebar';
import Checkout from './Checkout';
import Shop from './Shop';
import Fruits from './Fruits';
import Spices from './Spices';
import Vegetables from './Vegetables';
import DriedProducts from './DriedProducts';
import CategoryPage from './CategoryPage';
import ProtectedAdminRoute from './admin/ProtectedAdminRoute';

function App() {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem('cartItems')) || []
  );

  return (
    <div>
      <Router>
        <Header />
        <div className="ten">
          <ToastContainer theme="dark" position="top-center" />
          <One cartItems={cartItems} />
        </div>

        <Routes>
          {/* Customer routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/product/:id"
            element={<ProductDetail cartItems={cartItems} setCartItems={setCartItems} />}
          />
          <Route
            path="/cart"
            element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
          />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/order-summary"
            element={<OrderSummary cartItems={cartItems} setCartItems={setCartItems} />}
          />
          <Route
            path="/checkout"
            element={<Checkout cartItems={cartItems} setCartItems={setCartItems} />}
          />
          <Route path="/shop" element={<Shop />} />
          <Route path="/fruits" element={<Fruits />} />
          <Route path="/vegetables" element={<Vegetables />} />
          <Route path="/spices" element={<Spices />} />
          <Route path="/dried" element={<DriedProducts />} />
          <Route path="/category/:name" element={<CategoryPage />} />

          {/* ✅ Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/addproduct"
            element={
              <ProtectedAdminRoute>
                <AddProduct />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/editproduct/:id"
            element={
              <ProtectedAdminRoute>
                <EditProduct />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedAdminRoute>
                <AdminOrderList />
              </ProtectedAdminRoute>
            }
          /> 
          <Route
            path="/admin/products"
            element={
              <ProtectedAdminRoute>
                <ProductList />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedAdminRoute>
                <UserList />
              </ProtectedAdminRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

