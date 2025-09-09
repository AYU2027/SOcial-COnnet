import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import useLogout from "../hooks/useLogout";
import { IoAddCircleOutline } from "react-icons/io5"; // Icon for "Add Friend"

const Navbar = () => {
    const { authUser } = useAuthContext();
    const { loading, logout } = useLogout();

    return (
        // Added shadow and slight transparency for a modern look
        <header className='absolute top-0 left-0 w-full px-8 py-4 z-10 bg-base-100/90 backdrop-blur-sm shadow-lg'>
            <nav className='navbar p-0'>
                <div className='flex-1'>
                    <Link to={authUser ? '/chat' : '/'} className='btn btn-ghost text-xl'>
                        ChatApp
                    </Link>
                </div>
                <div className='flex-none'>
                    {authUser ? (
                        // --- Logged-In View ---
                        <div className="flex items-center gap-4">
                            {/* "Add Friend" Button (UI only for now) */}
                            <button className="btn btn-ghost btn-circle" onClick={() => alert("Add Friend functionality to be built!")}>
                                <IoAddCircleOutline className="w-7 h-7" />
                            </button>

                            {/* Logout Button and User Info */}
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt="User Profile" src={authUser.profilePic} />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                    <li>
                                        <a className="justify-between">
                                            Profile
                                            <span className="badge">New</span>
                                        </a>
                                    </li>
                                    <li><a>Settings</a></li>
                                    <li>
                                        <a onClick={logout}>
                                            {loading ? <span className="loading loading-spinner"></span> : "Logout"}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        // --- Logged-Out View ---
                        <ul className='menu menu-horizontal px-1'>
                            <li>
                                <Link to='/login' className='btn btn-ghost'>Login</Link>
                            </li>
                            <li>
                                <Link to='/signup' className='btn btn-primary ml-2'>Sign Up</Link>
                            </li>
                        </ul>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;