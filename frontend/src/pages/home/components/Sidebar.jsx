import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import FriendRequests from "./FriendRequests";

const Sidebar = () => {
    return (
        // The sidebar is now slightly transparent
        <div className='border-r border-slate-500/50 p-4 flex flex-col bg-base-200/30 w-1/3'>
            <FriendRequests />
            <h2 className="text-xl font-semibold mb-2 mt-4 text-gray-200">Chats</h2>
            <div className='divider px-3 mt-0'></div>
            <div className="flex-1 overflow-auto pr-2">
                <Conversations />
            </div>
            <LogoutButton />
        </div>
    );
};
export default Sidebar;