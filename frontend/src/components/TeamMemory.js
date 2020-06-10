import React, {useState} from "react";
import {clearTeam, fetchTeamMember} from "../actions/team";
import {connect} from 'react-redux';

const TEAMS_INDEX = "teams";

const saveTeam = (team) => {
    let index = JSON.parse(localStorage.getItem(TEAMS_INDEX));
    if (!index)
        index = [];
    const newKey = Math.max(...index, 0) + 1;
    index.push(newKey);
    team.sort();
    localStorage.setItem(newKey.toString(), JSON.stringify(team.sort()));
    localStorage.setItem(TEAMS_INDEX, JSON.stringify(index));
    return newKey;
};

const deleteTeam = (key) => {
    let index = JSON.parse(localStorage.getItem(TEAMS_INDEX));
    index = index.filter((i) => {
        return i.toString() !== key.toString();
    });
    localStorage.removeItem(key.toString());
    localStorage.setItem(TEAMS_INDEX, JSON.stringify(index));
};

const getTeams = () => {
    const index = JSON.parse(localStorage.getItem(TEAMS_INDEX));
    if (!index)
        return {};
    const teams = {};
    index.forEach((i) => {
        teams[i] = JSON.parse(localStorage.getItem(i.toString()));
    });
    return teams;
};

const TeamMemory = ({names, loadTeam}) => {
    const [teams, setTeams] = useState(getTeams);
    return (
        <div className="p-2 mt-2 mt-md-0">
            <h4>Saved teams</h4>
            <button className="btn btn-outline-primary mb-2 w-100" onClick={() => {
                if (names.length > 0) {
                    saveTeam(names);
                    setTeams(getTeams);
                } else {
                    alert("team is empty");
                }
            }}>
                save current team
            </button>
            <div>
                {Object.entries(teams).map((team) => {
                    return (
                        <div className="border rounded mb-2 p-1" key={team[0]}>
                            <ul className="list-group">
                                <div className="d-inline-block my-auto">
                                    {
                                        team[1].map((member) => {
                                            return (
                                                <li key={member} className="list-group-item p-1 rounded">{member}</li>
                                            );
                                        })
                                    }
                                </div>
                            </ul>
                            <div>
                                <button className="btn btn-outline-primary p-1 mt-1 w-100" onClick={
                                    () => loadTeam(team[1])
                                }>
                                    apply
                                </button>
                                <button className="btn btn-outline-danger d-block p-0 my-1 w-100" onClick={() => {
                                    deleteTeam(team[0]);
                                    setTeams(getTeams);
                                }}>
                                    delete
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>)
};

const mapStateToProps = (state) => {
    return {
        names: state.team.members
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTeam: (names) => {
            dispatch(clearTeam());
            dispatch(fetchTeamMember(names));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamMemory);