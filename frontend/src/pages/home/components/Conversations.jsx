import useGetFriends from "../../../hooks/useGetFriends"; // <-- Use the new hook
import Conversation from "./Conversation";

const Conversations = () => {
    const { loading, friends } = useGetFriends(); // <-- Get friends, not all users
    return (
        <div className='py-2 flex flex-col overflow-auto'>
            {friends.map((friend) => ( // <-- Map over friends
                <Conversation key={friend._id} user={friend} /> // <-- Pass friend as user prop
            ))}
            {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
        </div>
    );
};
export default Conversations;