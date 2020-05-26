import React, {Component} from 'react'

class CharacterSearchForm extends Component {
    state = {
        name: ""
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.name) {
            this.props.searchCallback(this.state.name);
            this.setState({
                name: ""
            })
        }
    };

    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    render() {
        return (
            <form onClick={this.handleSubmit}>
                <label htmlFor="name">character name</label>
                <input type="text" name="name" onInput={this.handleInput} value={this.state.name}/>
                <button>search</button>
            </form>
        )
    }
}

export default CharacterSearchForm