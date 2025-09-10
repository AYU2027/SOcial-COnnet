import { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../../hooks/useSendMessage";

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const { loading, sendMessage } = useSendMessage();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        await sendMessage(message);
        setMessage("");
    };

    return (
        // New modern, rounded input bar
        <form className='px-4 py-3 bg-base-200/50 backdrop-blur-sm' onSubmit={handleSubmit}>
            <div className='w-full relative flex items-center gap-2'>
                <input
                    type='text'
                    className='input input-bordered rounded-full w-full bg-gray-700 text-white'
                    placeholder='Type a message...'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type='submit' className='btn btn-primary btn-circle' disabled={loading}>
                    {loading ? <span className="loading loading-spinner"></span> : <IoSend className="w-5 h-5" />}
                </button>
            </div>
        </form>
    );
};
export default MessageInput;