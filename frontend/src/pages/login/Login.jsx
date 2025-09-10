import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import { FaTelegramPlane } from "react-icons/fa";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { loading, login } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password);
    };

    return (
        <div className='flex flex-col items-center justify-center w-full max-w-md px-4'>
            <FaTelegramPlane className="text-6xl text-white mb-6" />
            <h1 className='text-3xl font-semibold text-center text-gray-200 mb-2'>
                Sign in to <span className='font-bold'>SOcial</span><span className='font-light'>COnnect</span>
            </h1>
            <p className="text-gray-400 mb-8">Welcome back!</p>
            
            <form onSubmit={handleSubmit} className="w-full">
                <div className="form-control">
                    <input
                        type='text'
                        placeholder='Username'
                        className='input input-bordered h-12 w-full bg-gray-700/50 rounded-lg text-lg'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-control mt-4">
                    <input
                        type='password'
                        placeholder='Password'
                        className='input input-bordered h-12 w-full bg-gray-700/50 rounded-lg text-lg'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mt-6">
                    <button className='btn btn-info btn-block h-12 rounded-lg text-lg' disabled={loading}>
                        {loading ? <span className="loading loading-spinner"></span> : "Login"}
                    </button>
                </div>
                <div className="text-center mt-6">
                    <Link to='/signup' className='text-sm text-gray-400 hover:underline hover:text-blue-400'>
                        Don't have an account? Sign Up
                    </Link>
                </div>
            </form>
        </div>
    );
};
export default Login;