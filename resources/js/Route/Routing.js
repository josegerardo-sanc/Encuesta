import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";


/**storage de redux */
import { pathDashboard } from "../env";

/**views */
import Dashboard from "../Views/Dashboard";
import Login from '../Views/Login'
import ViewRecoveryPassword from '../Views/ViewRecoveryPassword'
import NoMatch from "../Helpers/NoMatch";
import ViewRegisterStudent from "../Views/ViewRegisterStudent";
import ViewQrScanner from "../Views/ViewQrScanner";
import ViewGraphics from "../Views/Dashboard/ViewGraphics";
/**Routing */
import RoutingUser from './RoutingUser';
import RoutingQuestion from "./RoutingQuestion";
const Routing = () => {
    return (

        <BrowserRouter>
            <Switch>
                <Route exact path="/qrScanner" component={ViewQrScanner} />
                <DenyAccessAuthenticated exact path="/" component={Login} />
                <DenyAccessAuthenticated path="/login" component={Login} />
                <DenyAccessAuthenticated path="/register" component={ViewRegisterStudent} />
                <DenyAccessAuthenticated path="/recovery-password" component={ViewRecoveryPassword} />
                <AllowAccessAuthenticated exact path={pathDashboard} component={ViewGraphics} />
                <AllowAccessAuthenticated path={`${pathDashboard}/user`} component={RoutingUser} />
                <AllowAccessAuthenticated path={`${pathDashboard}/question`} component={RoutingQuestion} />
                <Route path="*" component={NoMatch} />
            </Switch>
        </BrowserRouter>
    )
}




/*connection with redux */
const mapStateToProps = ({ Auth }) => {
    return {
        Auth
    }
}


const AllowAccessAuth = (props) => {
    const { component: Component, Auth, ...rest } = props;
    if (Auth.auth) {
        if (Auth.user.roleNames[0] == "Alumno" && props.path == pathDashboard) {
            return <Redirect to={`${pathDashboard}/question`} />
        }
        return (
            <Fragment>
                <Route {...rest}
                    render={routeProps => (
                        <Dashboard>
                            <Component {...routeProps} />
                        </Dashboard>
                    )}
                />
            </Fragment>
        )
    }
    return <Redirect to="/login" />
}

/**DenyAccessAuthenticated */
const DenyAccessAuth = (props) => {

    const { component: Component, Auth, ...rest } = props;
    if (!Auth.auth) {
        return (
            <Fragment>
                <Route {...rest}
                    render={routeProps => (
                        <Component {...routeProps} />
                    )}
                />
            </Fragment>
        )
    }
    return <Redirect to={`${pathDashboard}`} />
}


const DenyAccessAuthenticated = connect(mapStateToProps, null)(DenyAccessAuth);
const AllowAccessAuthenticated = connect(mapStateToProps)(AllowAccessAuth);

export default Routing;

