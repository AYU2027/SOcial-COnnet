import { useEffect, useRef } from "react";
import useGetMessages from "../../../hooks/useGetMessages";
import Message from "./Message";
import useConversation from "../../../zustand/useConversation";

const Messages = () => {
    const { messages, loading } = useGetMessages();
    const { selectedConversation } = useConversation();
    const lastMessageRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages]);

    return (
        <div className='px-4 flex-1 overflow-auto'>
            {!loading &&
                messages.length > 0 &&
                messages.map((message) => (
                    <div key={message._id} ref={lastMessageRef}>
                        <Message message={message} />
                    </div>
                ))}

            {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
            
            {!loading && messages.length === 0 && (
                <p className='text-center text-gray-300'>
                    Send a message to start the conversation with {selectedConversation.fullName}
                </p>
            )}
        </div>
    );
};
export default Messages;

const MessageSkeleton = () => {
    return (
        <>
            <div className="flex gap-3 items-center">
                <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
                <div className="flex flex-col gap-1">
                    <div className="skeleton h-4 w-40"></div>
                    <div className="skeleton h-4 w-40"></div>
                </div>
            </div>
            <div className="flex gap-3 items-center justify-end mt-2">
                <div className="flex flex-col gap-1">
                    <div className="skeleton h-4 w-40"></div>
                </div>
                <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
            </div>
        </>
    );
};