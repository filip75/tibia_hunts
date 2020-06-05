import {ADD_WORLD, SET_CURRENT_WORLD} from "../actions/worlds";
import {combineReducers} from "redux";
import {createCacheReducer} from "../model/cache";

const worldList = createCacheReducer(ADD_WORLD);

const currentWorld = (worldName = null, action) => {
    if (action.type === SET_CURRENT_WORLD) {
        return action.name;
    }
    return worldName;
};

export default combineReducers({worldList, currentWorld});