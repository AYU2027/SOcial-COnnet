import Sidebar from "./components/Sidebar";
import MessageContainer from "./components/MessageContainer";

const Home = () => {
  return (
    // Added a subtle border and more robust shadow for depth
    <div className='flex sm:h-[450px] md:h-[600px] w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden bg-gray-800/80 backdrop-blur-md border border-gray-700'>
      <Sidebar />
      <MessageContainer />
    </div>
  );
};
export default Home;