import React from "react";
import {connect} from 'react-redux';
import AddTeamMemberForm from "./AddTeamMemberForm";
import {removeFromTeam} from "../actions/team";
import {getLevelRange, vocationImageSource} from "../model/character";


const Team = ({messages, teamMembers, removeTeamMember}) => {
    return (
        <div>
            <AddTeamMemberForm/>
            <ul>{messages.map((message) => {
                return (
                    <li>
                        {message}
                    </li>
                );
            })}</ul>
            {
                teamMembers ?
                    teamMembers.map(member => {
                        let levelRange = getLevelRange([member]);
                        return (
                            <div className="row mx-2 mb-2 border rounded" key={member.data.name}>
                                <span className="align-self-center col-2">
                                <img src={vocationImageSource(member)} alt="vocation"/>
                                </span>
                                <span className="d-inline-block col-6">
                                    <span className="mx-2 my-0 d-block font-weight-bold">{member.data.name}</span>
                                    <span className="mx-2 my-0 d-block">{member.data.vocation}</span>
                                    <span className="mx-2 my-0 d-block">
                                        {member.data.level}
                                        &nbsp;
                                        <small>{levelRange[0]} - {levelRange[1]}</small>
                                    </span>
                                    <span className="mx-2 my-0 d-block">{member.data.world}</span>
                                </span>
                                <div className="col-4 align-self-center">
                                    <button className="btn btn-outline-danger w-100 p-0"
                                            onClick={() => removeTeamMember(member.data.name)}>
                                        remove
                                    </button>
                                    <button className="btn btn-primary mt-1 w-100">info</button>
                                </div>

                            </div>
                        )
                    })
                    :
                    null
            }
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        messages: state.team.messages,
        teamMembers: state.team.members.map((member) => {
            if (state.characters.hasOwnProperty(member)) {
                return state.characters[member].data;
            }
            return null;
        })
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeTeamMember: (name) => dispatch(removeFromTeam(name))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Team);