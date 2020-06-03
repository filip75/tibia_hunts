import React from "react";

export const VOCATION = {
    DRUID: "druid",
    KNIGHT: "knight",
    PALADIN: "paladin",
    SORCERER: "sorcerer"
};

export const hasPromotion = (vocation) => {
    return vocation.split(" ").length === 2;
};

export const isTeamMember = (team, name) => {
    return team.map(member => {
        return member.data.name.toLowerCase()
    }).includes(name.toLowerCase());
};

export const characterWasFound = (character) => {
    return !character.characters.hasOwnProperty("error");
};

export const areOnTheSameWorld = (characters) => {
    return new Set(characters.map(character => character.data.world)).size === 1;
};

export const getWorld = (characters) => {
    if (areOnTheSameWorld(characters)) {
        return characters[0].data.world;
    } else {
        return null;
    }
};

export const vocationImageSource = (character) => {
    const vocation = character.data.vocation.split(" ").slice(-1)[0].toLowerCase();
    let source = "static/vocations/default.png";
    if (["druid", "knight", "paladin", "sorcerer"].includes(vocation)) {
        source = `static/vocations/${vocation}.png`;
    }
    return source;
};

export const getLevelRange = (characters) => {
    const min = characters.map(character => {
        return Math.ceil(character.data.level / 1.5)
    });
    const max = characters.map(character => {
        return Math.floor(character.data.level * 1.5)
    });
    return [Math.max(...min), Math.min(...max)];
};

export const areCharactersCompatible = (characters) => {
    const levelRange = getLevelRange(characters);
    return levelRange[0] <= levelRange[1];
};