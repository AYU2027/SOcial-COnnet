import { useAuthContext } from "../../../context/AuthContext";
import useConversation from "../../../zustand/useConversation";
import { extractTime } from "../../../utils/extractTime";

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const fromMe = message.senderId === authUser._id;
    
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
    const bubbleBgColor = fromMe ? "bg-blue-600" : "bg-gray-600"; // Refined colors
    const formattedTime = extractTime(message.createdAt);

    return (
        <div className={`chat ${chatClassName}`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img alt='User avatar' src={profilePic} />
                </div>
            </div>
            <div className={`chat-bubble text-white ${bubbleBgColor} break-words flex items-end gap-2 pr-2`}>
                <span>{message.message}</span>
                <span className='text-xs opacity-70 whitespace-nowrap'>{formattedTime}</span>
            </div>
        </div>
    );
};
export default Message;