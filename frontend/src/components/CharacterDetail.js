import React, {Component} from 'react'
import axios from 'axios'
import CharacterSearchForm from "./CharacterSearchForm";

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

    render() {
        let characterInfo = null;
        if (this.state.character) {
            if (this.state.character.hasOwnProperty("error")) {
                characterInfo = <p>Character not found</p>
            } else {
                characterInfo = (
                    <div>
                        <table className="table">
                            <tr>
                                <th scope="col">name</th>
                                <td>{this.state.character.data.name}</td>
                            </tr>
                            <tr>
                                <th scope="col">vocation</th>
                                <td>{this.state.character.data.vocation}</td>
                            </tr>
                            <tr>
                                <th scope="col">level</th>
                                <td>
                                    {this.state.character.data.level}
                                    <small>
                                        &nbsp;
                                        {Math.ceil(this.state.character.data.level / 1.5)}
                                        -
                                        {Math.floor(this.state.character.data.level * 1.5)}
                                    </small>
                                </td>
                            </tr>
                        </table>
                        <table className="table">
                            <thead>
                            <tr className="text-left">
                                <th>name</th>
                                <th>world</th>
                                <th>status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.character.other_characters.map((character) => {
                                return (
                                    <tr className="text-left">
                                        <td>{character.name}</td>
                                        <td>{character.world}</td>
                                        <td>{character.status}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                )
            }
        } else if (this.state.loading) {
            characterInfo = <p>Loading...</p>
        } else if (this.state.error) {
            characterInfo = <p>Error</p>
        }
        return (
            <div className="container">
                <div className="col-md-5">
                    {characterInfo}
                    <CharacterSearchForm searchCallback={this.searchCharacter}/>
                </div>
            </div>
        )
    }
}

export default CharacterDetail