import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import useLogout from "../hooks/useLogout";
import { IoPersonAddOutline } from "react-icons/io5";
import SearchModal from "./SearchModal";
import Logo from "./Logo";

const Navbar = () => {
    const { authUser } = useAuthContext();
    const { loading, logout } = useLogout();
    const modalId = "search_friend_modal";

    return (
        <>
            {/* The header is now fully transparent and uses white/light text for contrast */}
            <header className='absolute top-0 left-0 w-full px-4 sm:px-8 py-3 z-10'>
                <nav className='navbar p-0 max-w-7xl mx-auto'>
                    <div className='flex-1'>
                        {/* The Logo component already fits the design well */}
                        <Logo to={authUser ? '/chat' : '/'} />
                    </div>
                    <div className='flex-none'>
                        {authUser ? (
                            // --- Logged-In View ---
                            <div className="flex items-center gap-4 text-white">
                                <button
                                    className="btn btn-ghost btn-circle"
                                    onClick={() => document.getElementById(modalId).showModal()}
                                    title="Add Friend"
                                >
                                    <IoPersonAddOutline className="w-7 h-7" />
                                </button>
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar online">
                                        <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img alt="User Profile" src={authUser.profilePic} />
                                        </div>
                                    </div>
                                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 text-base-content rounded-box w-52">
                                        <li><a>Profile</a></li>
                                        <li><a>Settings</a></li>
                                        <div className="divider my-1"></div>
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
                            <ul className='menu menu-horizontal px-1 items-center'>
                                <li>
                                    <Link to='/login' className='btn btn-ghost text-white'>Login</Link>
                                </li>
                                <li>
                                    {/* Using a semi-transparent white button for a modern feel */}
                                    <Link to='/signup' className='btn bg-white bg-opacity-20 text-white border-none hover:bg-opacity-30 ml-2'>
                                        Get Started
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </nav>
            </header>
            {authUser && <SearchModal modalId={modalId} />}
        </>
    );
};

export default Navbar;