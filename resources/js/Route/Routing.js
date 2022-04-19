import React, { Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";


/**storage de redux */
import { pathDashboard } from "../env";

/**views */
import Dashboard from "../Views/Dashboard";
import Login from '../Views/Login'
import ViewRecoveryPassword from '../Views/ViewRecoveryPassword'
import NoMatch from "../Helpers/NoMatch";

/**Routing */
import RoutingUser from './RoutingUser';

const Routing = () => {
    return (

        <BrowserRouter>
            <Switch>
                <DenyAccessAuthenticated exact path="/" component={Login} />
                <DenyAccessAuthenticated path="/login" component={Login} />
                <DenyAccessAuthenticated path="/recovery-password" component={ViewRecoveryPassword} />
                <AllowAccessAuthenticated exact path={pathDashboard} component={() => <h1>Panel administrativo</h1>} />
                <AllowAccessAuthenticated path={`${pathDashboard}/user`} component={RoutingUser} />
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

