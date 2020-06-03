import React from "react";
import {connect} from 'react-redux';
import {fetchWorld} from "../actions/worldsData";
import {getWorld, hasPromotion, VOCATION} from "../model/character";

const filterVocationAndLevel = (characters, vocation, levelMin, levelMax) => {
    return characters.filter((character) => {
        return (levelMin <= character.level)
            && (character.level <= levelMax)
            && character.vocation.split(" ").slice(-1)[0].toLowerCase() === vocation.toLowerCase();
    }).sort((c1, c2) => {
        return c2.level - c1.level;
    });
};

const VocationList = ({characters}) => {
    return (
        <div>
            {characters.map((character) => {
                return (
                    <div className={hasPromotion(character.vocation) ? null : "text-muted"}>
                        <span className="w-25 mx-2">
                            {character.name}
                        </span>
                        <span className="w-25 mx-2">
                            {character.level}
                        </span>
                        <span className="w-25 mx-2">
                            {character.vocation}
                        </span>
                        <button className="btn btn-primary">add to team</button>
                        <button className="btn btn-primary">copy name</button>
                        <button className="btn btn-primary">more info</button>
                    </div>)
            })}
        </div>
    )
};

const TeamCandidates = ({currentWorld, worlds, levelRange}) => {
    let druids = [];
    let knights = [];
    let paladins = [];
    let sorcerers = [];
    if (worlds[currentWorld] !== undefined) {
        const players = worlds[currentWorld].players_online;
        druids = filterVocationAndLevel(players, VOCATION.DRUID, levelRange[0], levelRange[1]);
        knights = filterVocationAndLevel(players, VOCATION.KNIGHT, levelRange[0], levelRange[1]);
        paladins = filterVocationAndLevel(players, VOCATION.PALADIN, levelRange[0], levelRange[1]);
        sorcerers = filterVocationAndLevel(players, VOCATION.SORCERER, levelRange[0], levelRange[1]);
    }
    return (
        <div>
            <p>Druids</p>
            <VocationList characters={druids}/>
            <p>Knight</p>
            <VocationList characters={knights}/>
            <p>Paladins</p>
            <VocationList characters={paladins}/>
            <p>Sorcerers</p>
            <VocationList characters={sorcerers}/>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        currentWorld: state.worlds.currentWorld,
        worlds: state.worlds.worldsData,
        levelRange: state.team.levelRange
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchWorld: (name) => {
            dispatch(fetchWorld(name));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamCandidates);