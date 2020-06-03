import axios from 'axios'
import {areOnTheSameWorld, characterWasFound, getLevelRange, getWorld, isTeamMember} from "../model/character";
import {fetchWorld, setCurrentWorld} from "./worldsData";

export const ADD_TO_TEAM = "ADD_TO_TEAM";
export const REMOVE_FROM_TEAM = "REMOVE_FROM_TEAM";
export const ADD_TEAM_MESSAGE = "ADD_TEAM_MESSAGE";
export const SET_LEVEL_RANGE = "SET_LEVEL_RANGE";

export const addToTeam = name => ({
    type: ADD_TO_TEAM,
    name
});

export const removeFromTeam = name => ({
    type: REMOVE_FROM_TEAM,
    name
});

export const addTeamMessage = message => ({
    type: ADD_TEAM_MESSAGE,
    message
});

export const setLevelRange = levelRange => ({
    type: SET_LEVEL_RANGE,
    levelRange
});

export const fetchTeamMember = name => (dispatch, getState) => {
    if (isTeamMember(getState().team.members, name)) {
        dispatch(addTeamMessage(`Character ${name} is already in the team`))
    } else {
        axios.get(`https://api.tibiadata.com/v2/characters/${name}.json`)
            .then(response => {
                if (characterWasFound(response.data)) {
                    dispatch(addToTeam(response.data.characters));
                    let world = getWorld(getState().team.members);
                    if (world) {
                        dispatch(addTeamMessage(""));
                        dispatch(fetchWorld(getWorld(getState().team.members)));
                        dispatch(setCurrentWorld(world));
                        dispatch(setLevelRange(getLevelRange(getState().team.members)))
                    } else {
                        dispatch(addTeamMessage("Characters aren't on the same world"));
                    }
                } else {
                    dispatch(addTeamMessage(`Character ${name} doesn't exists`));
                }
            })
    }
};