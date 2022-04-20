
import React, { Fragment, useState, useEffect } from "react";
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";

import { connect } from "react-redux";

/**views */
import ViewProfile from "../Views/Dashboard/ViewProfile";
import ViewUser from "../Views/Dashboard/ViewUser";

/*#{ `${RutaDashboard}/user` }*/
const RoutingUser = ({ Auth }) => {

    const [rolType, setRolType] = useState({
        'type': null
    });

    useEffect(() => {
        if (Auth.user) {
            setRolType({ 'type': Auth.user.roleNames[0] });
        }
    }, [Auth]);

    //console.log(props)
    let match = useRouteMatch();
    //console.log(match.path)


    return (
        <Fragment>
            <Switch>
                {
                    rolType.type == "Administrador" && (
                        <Route exact path={`${match.path}`}>
                            <ViewUser />
                        </Route>
                    )
                }
                <Route path={`${match.path}/profile`}>
                    <ViewProfile />
                </Route>
            </Switch>
        </Fragment >
    )
}


/*connection with redux */
const mapStateToProps = ({ Auth }) => {
    return {
        Auth
    }
}

export default connect(mapStateToProps)(RoutingUser);
