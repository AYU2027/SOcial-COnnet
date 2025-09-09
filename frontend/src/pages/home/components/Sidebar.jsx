import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";

const Sidebar = () => {
    return (
        <div className='border-r border-slate-500 p-4 flex flex-col'>
            {/* We will build the search functionality later */}
            <form className='flex items-center gap-2'>
                <input type='text' placeholder='Search…' className='input input-bordered rounded-full' />
                <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
                    {/* Search Icon will go here */}
                </button>
            </form>

            <div className='divider px-3'></div>
            
            <Conversations />
            
            <LogoutButton />
        </div>
    );
};
export default Sidebar;