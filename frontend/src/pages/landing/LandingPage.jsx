import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="text-center">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-500 pb-4">
                    Welcome to ChatApp
                </h1>
                <p className="py-6 text-lg text-gray-300">
                    Connect and communicate in real-time. A seamless, fast, and modern messaging experience built for you. Join conversations, share moments, and stay in touch.
                </p>
                <Link to='/signup' className="btn btn-primary btn-lg">
                    Get Started
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;