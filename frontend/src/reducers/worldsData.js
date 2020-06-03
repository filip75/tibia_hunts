import {ADD_WORLD, SET_CURRENT_WORLD} from "../actions/worldsData";
import {combineReducers} from "redux";

const worldsData = (worldList = {}, action) => {
    if (action.type === ADD_WORLD) {
        return {
            ...worldList,
            ...{[action.data.data.world.world_information.name]: action.data.data.world}
        }
    }
    return worldList;
};

const currentWorld = (worldName = null, action) => {
    if (action.type === SET_CURRENT_WORLD) {
        return action.name;
    }
    return worldName;
};

export default combineReducers({worldsData,currentWorld});