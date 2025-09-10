import useRemoveFriend from "../hooks/useRemoveFriend";

const RemoveFriendModal = ({ modalId, friend }) => {
    const { loading, removeFriend } = useRemoveFriend();

    const handleRemoveFriend = async () => {
        if (!friend) return;
        await removeFriend(friend._id);
        window.location.reload(); // Refresh to update the list
    };

    return (
        <dialog id={modalId} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Remove Friend</h3>
                <p className="py-4">
                    Are you sure you want to remove <span className="font-bold">{friend?.fullName}</span> as a friend?
                </p>
                <div className="modal-action">
                    <form method="dialog" className="w-full flex justify-end gap-2">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Cancel</button>
                        <button
                            className="btn btn-error"
                            disabled={loading}
                            onClick={handleRemoveFriend}
                        >
                            {loading ? <span className="loading loading-spinner"></span> : "Remove"}
                        </button>
                    </form>
                </div>
            </div>
             <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
};

export default RemoveFriendModal;