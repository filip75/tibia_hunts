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
        return member.toLowerCase()
    }).includes(name.toLowerCase());
};

export const characterWasFound = (character) => {
    return !character.characters.hasOwnProperty("error");
};

export const areOnTheSameWorld = (characters) => {
    const worldCount = new Set(characters.map(character => character.data.world)).size;
    return worldCount === 0 || worldCount === 1;
};

export const getWorld = (characters) => {
    if (characters.length > 0 && areOnTheSameWorld(characters)) {
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
    return characters.every((character) => {
        return levelRange[0] <= character.data.level && character.data.level <= levelRange[1];
    });
};