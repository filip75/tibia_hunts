import {ADD_WORLD, SET_CURRENT_WORLD, SET_WORLD_LOADING} from "../actions/worlds";
import {combineReducers} from "redux";
import {createCacheReducer} from "../model/cache";

const worldList = createCacheReducer(ADD_WORLD);

const currentWorld = (worldName = null, action) => {
    if (action.type === SET_CURRENT_WORLD) {
        return action.name;
    }
    return worldName;
};

const loading = (l = false, action) => {
    if (action.type === SET_WORLD_LOADING) {
        return action.loading;
    }
    return l;
};

export default combineReducers({worldList, currentWorld, loading});