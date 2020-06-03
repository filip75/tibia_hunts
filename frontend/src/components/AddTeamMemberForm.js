import React, {Component} from "react";
import {connect} from 'react-redux';
import {fetchTeamMember} from "../actions/team";

class AddTeamMemberForm extends Component {
    state = {
        name: ""
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.name) {
            this.props.callback(this.state.name);
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
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="name">character name</label>
                <input type="text" name="name" onInput={this.handleInput} value={this.state.name}/>
                <button className="btn btn-primary">Add</button>
            </form>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        callback: name => {
            dispatch(fetchTeamMember(name))
        }
    }
};

export default connect(null, mapDispatchToProps)(AddTeamMemberForm)