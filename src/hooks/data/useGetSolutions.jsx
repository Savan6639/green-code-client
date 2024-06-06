import React, { useEffect } from "react";
import { getSolutions } from "../../services/api";


function useGetSolutions(id){
    const [solutions, setSolutions] = React.useState([]);

    useEffect(()=>{
        getSolutions(id).then((data)=>{
            setSolutions(data);
        })
    },[id])

    return [solutions,setSolutions];
}

export default useGetSolutions;
