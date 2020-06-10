import React from "react";
import {connect} from 'react-redux';
import AddTeamMemberForm from "./AddTeamMemberForm";
import {clearTeam, removeFromTeam} from "../actions/team";
import {getLevelRange, vocationImageSource} from "../model/character";
import {setCurrentWorld} from "../actions/worlds";


const Team = ({messages, teamMembers, removeTeamMember, loading, clearTeam}) => {
    return (
        <div className="p-2">
            <h4>Team members</h4>
            <AddTeamMemberForm/>
            <ul className="my-2">{messages.map((message) => {
                return (
                    <li className="text-danger my-1">
                        {message}
                    </li>
                );
            })}</ul>
            <div className="mx-1">
                {
                    teamMembers.map(member => {
                        let levelRange = getLevelRange([member]);
                        return (
                            <div className="row mb-2 border rounded" key={member.data.name}>
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
                                    <a href={`https://www.tibia.com/community/?subtopic=characters&name=${member.data.name}`}
                                       target="_blank" rel="noopener noreferrer">
                                        <button className="btn btn-outline-primary w-100 p-0">
                                            info
                                        </button>
                                    </a>
                                    <button className="btn btn-outline-primary w-100 my-1 p-0" onClick={() => {

                                    }}>
                                        copy
                                    </button>
                                    <button className="btn btn-outline-danger w-100 p-0"
                                            onClick={() => removeTeamMember(member.data.name)}>
                                        remove
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {loading ?
                <div className="row mx-2 mb-2 border rounded">
                    <p className="my-auto py-2 ml-2">loading</p>
                </div>
                :
                null
            }
            {teamMembers.length > 0 ?
                <button className="btn btn-outline-danger w-100" onClick={clearTeam}>clear team</button>
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
        }),
        loading: state.team.loading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeTeamMember: (name) => dispatch(removeFromTeam(name)),
        clearTeam: () => {
            dispatch(clearTeam());
            dispatch(setCurrentWorld(null))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Team);