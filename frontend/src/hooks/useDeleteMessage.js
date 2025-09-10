import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useDeleteMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages } = useConversation();

    const deleteMessage = async (messageId) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/messages/${messageId}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            
            // --- INSTANT UI UPDATE ---
            // Filter out the deleted message from the current state
            setMessages(messages.filter((msg) => msg._id !== messageId));

            toast.success("Message deleted");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, deleteMessage };
};

export default useDeleteMessage;