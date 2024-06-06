import { IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";

function Question(){
    return (
        <div className="h-full flex flex-col">
            <div className="p-1 w-full flex justify-between">
                <div></div>
                <Link to='add'><IoAdd className="text-4xl inline-block hover:scale-110" /></Link>
            </div>
            <h1>Question</h1>
        </div>
    );
}

export default Question;