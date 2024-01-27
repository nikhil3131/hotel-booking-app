import { Outlet } from 'react-router-dom';
import { Navbar, Footer } from '../components';

export default function Layout() {
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar /> 
            <Outlet/>
            <Footer />
        </div>
    );
}
