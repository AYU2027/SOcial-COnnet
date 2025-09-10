import useGetFriendRequests from "../../../hooks/useGetFriendRequests";
import toast from "react-hot-toast";

const FriendRequestItem = ({ request }) => {

    const handleAccept = async () => {
        try {
            const res = await fetch(`/api/friends/accept/${request._id}`, { method: "POST" });
            const data = await res.json();
            if(data.error) throw new Error(data.error);
            toast.success(`You are now friends with ${request.fullName}`);
            window.location.reload(); // Simple refresh to update lists
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleDecline = async () => {
        try {
            const res = await fetch(`/api/friends/decline/${request._id}`, { method: "POST" });
            const data = await res.json();
            if(data.error) throw new Error(data.error);
            toast.success(`Friend request from ${request.fullName} declined`);
            window.location.reload();
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-2">
                <div className="avatar">
                    <div className="w-8 rounded-full">
                        <img src={request.profilePic} alt="user avatar" />
                    </div>
                </div>
                <span>{request.fullName}</span>
            </div>
            <div className="flex gap-2">
                <button className="btn btn-success btn-xs" onClick={handleAccept}>Accept</button>
                <button className="btn btn-error btn-xs" onClick={handleDecline}>Decline</button>
            </div>
        </div>
    );
};


const FriendRequests = () => {
    const { loading, requests } = useGetFriendRequests();

    if (loading) {
        return <span className="loading loading-spinner mx-auto"></span>;
    }
    
    // Don't render the component if there are no requests
    if (requests.length === 0) {
        return null; 
    }

    return (
        <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Friend Requests</h2>
            <div className='divider px-3 mt-0'></div>
            <div className="flex flex-col gap-1">
                {requests.map(req => <FriendRequestItem key={req._id} request={req} />)}
            </div>
        </div>
    );
};

export default FriendRequests;