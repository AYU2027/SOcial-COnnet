import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useGetUsers from "../hooks/useGetUsers";
import { IoPersonAddOutline } from "react-icons/io5";

// This is the search result item component
const SearchResultItem = ({ user }) => {
    const handleAddFriend = async () => {
        try {
            const res = await fetch(`/api/friends/add/${user._id}`, {
                method: "POST",
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            toast.success(`Friend request sent to ${user.fullName}!`); // In a real app, this would be a request
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="flex items-center justify-between p-2 hover:bg-base-200 rounded-lg">
            <div className="flex items-center gap-4">
                <div className="avatar">
                    <div className="w-12 rounded-full">
                        <img src={user.profilePic} alt="user avatar" />
                    </div>
                </div>
                <span>{user.fullName}</span>
            </div>
            <button className="btn btn-sm btn-circle" onClick={handleAddFriend}>
                <IoPersonAddOutline className="w-5 h-5" />
            </button>
        </div>
    );
};


// This is the main modal component
const SearchModal = ({ modalId }) => {
    const [search, setSearch] = useState("");
    const { users } = useGetUsers(); // Hook to get ALL users
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        if (search.trim() === "") {
            setFilteredUsers([]);
        } else {
            setFilteredUsers(
                users.filter((user) =>
                    user.fullName.toLowerCase().includes(search.toLowerCase())
                )
            );
        }
    }, [search, users]);

    return (
        <dialog id={modalId} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-4">Add a Friend</h3>
                <input
                    type="text"
                    placeholder="Search for users..."
                    className="input input-bordered w-full"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="py-4 max-h-60 overflow-y-auto">
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => <SearchResultItem key={user._id} user={user} />)
                    ) : (
                        <p className="text-center">No users found.</p>
                    )}
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
};

export default SearchModal;