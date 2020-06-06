import React from "react";
import Team from "./Team";
import TeamCandidates from "./TeamCandidates";

const TeamCreator = () => {
    return (
        <div>
            <nav className="navbar navbar-light bg-light">
                <a className="navbar-brand" href="#">Tibia party finder</a>
            </nav>
            <div className="container mt-4">

                <div className="row">
                    <div className="col-md-6">
                        <Team/>
                    </div>
                    <div className="col-md-6">
                        <TeamCandidates/>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TeamCreator;