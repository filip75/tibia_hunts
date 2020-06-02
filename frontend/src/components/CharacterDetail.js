import React, {Component} from 'react'
import axios from 'axios'
import CharacterSearchForm from "./CharacterSearchForm";
import './CharacterDetail.css';

let c = {
    "characters": {
        "data": {
            "name": "Ad non Kareese",
            "title": "None (7 titles unlocked)",
            "sex": "male",
            "vocation": "Paladin",
            "level": 236,
            "achievement_points": 119,
            "world": "Vunira",
            "residence": "Ab'Dendriel",
            "last_login": [{"date": "2020-05-20 20:56:45.000000", "timezone_type": 2, "timezone": "CEST"}],
            "account_status": "Free Account",
            "status": "offline"
        },
        "achievements": [{"stars": 1, "name": "Firefighter"}, {"stars": 1, "name": "The Right Tone"}],
        "deaths": [],
        "account_information": {
            "loyalty_title": "Warden of Tibia",
            "created": {"date": "2005-07-31 18:06:18.000000", "timezone_type": 2, "timezone": "CEST"}
        },
        "other_characters": [{
            "name": "Ad non Kareese",
            "world": "Vunira",
            "status": "offline"
        }, {"name": "Danos Dratosir", "world": "Antica", "status": "offline"}, {
            "name": "Plackozerca",
            "world": "Celesta",
            "status": "offline"
        }, {"name": "Yogus Dratosir", "world": "Epoca", "status": "offline"}]
    },
    "information": {
        "api_version": 2,
        "execution_time": 0.0008,
        "last_updated": "2020-05-26 20:22:57",
        "timestamp": "2020-05-26 20:23:02"
    }
};


class CharacterDetail extends Component {
    state = {
        character: null,
        error: false,
        loading: false
    };

    searchCharacter = (name) => {
        this.setState({
            loading: true
        });
        axios.get("https://api.tibiadata.com/v2/characters/" + name + ".json")
            .then((response) => {
                this.setState({
                    character: response.data.characters,
                    error: false,
                    loading: false
                })
            })
            .catch((error) => {
                this.setState({
                    character: null,
                    error: true,
                    loading: false
                })
            })
    };

    vocationImage = (vocation) => {
        vocation = vocation.split(" ").slice(-1)[0].toLowerCase();
        let source = "static/vocations/default.png";
        if (["druid", "knight", "paladin", "sorcerer"].includes(vocation)) {
            source = `static/vocations/${vocation}.png`;
        }
        return <img src={source} alt={`${vocation} image`}/>
    };

    characterInfo = (character) => {
        return (
            <table className="table table-sm table-borderless table-striped characterDetailTable">
                <thead>
                <h4 className="text-center">
                    {this.vocationImage(character.data.vocation)}
                    {character.data.name}
                </h4>
                </thead>
                <tbody className="text-left">
                <tr>
                    <th scope="col">vocation</th>
                    <td>{character.data.vocation}</td>
                </tr>
                <tr>
                    <th scope="col">level</th>
                    <td>
                        {character.data.level}
                    </td>
                </tr>
                <tr>
                    <th scope="col">level range</th>
                    <td>
                        {Math.ceil(character.data.level / 1.5)}
                        -
                        {Math.floor(character.data.level * 1.5)}
                    </td>
                </tr>
                <tr>
                    <th scope="col">has premium</th>
                    <td>
                        {character.data.account_status === "Free Account" ?
                            "no" :
                            "yes"
                        }
                    </td>
                </tr>
                </tbody>
            </table>
        )
    };

    otherCharacters = (character) => {
        let otherCharacters = character.other_characters.filter(c => {
            return c.name !== character.data.name
        });
        if (otherCharacters.length === 0)
            return null;
        else {
            return (
                <div>
                    <h6 className="text-center">Other characters</h6>
                    <table className="table table-sm table-borderless characterDetailTable">
                        <thead className="text-left">
                        <tr>
                            <th>name</th>
                            <th>world</th>
                        </tr>
                        </thead>
                        <tbody>
                        {otherCharacters.map((c) => {
                            return (
                                <tr className="text-left">
                                    <td>{c.name}</td>
                                    <td>{c.world}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            )
        }
    };

    render() {
        let characterData = null;
        if (this.state.character) {
            if (this.state.character.hasOwnProperty("error")) {
                characterData = <p>Character not found</p>
            } else {
                characterData = (
                    <div>
                        {this.characterInfo(this.state.character)}
                        <hr/>
                        {this.otherCharacters(this.state.character)}
                    </div>
                )
            }
        } else if (this.state.loading) {
            characterData = <p>Loading...</p>
        } else if (this.state.error) {
            characterData = <p>Error</p>
        }
        return (
            <div className="container table-striped">
                <div className="col-md-8">
                    <div>
                        {characterData}
                    </div>
                    <CharacterSearchForm searchCallback={this.searchCharacter}/>
                </div>
            </div>
        )
    }
}

export default CharacterDetail