import { combineReducers } from 'redux'

const object = (state = {}, action) => {
    switch (action.type) {
        case "ADD_FOLDER_OBJECT":
            return {
                id: action.payload.id,
                name: action.payload.name,
                desc: action.payload.desc,
                action: action.payload.event,
                pict: {
                    url: action.payload.pictUrl,
                    caption: action.payload.pictCaption
                }
            }
        default:
            return state
    }
}

const folder = (state = {}, action) => {
    switch (action.type) {
        case "ADD_CONTAINER_FOLDER":
            return {
                fid: action.payload.fid,
                name: action.payload.name,
                objects: []
            }

        case "ADD_FOLDER_OBJECT":
            return Object.assign({}, state, {
                objects: [...state.objects, object(undefined, action)]
            })
        default:
            return state;
    }
}

const folders = (state = [], action) => {

    switch (action.type) {
        case "ADD_CONTAINER_FOLDER":
            return [...state, folder(undefined, action)]

        case "ADD_FOLDER_OBJECT":
            return state.map((f, i) => {
                if (f.fid !== action.payload.fid)
                    return f
                else
                    return folder(f, action)
            })
        default:
            return state;
    }
}

const container = (state = {}, action) => {
    switch (action.type) {
        case "ADD_CONTAINER":
            return {
                cid: action.payload.cid,
                name: action.payload.name,
                type: action.payload.type,
                activeFolderId: action.payload.activeFolderId,
                renderMode: action.payload.renderMode,
                folders: []
            }

        case "ADD_FOLDER_OBJECT":
        case "ADD_CONTAINER_FOLDER":
            return Object.assign({}, state, {
                folders: folders(state.folders, action)
            })

        case "SET_ACTIVE_FOLDER":
            return Object.assign({}, state, {
                activeFolderId: action.payload.fid
            })

        case "SET_RENDER_MODE":
            return Object.assign({}, state, {
                renderMode: action.payload.mode
            })

        default:
            return state
    }
}

export const containers = (state = [], action) => {

    switch (action.type) {
        case "ADD_CONTAINER":
            return [...state, container(undefined, action)]
        case "REMOVE_CONTAINER":
            return state.filter((container, i) => container.id !== action.payload)
        case "CLEAR_CONTAINERS":
            return []

        case "SET_RENDER_MODE":
        case "SET_ACTIVE_FOLDER":
        case "ADD_FOLDER_OBJECT":
        case "ADD_CONTAINER_FOLDER":
            return state.map((c, i) => {
                if (c.cid !== action.payload.cid)
                    return c
                else
                    return container(c, action)
            })

        default:
            return state
    }
}

export const fetching = (state = false, action) =>
    (action.type === "SET_FETCHING") ? action.payload : state

export default combineReducers(
    {
        fetching,
        containers
    }
)