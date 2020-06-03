import axios from 'axios'


export const ADD_WORLD = "ADD_WORLD";
export const FETCH_WORLD = "FETCH_WORLD";
export const SET_CURRENT_WORLD = "SET_CURRENT_WORLD";

export const addWorld = (data) => {
    return {
        type: ADD_WORLD,
        data
    };
};

export const setCurrentWorld = (name) => {
    return {
        type: SET_CURRENT_WORLD,
        name
    };
};

export const fetchWorld = (name) => (dispatch, getState) => {
    axios.get(`https://api.tibiadata.com/v2/world/${name}.json`)
        .then((response) => {
            dispatch(addWorld(response));
        });
};