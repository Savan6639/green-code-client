import React, { useEffect, useRef } from "react";


function useContextMenu(options= {visible:false,position:{x:0,y:0}}){

    const contextMenuRef = useRef();
    const btnRef = useRef();
    const [contextMenu,setContextMenu] = React.useState(options);
    useEffect(()=>{
        function handleClick(event){
            if(contextMenuRef.current && !contextMenuRef.current.contains(event.target)  && (!btnRef.current || !btnRef.current.contains(event.target)))
                setContextMenu({visible:false,x:0,y:0});
        }
        document.addEventListener('click',handleClick);
        return ()=>document.removeEventListener('click',handleClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return [contextMenu,setContextMenu,contextMenuRef,btnRef];
}

export default useContextMenu;