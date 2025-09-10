import { useState } from "react";
import useGetFriends from "../../../hooks/useGetFriends";
import Conversation from "./Conversation";
import RemoveFriendModal from "../../../components/RemoveFriendModal"; // <-- Import the new modal

const Conversations = () => {
    const { loading, friends } = useGetFriends();
    const [selectedFriendForRemoval, setSelectedFriendForRemoval] = useState(null);
    const modalId = "remove_friend_modal";

    const handleMoreOptionsClick = (friend) => {
        setSelectedFriendForRemoval(friend);
        document.getElementById(modalId).showModal();
    };

    return (
        <>
            <div className='py-2 flex flex-col gap-2'>
                {friends.map((friend, index) => (
                    <Conversation
                        key={friend._id}
                        user={friend}
                        isLast={index === friends.length - 1}
                        onMoreOptionsClick={handleMoreOptionsClick} // <-- Pass the handler function
                    />
                ))}
                {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
            </div>

            {/* The Modal is rendered here, outside the scrollable container */}
            <RemoveFriendModal modalId={modalId} friend={selectedFriendForRemoval} />
        </>
    );
};

export default Conversations;