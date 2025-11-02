import { Outlet } from 'react-router-dom'; 
import Section11  from './Section11';
import Shop from './Shop';
import Footer from './Footer';

function Products(){
    return(
        <div>
            <Section11/>
            <Shop/>
            <Footer/>
            <Outlet/>
        </div>
    )
}
export default Products;