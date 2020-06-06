import {combineReducers} from "redux";
import {SET_TEAM_MESSAGES, ADD_MEMBER, REMOVE_MEMBER, SET_LEVEL_RANGE, SET_TEAM_LOADING} from "../actions/team";


const members = (characters = [], action) => {
    switch (action.type) {
        case ADD_MEMBER:
            return [...characters, action.name.toLowerCase()];
        case REMOVE_MEMBER:
            return characters.filter(character => {
                return character !== action.name.toLowerCase();
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

const messages = (m = [], action) => {
    if (action.type === SET_TEAM_MESSAGES) {
        return action.messages;
    }
    return m;
};

const loading = (l = false, action) => {
    if (action.type === SET_TEAM_LOADING) {
        return action.loading;
    }
    return l;
};

export default combineReducers({members, messages, levelRange, loading});