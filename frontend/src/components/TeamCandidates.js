import React from "react";
import {connect} from 'react-redux';
import {hasPromotion, VOCATION} from "../model/character";
import {fetchCharacter} from "../actions/characters";
import {addButton, clipboardButton, infoButton} from "../model/buttons";
import {fetchTeamMember} from "../actions/team";

const filterVocationAndLevel = (characters, vocation, levelMin, levelMax) => {
    return characters.filter((character) => {
        return (levelMin <= character.level)
            && (character.level <= levelMax)
            && character.vocation.split(" ").slice(-1)[0].toLowerCase() === vocation.toLowerCase();
    }).sort((c1, c2) => {
        return c2.level - c1.level;
    });
};

let VocationList = ({characters, fetchCharacter, addToTeam}) => {
    return (
        <table className="w-100 mb-4">
            <tbody>
            {characters.map((character) => {
                return (
                    <tr key={character.name}
                        className={`border rounded ${!hasPromotion(character.vocation) ? "text-muted" : null}`}>
                        <td>
                            {character.name}
                        </td>
                        <td>
                            {character.level}
                        </td>
                        <td>
                            {character.vocation}
                        </td>
                        <td>
                            <div data-toggle="tooltip" title="Add to team"
                                 className="hover mx-2 d-inline-block float-right"
                                 onClick={() => addToTeam(character.name)}>
                                {addButton}
                            </div>
                            <div data-toggle="tooltip" title="Copy name"
                                 className="hover mx-2 d-inline-block float-right" onClick={() => alert()}>
                                {clipboardButton}
                            </div>
                            <div data-toggle="tooltip" title="Show more info"
                                 className="hover mx-2 d-inline-block float-right"
                                 onClick={() => fetchCharacter(character.name)}>
                                {infoButton}
                            </div>
                        </td>
                    </tr>)
            })}
            </tbody>
        </table>
    )
};

const mapStateToDispatch = (dispatch) => {
    return {
        fetchCharacter: name => dispatch(fetchCharacter(name)),
        addToTeam: name => dispatch(fetchTeamMember(name))
    };
};

VocationList = connect(null, mapStateToDispatch)(VocationList);

const TeamCandidates = ({levelRange, loading, candidates}) => {
    return (
        <div className="border rounded mt-2 mt-md-0">
            <div className="m-2">
                <h4>Team candidates</h4>
                {loading ?
                    <div className="row mx-2 mb-2 border rounded">
                        <p className="my-auto py-2 ml-2">loading</p>
                    </div>
                    :
                    null
                }
                {candidates != null && !loading ?
                    <div>
                        {Object.values(VOCATION).map((vocation) => {
                            return (
                                <div>
                                    <h5 className="text-capitalize">
                                        {`${vocation}s`}
                                        <span className="hover vocationToggle text-secondary ml-2"
                                              data-toggle="collapse"
                                              data-target={`#${vocation}`}> toggle
                                        </span>
                                    </h5>
                                    <div id={vocation} className="collapse show">
                                        <VocationList
                                            characters={filterVocationAndLevel(candidates, vocation, levelRange[0], levelRange[1])}/>
                                    </div>
                                </div>
                            );

                        })}
                    </div>
                    :
                    null
                }
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    let candidates = null;
    const worldList = state.worlds.worldList;
    const currentWorld = state.worlds.currentWorld;
    if (worldList[currentWorld] !== undefined) {
        candidates = worldList[currentWorld].data.players_online.filter(
            (character) => {
                return !state.team.members.includes(character.name.toLowerCase());
            });
    }
    return {
        candidates,
        levelRange: state.team.levelRange,
        loading: state.worlds.loading
    };
};

export default connect(mapStateToProps, null)(TeamCandidates);