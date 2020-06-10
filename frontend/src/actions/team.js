import axios from 'axios'
import {areCharactersCompatible, characterWasFound, getLevelRange, getWorld, isTeamMember} from "../model/character";
import {fetchWorld, setCurrentWorld} from "./worlds";
import {addCharacter} from "./characters";
import {shouldFetch} from "../model/cache";

export const ADD_MEMBER = "ADD_MEMBER";
export const REMOVE_MEMBER = "REMOVE_MEMBER";
export const SET_TEAM_MESSAGES = "SET_TEAM_MESSAGES";
export const SET_LEVEL_RANGE = "SET_LEVEL_RANGE";
export const SET_TEAM_LOADING = "SET_TEAM_LOADING";
export const CLEAR_TEAM = "CLEAR_TEAM";

export const setTeamLoading = loading => ({
    type: SET_TEAM_LOADING,
    loading
});

export const addMember = name => ({
    type: ADD_MEMBER,
    name
});

export const removeMember = name => ({
    type: REMOVE_MEMBER,
    name
});

export const clearTeam = () => ({
    type: CLEAR_TEAM,
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

export const fetchTeamMember = (names) => (dispatch, getState) => {
    const state = getState();
    if (!state.team.loading) {
        let namesToFetch = names.filter((name) => {
            if (isTeamMember(state.team.members, name)) {
                alert(`character ${name} is already member of the team`);
                return false;
            } else if (shouldFetch(state.characters, name)) {
                return true;
            } else {
                dispatch(addMember(name));
                dispatch(validateTeam());
                return false;
            }
        });

        const requests = namesToFetch.map((name) => {
            return axios.get(`https://api.tibiadata.com/v2/characters/${name}.json`);
        });

        if (requests.length > 0) {
            dispatch(setTeamLoading(true));
            axios.all(requests)
                .then(axios.spread((...responses) => {
                    const notFound = [];
                    for (const r in responses) {
                        const response = responses[r];
                        const name = namesToFetch[r];
                        if (characterWasFound(response.data)) {
                            dispatch(addCharacter(name.toLowerCase(), response.data.characters));
                            dispatch(addMember(response.data.characters.data.name));
                        } else {
                            notFound.push(name);
                        }
                    }
                    if (notFound.length > 0) {
                        alert(`${notFound.join(", ")} not found`);
                    }
                    dispatch(validateTeam());
                }))
                .catch((errors) => {
                    alert(`error while fetching characters data`);
                })
                .then(() => {
                    dispatch(setTeamLoading(false));
                })
        }
    }
};

export const removeFromTeam = (name) => (dispatch) => {
    dispatch(removeMember(name));
    dispatch(validateTeam());
};