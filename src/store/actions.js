export function addContainer(id, name, type, activeFolderId, renderMode) {
    return {
        type: "ADD_CONTAINER",
        payload: {
            cid: id,
            name,
            type,
            activeFolderId,
            renderMode
        }
    }
}

export function addFolderToContainer(containerId, folderId, folderName) {
    return {
        type: "ADD_CONTAINER_FOLDER",
        payload: {
            cid: containerId,
            fid: folderId,
            name: folderName
        }
    }
}

export function addObjectToFolderInContainer(containerId, folderId, objId, objName, objDesc, ObjAction, pictCaption, pictUrl) {
    return {
        type: "ADD_FOLDER_OBJECT",
        payload: {
            cid: containerId,
            fid: folderId,
            id: objId,
            name: objName,
            desc: objDesc,
            action: ObjAction,
            pictUrl,
            pictCaption
        }
    }
}


export const setActiveFolderInContainer = (containerId, folderId) => {
    return {
        type: "SET_ACTIVE_FOLDER",
        payload: {
            cid: containerId,
            fid: folderId
        }
    }
}

export const setRenderModeInContainer = (containerId, mode) => {
    return {
        type: "SET_RENDER_MODE",
        payload: {
            cid: containerId,
            mode
        }
    }
}



// Example of loading data using a Web Service (RestFul)
export const loadObjectForFolderInContainer = (containerId, folderId) => (dispatch, getState) => {
    dispatch({
        type: "SET_FETCHING",
        payload: true
    })

    fetch("https://restcountries.eu/rest/v1/alpha?codes=us;mx;co", { method: 'GET' })
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log("data", data)
            if (data) {
                data.forEach(c => dispatch(addObjectToFolderInContainer(
                    containerId, folderId,
                    c.alpha2Code, c.name, c.capital,
                    "",  "Logo", "images/logo.png" )))

                dispatch({
                    type: "SET_FETCHING",
                    payload: false
                })
            }
        })
        .catch(err => {
            console.log("ERROR", err)
            dispatch({
                type: "SET_FETCHING",
                payload: false
            })
        })
}