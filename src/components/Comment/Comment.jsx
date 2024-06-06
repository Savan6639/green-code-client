import PropTypes from "prop-types";
import { MdDeleteForever } from "react-icons/md"

const Comment = ({ date, comment, username, className, admin , ondelete }) => {


    return (
        <div className={"p-3 border rounded-md " + className}>
            <div className="flex justify-between">
                <div>
                    <button className="py-1 font-semibold px-2.5 hover:scale-105 border rounded-full gc-text-green gc-border-green duration-200">
                        {username[0].toUpperCase()}
                    </button>
                    <span className="mx-2 font-medium">{username[0].toUpperCase() + username.slice(1)}</span>
                </div>
                <div className="text-sm">{date}</div>
                {
                    admin === true && <MdDeleteForever className="text-3xl hover:scale-110 hover:cursor-pointer duration-300 text-red-600" onClick={()=>{ondelete()}} />
                }
            </div>
            <div className="pt-3 pb-2">
                {comment}
            </div>
        </div>
    )

}

Comment.propTypes = {
    date: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    admin: PropTypes.bool.isRequired,
    ondelete:PropTypes.func.isRequired
}
export default Comment;
