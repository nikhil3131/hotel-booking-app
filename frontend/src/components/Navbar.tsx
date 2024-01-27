import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

export default function Navbar() {
    return (
        <nav className="flex justify-between px-6 py-2">
            {/* logo */}
            <Link to="/">
                <img src={logo} alt="website-logo" width={55} />
            </Link>

            {/* navigation links */}
            <ul className='flex space-x-40'>
                <li>
                    <Link to="/">SignIn</Link>
                </li>
            </ul>
        </nav>
    );
}
