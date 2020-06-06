import React from "react";
import {connect} from 'react-redux';
import {hasPromotion, VOCATION} from "../model/character";
import {fetchCharacter} from "../actions/characters";
import {addButton, clipboardButton, infoButton} from "../model/buttons";

const filterVocationAndLevel = (characters, vocation, levelMin, levelMax) => {
    return characters.filter((character) => {
        return (levelMin <= character.level)
            && (character.level <= levelMax)
            && character.vocation.split(" ").slice(-1)[0].toLowerCase() === vocation.toLowerCase();
    }).sort((c1, c2) => {
        return c2.level - c1.level;
    });
};

const VocationList = ({characters, fetchCharacter}) => {
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
                            <div className="mx-2 d-inline-block" onClick={() => alert()}>
                                {addButton}
                            </div>
                            <div className="mx-2 d-inline-block" onClick={() => alert()}>
                                {clipboardButton}
                            </div>
                            <div className="mx-2 d-inline-block" onClick={() => fetchCharacter(character.name)}>
                                {infoButton}
                            </div>
                        </td>
                    </tr>)
            })}
            </tbody>
        </table>
    )
};

const TeamCandidates = ({currentWorld, worlds, levelRange, fetchCharacter, loading}) => {
    let druids = [];
    let knights = [];
    let paladins = [];
    let sorcerers = [];
    if (worlds[currentWorld] !== undefined) {
        const players = worlds[currentWorld].data.players_online;
        druids = filterVocationAndLevel(players, VOCATION.DRUID, levelRange[0], levelRange[1]);
        knights = filterVocationAndLevel(players, VOCATION.KNIGHT, levelRange[0], levelRange[1]);
        paladins = filterVocationAndLevel(players, VOCATION.PALADIN, levelRange[0], levelRange[1]);
        sorcerers = filterVocationAndLevel(players, VOCATION.SORCERER, levelRange[0], levelRange[1]);
    }
    return (
        <div className="border rounded">
            <div className="m-2">
                <h4>Team candidates</h4>
                {loading ?
                    <div className="row mx-2 mb-2 border rounded">
                        <p className="my-auto py-2 ml-2">loading</p>
                    </div>
                    :
                    null
                }
                {currentWorld ?
                    <div>
                        <h5>Druids</h5>
                        <VocationList characters={druids} fetchCharacter={fetchCharacter}/>
                        <h5>Knights</h5>
                        <VocationList characters={knights} fetchCharacter={fetchCharacter}/>
                        <h5>Paladins</h5>
                        <VocationList characters={paladins} fetchCharacter={fetchCharacter}/>
                        <h5>Sorcerers</h5>
                        <VocationList characters={sorcerers} fetchCharacter={fetchCharacter}/>
                    </div>
                    :
                    null
                }
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        currentWorld: state.worlds.currentWorld,
        worlds: state.worlds.worldList,
        levelRange: state.team.levelRange,
        loading: state.worlds.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCharacter: name => dispatch(fetchCharacter(name))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(TeamCandidates);