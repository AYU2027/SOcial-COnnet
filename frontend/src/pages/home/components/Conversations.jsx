import useGetUsers from "../../../hooks/useGetUsers";
import Conversation from "./Conversation";

const Conversations = () => {
    const { loading, users } = useGetUsers();
    return (
        <div className='py-2 flex flex-col overflow-auto'>
            {users.map((user) => (
                <Conversation key={user._id} user={user} />
            ))}
            {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
        </div>
    );
};
export default Conversations;