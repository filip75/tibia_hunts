import {combineReducers} from "redux";
import {ADD_TEAM_MESSAGE, ADD_TO_TEAM, REMOVE_FROM_TEAM, SET_LEVEL_RANGE} from "../actions/team";


const members = (characters = [], action) => {
    switch (action.type) {
        case ADD_TO_TEAM:
            return [...characters, action.name];
        case REMOVE_FROM_TEAM:
            return characters.filter(character => {
                return character.data.name !== action.name
            });
        default:
            return characters
    }
};

const levelRange = (levelRange = [0, 2000], action) => {
    if (action.type === SET_LEVEL_RANGE) {
        return action.levelRange;
    }
    return levelRange;
};

const message = (m = "", action) => {
    if (action.type === ADD_TEAM_MESSAGE) {
        return action.message;
    }
    return m;
};

export default combineReducers({members, message, levelRange});