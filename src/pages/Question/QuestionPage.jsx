import { memo, useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetQuestionById } from "../../hooks/data";
import { FaCircle } from "react-icons/fa";
import { AuthContext } from "../../services/context/AuthContext";
import { Solution } from "../../components/Solution"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import SelectMenu from "../../lib/Select";
import useGetSolutions from "../../hooks/data/useGetSolutions";
import { Comment } from "../../components/Comment";
import useGetComments from "../../hooks/data/useGetComments";
import { addComment, addLike, deleteComment, deleteLike } from "../../services/api";


const QuestionSolution = memo(function QuestionSolution() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [solution] = useGetSolutions(id);
  const [language, setLanguage] = useState();
  return (
    <div className="md:w-1/2">
      <div className="flex justify-end mx-4 py-2">
        <SelectMenu onChange={(data) => setLanguage(data?.value)} className="min-w-[130px]" placeholder="Language" isClearable isGreen options={solution?.map((item) => { return { "value": item?.language?.name, "label": item?.language?.name } })} />
      </div>
      <div className="min-w-[37vw]  mx-4 my-2 p-4 rounded overflow-auto gc-shadow-25 " style={{ height: 'calc(100vh - 132px)' }} >
        {solution?.map((data, index) => {
          return (
            <Solution key={index} title={data?.title} code={data?.code} language="java" admin={user.role ? true : false} /> // Pass a unique key
          );
        })}
      </div>
    </div>
  )
})


function QuestionPage() {
  const { isLoggedIn, user} = useContext(AuthContext);
  const params = useParams();
  const [question,setQuestion] = useGetQuestionById(params.id);
  const [isQuestionOpen, setIsQuestionOpen] = useState(true);

  function Level() {
    var questionLevel = question.level?.toLowerCase();
    if (questionLevel === "hard") return (<FaCircle className="text-red-600 text-xs" />);
    if (questionLevel === "medium") return (<FaCircle className="text-orange-400 text-xs" />);
    if (questionLevel === "easy") return (<FaCircle className="gc-text-green text-xs" />);
  }

  function QuestionComment() {
    const [comments, setComments] = useGetComments(params.id);
    const [inputComment, setInputComment] = useState('');

    function sendComment() {
   
      // addcomment https_resques called
      addComment(params.id,{"body":inputComment}).then((res)=>{
        setComments([res,...comments])
        setInputComment('')
      })
    }
    function onDelete(id){
      deleteComment(id).then(()=>{
          setComments(comments.filter((item)=>item._id != id))
      })
    }
    return (
      <>
        <button className="py-1 font-semibold px-2.5 hover:scale-105 border rounded-full gc-text-green gc-border-green duration-300">
          {user?.username[0].toUpperCase()}
        </button><span className="mx-2 font-medium">{user?.username[0].toUpperCase() + user?.username.slice(1)}</span>
        <div className="flex items-center mt-2 "><input type="text" className="w-full border-0 border-b-2 gc-border-black  p-2 focus:border-lime-500 focus:outline-none required:border-red-500" placeholder="Write a comment" onChange={(e) => { setInputComment(e.target.value) }} /><button className="gc-bg-green ms-4 text-white w-[110px] p-2 border rounded-lg hover:scale-110 duration-300" onClick={() => { sendComment() }}>POST</button></div>

        {comments.map((e, index) => {
          return <Comment key={index} admin={user.role == "admin" ? true : false} ondelete={()=>{onDelete(e._id)}} username="Dummy name" className="m-2 mb-3 border-0 border-t border-s gc-border-green rounded-lg gc-shadow-74 " comment={e.body} date={new Date().toLocaleDateString()} />

        })
        }
      </>
    )
  }

  function updateLike(){
    if(question?.isLiked){
      deleteLike(params.id).then(()=>{
        setQuestion({...question,isLiked:!question?.isLiked,likes:question?.likes - 1})
      })
    }else{
      addLike(params.id).then(()=>{
        setQuestion({...question,isLiked:!question?.isLiked,likes:question?.likes + 1})
      })
   
    } 
  }

  return (
    <div className="h-full ">
      <div className="md:flex">
        <div className="w-[100%] mx-5 mb-5">
          <div className={`${isLoggedIn ? "p-2" : ""}`}>
            {isLoggedIn && (
              <>
                <button className={`border gc-border-green rounded-l-md px-2 py-1 ${isQuestionOpen ? "gc-bg-green text-white" : "gc-text-green"}`} onClick={() => { if (!isQuestionOpen) { setIsQuestionOpen(!isQuestionOpen) } }}>
                  Question
                </button>
                <button className={`border gc-border-green rounded-r-md px-2 py-1 ${isQuestionOpen ? "gc-text-green" : " gc-bg-green text-white"} `} onClick={() => { if (isQuestionOpen) { setIsQuestionOpen(!isQuestionOpen) } }}>
                  Comment
                </button>
              </>
            )}
          </div>
          <div className="">
            <span className=" text-2xl font-bold">
              {question.number}
            </span>
            <span className="text-xl p-2 font-medium">
              {question.title}
            </span>
            <div className="flex justify-between mb-2">
              <div className="flex items-center">
                <Level />
                <span className="text-sm ms-1">
                  {question.level}
                </span>
              </div>
              <div className="flex gap-2">
                <div className="text-sm" >{question.likes}</div>
                {
                  question?.isLiked ? <AiFillHeart className={`mx-auto text-xl gc-text-green`} onClick={()=>{updateLike()}} /> : <AiOutlineHeart className={`mx-auto text-xl gc-text-green`} onClick={()=>{updateLike()}}/>
                }
              </div>
            </div>
          </div>
          <div className="w-full overflow-auto  border gc-border-green p-4 rounded-md" style={isLoggedIn ? { height: 'calc(100vh - 180px)' } : { height: 'calc(100vh - 205px)' }}>
            {
              isQuestionOpen ? <>{question.body}</> : <QuestionComment />
            }
          </div>
        </div>
        {isLoggedIn && (
          <QuestionSolution />
        )}
      </div>
      {
        !isLoggedIn ? (<div className="text-center ">
          <Link to="/login/gotoprevstate" className="gc-bg-green w-[10rem] py-2 px-5 text-white rounded-md mb-2">View Solution</Link>
        </div>) : (<></>)
      }
    </div>
  );
}


export default QuestionPage;
