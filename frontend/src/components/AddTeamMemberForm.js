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
            [event.target.id]: event.target.value
        })
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <input class="form-control" type="text" id="name" onChange={this.handleInput}
                           value={this.state.name} placeholder="add new member"/>
                </div>
                <button className="btn btn-outline-primary w-100">Add</button>
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        callback: name => {
            dispatch(fetchTeamMember(name, true))
        }
    }
};

export default connect(null, mapDispatchToProps)(AddTeamMemberForm)