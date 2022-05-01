
import React, { Fragment, useState, useEffect } from "react";
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";

import { connect } from "react-redux";

/**views */
import Question from "../Components/Question/Question";
import QuestionHistory from "../Components/Question/QuestionHistory";
/*#{ `${RutaDashboard}/question` }*/
const RoutingQuestion = ({ Auth }) => {

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
                    rolType.type == "Alumno" && (
                        <Fragment>
                            <Route exact path={`${match.path}`}>
                                <Question />
                            </Route>
                            <Route path={`${match.path}/history`}>
                                <QuestionHistory />
                            </Route>
                        </Fragment>
                    )
                }
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

export default connect(mapStateToProps)(RoutingQuestion);
