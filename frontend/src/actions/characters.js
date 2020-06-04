import {createCacheActionCreator, shouldFetch} from "../model/cache";
import axios from 'axios'
import {characterWasFound} from "../model/character";

export const ADD_CHARACTER = "ADD_CHARACTER";

export const addCharacter = createCacheActionCreator(ADD_CHARACTER);

export const fetchCharacter = (name, force = false) => (dispatch, getState) => {
    if (force || shouldFetch(getState().characters, name)) {
        axios.get(`https://api.tibiadata.com/v2/characters/${name}.json`)
            .then((response) => {
                if (characterWasFound(response.data)) {
                    dispatch(addCharacter(name, response.data.characters));
                }
            });
    }
};