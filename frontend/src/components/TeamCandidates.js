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
        <table className="w-100">
            {characters.map((character) => {
                return (
                    // <div className={hasPromotion(character.vocation) ? null : "text-muted"}>
                    // {`banner ${active ? "active" : ""}`}
                    <tr className={`border rounded mb-2 ${!hasPromotion(character.vocation) ? "text-muted" : null}`}>
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
                            <div className="mx-2 d-inline-block" onClick={() => alert()}>
                                {infoButton}
                            </div>
                            {/*<button className="btn btn-primary"*/}
                            {/*        onClick={() => fetchCharacter(character.name)}>more info*/}
                            {/*</button>*/}
                        </td>
                    </tr>)
            })}
        </table>
    )
};

const TeamCandidates = ({currentWorld, worlds, levelRange, fetchCharacter}) => {
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
        <div className="overflow-auto">
            <p>Druids</p>
            <button data-toggle="collapse" data-target="#druids">less</button>
            <div id="druids" className="collapse show">
                <VocationList characters={druids} fetchCharacter={fetchCharacter}/>
            </div>
            <p>Knight</p>
            <VocationList characters={knights} fetchCharacter={fetchCharacter}/>
            <p>Paladins</p>
            <VocationList characters={paladins} fetchCharacter={fetchCharacter}/>
            <p>Sorcerers</p>
            <VocationList characters={sorcerers} fetchCharacter={fetchCharacter}/>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        currentWorld: state.worlds.currentWorld,
        worlds: state.worlds.worldList,
        levelRange: state.team.levelRange
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCharacter: name => dispatch(fetchCharacter(name))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(TeamCandidates);