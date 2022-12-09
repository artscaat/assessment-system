import axios from "axios";

export const registerHandler = async (user) => {
    return await axios.post(process.env.REACT_APP_API + "/register", user,{
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
export const loginHandler = async (user) => {
    return await axios.post(process.env.REACT_APP_API + "/login", user,{
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const currentUser = async (authtoken) => {
    return await axios.post(process.env.REACT_APP_API + "/current-user",
    {},
     {
        headers: {
            authtoken,
        }
    });
}

// export const levelId = async (authtoken, accessId) => {
//     return await axios.get(process.env.REACT_APP_API + `/level/${accessId}`, {
//         headers: {
//             authtoken
//         }
//     });
// }

export const editCurrentUser = async (authtoken, value) => {
    return await axios.put(process.env.REACT_APP_API + "/edit",value, {
        headers: {
            authtoken
        }
    });
}

export const listUsers = async (authtoken, id) => {
    return await axios.get(process.env.REACT_APP_API + `/listusers/${id}`,{
        headers: {
            authtoken
        }
    });
}

export const listOfficer = async (authtoken, id) => {
    return await axios.get(process.env.REACT_APP_API + `/listofficer/${id}`,{
        headers: {
            authtoken
        }
    });
}

export const changeLevel = async (authtoken, value) => {
    return await axios.put(process.env.REACT_APP_API + "/changelevel", value, {
        headers: {
            authtoken
        }
    });
}

export const changeStatus = async (authtoken, value) => {
    return await axios.post(process.env.REACT_APP_API + "/changestatus", value, {
        headers: {
            authtoken
        }
    });
}

export const removeUser = async (authtoken,id) => {
    return await axios.delete(process.env.REACT_APP_API + "/removeUser/"+ id, {},{
        headers: {
            authtoken
        }
    });
}

export const createComment = async (authtoken, value) => {
    return await axios.post(process.env.REACT_APP_API + "/comment", value,{
        headers: {
            authtoken
        }
    });
}

export const commentByid = async (authtoken, PersId) => {
    return await axios.get(process.env.REACT_APP_API + `/commentbyid/${PersId}`, {
        headers: {
            authtoken
        }
    });
}

export const commentUpdate = async (authtoken, PersId) => {
    return await axios.put(process.env.REACT_APP_API + "/commentupdate", PersId, {
        headers: {
            authtoken
        }
    });
}

export const checkLevel = async (authtoken, PersID, SchoolId) => {
    return await axios.get(process.env.REACT_APP_API + `/checklevel/${PersID}/${SchoolId}`, {
        headers: {
            authtoken
        }
    });
}

export const checkLevelOffice = async (authtoken, accessId) => {
    return await axios.get(process.env.REACT_APP_API + `/checkLeveloffice/${accessId}`, {
        headers: {
            authtoken
        }
    });
}