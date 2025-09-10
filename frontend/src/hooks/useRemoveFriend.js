import { useState } from "react";
import toast from "react-hot-toast";

const useRemoveFriend = () => {
    const [loading, setLoading] = useState(false);

    const removeFriend = async (friendId) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/friends/remove/${friendId}`, {
                method: "POST",
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            toast.success("Friend removed successfully");
            // We can optionally update the state here, but a page refresh will also work
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, removeFriend };
};

export default useRemoveFriend;