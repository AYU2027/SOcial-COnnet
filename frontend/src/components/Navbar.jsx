import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import useLogout from "../hooks/useLogout";
import { IoPersonAddOutline } from "react-icons/io5";
import SearchModal from "./SearchModal";

const Navbar = () => {
    const { authUser } = useAuthContext();
    const { loading, logout } = useLogout();
    const modalId = "search_friend_modal"; // A unique ID to control our modal

    return (
        <>
            <header className='absolute top-0 left-0 w-full px-8 py-4 z-10 bg-base-100/90 backdrop-blur-sm shadow-lg'>
                <nav className='navbar p-0'>
                    <div className='flex-1'>
                        {/* Link goes to chat if logged in, otherwise to the landing page */}
                        <Link to={authUser ? '/chat' : '/'} className='btn btn-ghost text-xl'>
                            ChatApp
                        </Link>
                    </div>
                    <div className='flex-none'>
                        {authUser ? (
                            // --- RENDER THIS VIEW IF USER IS LOGGED IN ---
                            <div className="flex items-center gap-4">
                                {/* "Add Friend" Button: opens the modal by its ID */}
                                <button
                                    className="btn btn-ghost btn-circle"
                                    onClick={() => document.getElementById(modalId).showModal()}
                                >
                                    <IoPersonAddOutline className="w-7 h-7" />
                                </button>

                                {/* User Profile Dropdown */}
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
                            // --- RENDER THIS VIEW IF USER IS LOGGED OUT ---
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
            
            {/* 
              The SearchModal component is always rendered here if the user is logged in.
              However, it is invisible by default (display: none) because of the <dialog> element.
              It only becomes visible when its .showModal() method is called by the "Add Friend" button.
            */}
            {authUser && <SearchModal modalId={modalId} />}
        </>
    );
};

export default Navbar;