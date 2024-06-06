import React, { useEffect } from "react";
import { getComments } from "../../services/api";


function useGetComments(id){
    const [commets, setComments] = React.useState([]);

    useEffect(()=>{
        getComments(id).then((data)=>{
            setComments(data);
        })
    },[id])

    return [commets,setComments];
}

export default useGetComments;
