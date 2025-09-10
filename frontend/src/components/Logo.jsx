import { Link } from "react-router-dom";

const Logo = ({ to = '/' }) => {
    return (
        <Link to={to} className='btn btn-ghost text-2xl font-bold'>
            <span className='text-blue-500'>SOcial</span>
            <span className='text-gray-200'>COnnect</span>
        </Link>
    );
};

export default Logo;