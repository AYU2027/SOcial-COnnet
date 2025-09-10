import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetFriendRequests = () => {
    const [loading, setLoading] = useState(false);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const getRequests = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/friends/requests");
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setRequests(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getRequests();
    }, []);

    return { loading, requests };
};
export default useGetFriendRequests;