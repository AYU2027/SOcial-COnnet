import { useSocketContext } from "../../../context/SocketContext";
import useConversation from "../../../zustand/useConversation";

const Conversation = ({ user, isLast }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const isSelected = selectedConversation?._id === user._id;

    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(user._id);

    return (
        <>
            <div
                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors duration-200
                    ${isSelected ? "bg-sky-500" : "hover:bg-sky-500/50"}
                `}
                onClick={() => setSelectedConversation(user)}
            >
                <div className={`avatar ${isOnline ? "online" : ""}`}>
                    <div className='w-12 rounded-full'>
                        <img src={user.profilePic} alt='user avatar' />
                    </div>
                </div>
                <div className='flex-1 min-w-0'>
                    <p className='font-bold text-gray-200 truncate'>{user.fullName}</p>
                    {/* Placeholder for last message - gives the Telegram feel */}
                    <p className="text-sm text-gray-400 truncate">Last message placeholder...</p>
                </div>
            </div>
            {!isLast && <div className='divider my-0 py-0 h-1' />}
        </>
    );
};
export default Conversation;