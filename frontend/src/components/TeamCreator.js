import React from "react";
import Team from "./Team";
import TeamCandidates from "./TeamCandidates";
import TeamMemory from "./TeamMemory";

const TeamCreator = () => {
    return (
        <div className="mb-2">
            <nav className="navbar navbar-light bg-light">
                <a className="navbar-brand" href="/">Tibia party finder</a>
            </nav>
            <div className="container mt-4">

                <div className="row">
                    <div className="col-md-2">
                        <TeamMemory/>
                    </div>
                    <div className="col-md-3">
                        <Team/>
                    </div>
                    <div className="col-md-7">
                        <TeamCandidates/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamCreator;