import React, { useEffect } from "react";
import { getQuestions } from "../../services/api";


function useGetQuestions(search,level='',categories=[],skip,limit){
    const [questions, setQuestions] = React.useState([]);

    useEffect(()=>{
        getQuestions(search,level,categories,skip,limit).then((data)=>{
            setQuestions(data);
        })
    },[search,level,categories,skip,limit])

    return [questions,setQuestions];
}

export default useGetQuestions;
