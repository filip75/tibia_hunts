import axios from 'axios'
import {areCharactersCompatible, characterWasFound, getLevelRange, getWorld, isTeamMember} from "../model/character";
import {fetchWorld, setCurrentWorld} from "./worlds";
import {addCharacter} from "./characters";
import {shouldFetch} from "../model/cache";

export const ADD_MEMBER = "ADD_MEMBER";
export const REMOVE_MEMBER = "REMOVE_MEMBER";
export const SET_TEAM_MESSAGES = "SET_TEAM_MESSAGES";
export const SET_LEVEL_RANGE = "SET_LEVEL_RANGE";

export const addMember = name => ({
    type: ADD_MEMBER,
    name
});

export const removeMember = name => ({
    type: REMOVE_MEMBER,
    name
});

export const setTeamMessages = messages => ({
    type: SET_TEAM_MESSAGES,
    messages
});

export const setLevelRange = levelRange => ({
    type: SET_LEVEL_RANGE,
    levelRange
});

export const validateTeam = () => (dispatch, getState) => {
    const characters = getState().characters;
    const team = getState().team.members.map((name) => {
        return characters[name].data;
    });
    const messages = [];
    let world = getWorld(team);

    if (world) {
        dispatch(fetchWorld(world));
    } else if (team.length !== 0) {
        messages.push("characters aren't on the same world");
    }

    if (!areCharactersCompatible(team)) {
        messages.push("level spread is to big");
        world = null;
    } else {
        dispatch(setLevelRange(getLevelRange(team)));
    }

    dispatch(setCurrentWorld(world));
    dispatch(setTeamMessages(messages));
};

export const fetchTeamMember = name => (dispatch, getState) => {
    name = name.toLowerCase();
    if (isTeamMember(getState().team.members, name)) {
        alert(`character ${name} is already member of the team`);
    } else {
        if (shouldFetch(getState().characters, name)) {
            axios.get(`https://api.tibiadata.com/v2/characters/${name}.json`)
                .then((response) => {
                    if (characterWasFound(response.data)) {
                        dispatch(addCharacter(name, response.data.characters));
                        dispatch(addMember(name));
                        dispatch(validateTeam());
                    } else {
                        alert(`character ${name} not found`);
                    }
                })
                .catch((error) => {
                    alert(`error while fetching character ${name} data`);
                });
        } else {
            dispatch(addMember(name));
            dispatch(validateTeam());
        }
    }
};

export const removeFromTeam = (name) => (dispatch) => {
    dispatch(removeMember(name));
    dispatch(validateTeam());
};