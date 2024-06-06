import { useEffect, useState } from "react";
import { getQuestionById } from "../../services/api";

function useGetQuestionById(id){
  const [question,setQuestion] = useState({});
  useEffect(()=>{
    getQuestionById(id).then(res=>{
      setQuestion(res);
    })
  },[id])
  return [question,setQuestion];
}

export default useGetQuestionById;