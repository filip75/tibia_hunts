import axios from 'axios'
import {createCacheActionCreator, shouldFetch} from "../model/cache";


export const ADD_WORLD = "ADD_WORLD";
export const SET_CURRENT_WORLD = "SET_CURRENT_WORLD";

export const addWorld = createCacheActionCreator(ADD_WORLD);

export const setCurrentWorld = (name) => {
    return {
        type: SET_CURRENT_WORLD,
        name
    };
};

export const fetchWorld = (name, force = false) => (dispatch, getState) => {
    if (force || shouldFetch(getState().worlds.worldList, name)) {
        axios.get(`https://api.tibiadata.com/v2/world/${name}.json`)
            .then((response) => {
                dispatch(addWorld(name, response.data.world));
            });
    }
};