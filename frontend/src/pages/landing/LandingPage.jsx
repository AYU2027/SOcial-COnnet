import { Link } from "react-router-dom";
import { FaTelegramPlane } from "react-icons/fa"; // Using Telegram's own icon

const LandingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center text-white text-center px-4">
            
            <FaTelegramPlane className="text-8xl md:text-9xl mb-8" />
            
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
                <span className='font-bold'>SOcial</span><span className='font-light text-gray-300'>COnnect</span>
            </h1>

            <p className="max-w-xl text-lg md:text-xl text-gray-300 mb-10">
                A new era of messaging. Fast, secure, and built for the modern web.
            </p>

            <Link
                to='/signup'
                className="btn btn-info btn-lg rounded-full shadow-lg hover:scale-105 transform transition-transform duration-300 px-10"
            >
                Start Messaging
            </Link>

        </div>
    );
};

export default LandingPage;