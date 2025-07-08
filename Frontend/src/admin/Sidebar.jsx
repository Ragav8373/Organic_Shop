
import { Link } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaProductHunt, 
  FaShoppingBasket, 
  FaUsers 
} from 'react-icons/fa';

export default function Sidebar() {
  return (
    <div className="sidebar-wrapper">
      <nav id="sidebar">
        <ul className="list-unstyled components">
          <li>
            <Link to="/admin/dashboard">
              <FaTachometerAlt style={{ marginRight: '8px' }} />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/products">
              <FaProductHunt style={{ marginRight: '8px' }} />
              Products
            </Link>
          </li>
          <li>
            <Link to="/admin/orders">
              <FaShoppingBasket style={{ marginRight: '8px' }} />
              Orders
            </Link>
          </li>
          <li>
            <Link to="/admin/users">
              <FaUsers style={{ marginRight: '8px' }} />
              Users
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
