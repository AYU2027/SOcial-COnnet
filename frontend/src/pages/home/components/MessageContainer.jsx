import { useEffect } from "react";
import useConversation from "../../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import NoChatSelected from "./NoChatSelected.jsx";
import useListenMessages from "../../../hooks/useListenMessages";

const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();

    // This hook starts the real-time listener for new messages
    useListenMessages();

    // This useEffect is a cleanup function. When the component unmounts
    // (e.g., when the user logs out), it will clear the selected conversation,
    // so you don't briefly see the old chat when you log in as a new user.
    useEffect(() => {
        return () => setSelectedConversation(null);
    }, [setSelectedConversation]);

    return (
        <div className='md:min-w-[450px] flex flex-col'>
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <>
                    {/* Header */}
                    <div className='bg-slate-500 px-4 py-2 mb-2'>
                        <span className='label-text'>To:</span>{" "}
                        <span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
                    </div>

                    <Messages />
                    <MessageInput />
                </>
            )}
        </div>
    );
};

export default MessageContainer;