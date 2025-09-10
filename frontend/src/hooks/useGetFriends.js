import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetFriends = () => {
    const [loading, setLoading] = useState(false);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const getFriends = async () => {
            setLoading(true);
            try {
                // Fetch from the new endpoint for ONLY friends
                const res = await fetch("/api/users/friends");
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setFriends(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getFriends();
    }, []);

    return { loading, friends };
};
export default useGetFriends;