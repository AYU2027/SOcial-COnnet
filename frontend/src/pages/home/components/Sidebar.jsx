import LogoutButton from "./LogoutButton";

const Sidebar = () => {
    return (
        <div className='border-r border-slate-500 p-4 flex flex-col'>
            {/* SearchInput will go here */}
            <div className='divider px-3'></div>
            {/* Conversations will go here */}
            <LogoutButton />
        </div>
    );
};
export default Sidebar;