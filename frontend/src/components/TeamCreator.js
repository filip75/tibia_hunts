import React from "react";
import Team from "./Team";
import TeamCandidates from "./TeamCandidates";

const TeamCreator = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <Team/>
                </div>
                <div className="col-md-6">
                    <TeamCandidates/>
                </div>
            </div>

        </div>
    );
};

export default TeamCreator;