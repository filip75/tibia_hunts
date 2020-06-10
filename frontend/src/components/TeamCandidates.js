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
        characters.map((character) => {
            return (
                <div key={character.name}
                     className={`border rounded mb-1 ${!hasPromotion(character.vocation) ? "text-muted" : "text-dark"}`}>
                    <div className="row justify-content-between px-1">
                        <div className="d-inline-block">{character.name}</div>
                        <div className="ml-auto mr-0">{character.level}</div>
                    </div>
                    <div className="row justify-content-end px-1">
                        <div data-toggle="tooltip" title="Add to team"
                             className="hover d-inline-block"
                             onClick={() => addToTeam(character.name)}>
                            {addButton}
                        </div>
                        <div data-toggle="tooltip" title="Copy name"
                             className="hover d-inline-block mx-2" onClick={() => alert()}>
                            {clipboardButton}
                        </div>
                        <div data-toggle="tooltip" title="Show on tibia.com"
                             className="hover d-inline-block text">
                            <a className={`${hasPromotion(character.vocation) ? "text-dark" : "text-muted"}`}
                               href={`https://www.tibia.com/community/?subtopic=characters&name=${character.name}`}
                               target="_blank" rel="noopener noreferrer">
                                {infoButton}
                            </a>
                        </div>
                    </div>
                </div>)
        })

    );
};

const mapStateToDispatch = (dispatch) => {
    return {
        fetchCharacter: name => dispatch(fetchCharacter(name)),
        addToTeam: name => dispatch(fetchTeamMember([name]))
    };
};

VocationList = connect(null, mapStateToDispatch)(VocationList);

const TeamCandidates = ({levelRange, loading, candidates}) => {
    return (
        <div className="mt-2 mt-md-0">
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
                    <div className="row">
                        {Object.values(VOCATION).map((vocation) => {
                            return (
                                <div className="col-md" key={vocation}>
                                    <h5 className="text-capitalize sticky-top bg-white border rounded py-2 text-center">
                                        {`${vocation}s`}
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