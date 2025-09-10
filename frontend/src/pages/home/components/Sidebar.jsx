import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";

const Sidebar = () => {
    return (
        <div className='border-r border-slate-500 p-4 flex flex-col'>
            {/* SearchInput has been removed */}
            <h2 className="text-lg font-semibold mb-2">Friends</h2>
            <div className='divider px-3 mt-0'></div>
            <Conversations />
            <LogoutButton />
        </div>
    );
};
export default Sidebar;