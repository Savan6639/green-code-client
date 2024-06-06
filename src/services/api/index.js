import {GET,POST,PUT,DELETE} from './http_request';
import { serverDetails } from '../../config';


// ===================== User =====================

export const registerUser = (data) =>{
    const url = `${serverDetails.serverProxyURL}/api/v1/users/register`;
    return POST({url,data});
}

export const loginUser = (data) =>{
    const url = `${serverDetails.serverProxyURL}/api/v1/users/login`;
    return POST({url,data});
}

export const logOutUser = ()=>{
    const url = `${serverDetails.serverProxyURL}/api/v1/users/logout`;
    return POST({url})
}


// ===================== Questions =====================
export const getQuestions = (search='',level,categories=[],skip=0,limit=25) =>{
    const url = `${serverDetails.serverProxyURL}/api/v1/questions`;
    const params = {search,skip,categories,limit};
    if(level !== '')params.level = level;
    return GET({url,params});
}

export const getQuestionById = (id) =>{
    const url = `${serverDetails.serverProxyURL}/api/v1/questions/${id}`;
    return GET({url});
}

export const addQuestion = (data) =>{
    const url = `${serverDetails.serverProxyURL}/api/v1/questions`;
    return POST({url,data});
}

// ===================== Categories =====================
export const addCategory = (data) =>{
    const url = `${serverDetails.serverProxyURL}/api/v1/categories`;
    return POST({url,data});
}

export const updateCategory = (id,data) =>{
    const url = `${serverDetails.serverProxyURL}/api/v1/categories/${id}`;
    return PUT({url,data});
}

export const deleteCategory = (id) =>{
    const url = `${serverDetails.serverProxyURL}/api/v1/categories/${id}`;
    return DELETE({url});
}

export const getCategories = () =>{
    const url = `${serverDetails.serverProxyURL}/api/v1/categories`;
    return GET({url});
}


// ===================== Languages =====================

export const addLanguage = (data) =>{
    const url = `${serverDetails.serverProxyURL}/api/v1/languages`;
    return POST({url,data});
}

export const getLanguages = () =>{
    const url = `${serverDetails.serverProxyURL}/api/v1/languages`;
    return GET({url});
}

export const updateLanguage = (id,data) =>{
    const url = `${serverDetails.serverProxyURL}/api/v1/languages/${id}`;
    return PUT({url,data});
}

export const deleteLanguage = (id) =>{
    const url = `${serverDetails.serverProxyURL}/api/v1/languages/${id}`;
    return DELETE({url});
}

// ====================== Solution =====================
export const getSolutions = (id) =>{
    const url = `${serverDetails.serverProxyURL}/api/v1/solutions`;
    const params = {"question":id}
    return GET({url,params});
}

// ===================== comments ======================
export const getComments = (id)=>{
    const url =`${serverDetails.serverProxyURL}/api/v1/comments`;
    const params ={"question":id}
    return GET({url,params})
}

export const addComment = (id,data)=>{
    const url = `${serverDetails.serverProxyURL}/api/v1/comments`;
    const params = {"question":id}
    return POST({url,params,data})
}

export const deleteComment = (id)=>{
    const url = `${serverDetails.serverProxyURL}/api/v1/comments/${id}`;
    return DELETE({url})
}


//========================= likes ========================
export const addLike = (id)=>{
    const url = `${serverDetails.serverProxyURL}/api/v1/likes`;
    const params = {"question":id}
    return POST({url,params})
}
export const deleteLike = (id)=>{
    const url = `${serverDetails.serverProxyURL}/api/v1/likes`;
    const params = {"question":id}
    return DELETE({url,params})
}