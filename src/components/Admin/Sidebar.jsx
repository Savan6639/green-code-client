import { MdOutlineCategory } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { LuFileQuestion } from "react-icons/lu";
import { FaLanguage } from "react-icons/fa";
import { Link } from "react-router-dom";

function Sidebar(){
    return (
        <div className="h-full w-1/5 border-e flex flex-col">
            <div className="h-full flex flex-col items-center">
                <Link to="/admin" className="w-full ps-7 flex p-3 hover:bg-gray-300 items-center ">
                    <RxDashboard className="text-xl me-2" />
                    <p>Dashboard</p>
                </Link>
                <Link to="question" className="w-full ps-7 flex p-3 hover:bg-gray-300 items-center ">
                    <LuFileQuestion className="text-xl me-2" />
                    <p>Question</p>
                </Link>
                <Link to="category" className="w-full ps-7 flex p-3 hover:bg-gray-300 items-center ">
                    <MdOutlineCategory className="text-xl me-2" />
                    <p>Category</p>
                </Link>
                <Link to="language" className="w-full ps-7 flex p-3 hover:bg-gray-300 items-center ">
                    <FaLanguage className="text-xl me-2" />
                    <p>Language</p>
                </Link>

            </div>
        </div>
    );
}

export default Sidebar;