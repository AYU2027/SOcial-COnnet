import { useEffect } from "react";
import useConversation from "../../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import NoChatSelected from "./NoChatSelected.jsx";
import useListenMessages from "../../../hooks/useListenMessages";
import { useSocketContext } from "../../../context/SocketContext";

const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    useListenMessages();
    const { onlineUsers } = useSocketContext();
    const isOnline = selectedConversation ? onlineUsers.includes(selectedConversation._id) : false;

    useEffect(() => {
        return () => setSelectedConversation(null);
    }, [setSelectedConversation]);

    return (
        // The container now has the new background pattern
        <div className='md:min-w-[450px] flex flex-col flex-1 chat-bg-pattern'>
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <>
                    {/* New, more informative header */}
                    <header className='bg-base-200/50 backdrop-blur-sm px-4 py-2 flex items-center gap-4 shadow-sm'>
                        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
                            <div className="w-10 rounded-full">
                                <img src={selectedConversation.profilePic} alt="user avatar" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className='text-gray-200 font-bold'>{selectedConversation.fullName}</span>
                            <span className="text-xs text-gray-400">{isOnline ? "Online" : "Offline"}</span>
                        </div>
                    </header>

                    <Messages />
                    <MessageInput />
                </>
            )}
        </div>
    );
};
export default MessageContainer;