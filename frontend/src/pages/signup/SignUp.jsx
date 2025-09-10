import { Link } from "react-router-dom";
import GenderCheckbox from "../../components/GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";
import { FaTelegramPlane } from "react-icons/fa";

const SignUp = () => {
    const [inputs, setInputs] = useState({
        fullName: "", username: "", password: "", confirmPassword: "", gender: "",
    });
    const { loading, signup } = useSignup();
    const handleCheckboxChange = (gender) => setInputs({ ...inputs, gender });
    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(inputs);
    };

    return (
        <div className='flex flex-col items-center justify-center w-full max-w-md px-4'>
            <FaTelegramPlane className="text-6xl text-white mb-6" />
            <h1 className='text-3xl font-semibold text-center text-gray-200 mb-8'>
                Create your Account
            </h1>
            
            <form onSubmit={handleSubmit} className="w-full">
                <div className="grid grid-cols-2 gap-4">
                    <input type='text' placeholder='Full Name' className='input input-bordered h-12 bg-gray-700/50 rounded-lg col-span-2' value={inputs.fullName} onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })} />
                    <input type='text' placeholder='Username' className='input input-bordered h-12 bg-gray-700/50 rounded-lg col-span-2' value={inputs.username} onChange={(e) => setInputs({ ...inputs, username: e.target.value })} />
                    <input type='password' placeholder='Password' className='input input-bordered h-12 bg-gray-700/50 rounded-lg' value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} />
                    <input type='password' placeholder='Confirm Password' className='input input-bordered h-12 bg-gray-700/50 rounded-lg' value={inputs.confirmPassword} onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })} />
                </div>
                <div className="mt-4">
                    <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />
                </div>
                <div className="mt-6">
                    <button className='btn btn-info btn-block h-12 rounded-lg text-lg' disabled={loading}>
                        {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
                    </button>
                </div>
                <div className="text-center mt-6">
                    <Link to='/login' className='text-sm text-gray-400 hover:underline hover:text-blue-400'>
                        Already have an account? Login
                    </Link>
                </div>
            </form>
        </div>
    );
};
export default SignUp;