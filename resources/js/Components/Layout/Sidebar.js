
import React, { Fragment, useEffect, useState } from "react"
import { connect } from "react-redux";
import { useRouteMatch, Link } from 'react-router-dom'
import { pathDashboard } from "../../env";

/**imageLogoUser */
import imageProfileDefault from './imageProfileDefault.png'

const Sidebar = ({ Auth }) => {

    const { user } = Auth;

    /*
    const [rolType, setRolType] = useState({
        'type': null
    });

    useEffect(() => {
        if (Auth.user) {
            setRolType({ 'type': Auth.user.roleNames[0] });
        }
    }, [Auth]);
    */

    useEffect(() => {
        document.getElementById('title_module').innerText = "Inicio";
    }, [])

    const MenuItems = () => {

        let rolType = "";

        if (Auth.hasOwnProperty('user') && user.roleNames != null) {
            rolType = Auth.user.roleNames[0]
        }

        switch (rolType) {
            case 'Administrador':
                return (<Administrador></Administrador>)
                break;
            case 'Alumno':
                return (<Alumno />)
                break;
            default:
                return ''
                break;
        }
    }

    return (
        <Fragment>
            <div className="vertical-menu">
                <div className="h-100">
                    <div className="user-wid text-center py-4">
                        <div className="user-img">
                            <img
                                src={(Auth.hasOwnProperty('user') && user.photo != null ? user.photo : imageProfileDefault)}
                                alt="logo" className="avatar-md mx-auto rounded-circle"
                                style={{
                                    objectFit: "cover"
                                }}
                            />
                        </div>
                        <div className="mt-3">
                            <a href="#" className="text-dark font-weight-medium font-size-16">
                                {(Auth.hasOwnProperty('user') && user.name != null ? user.name : "test")}
                            </a>
                            < p className="text-body mt-1 mb-0 font-size-13">
                                {(Auth.hasOwnProperty('user') && user.roleNames != null ? (user.roleNames.toString()) : "rol test")}
                            </p>
                        </div>
                    </div>
                    {/* */}
                    <div id="sidebar-menu">
                        {/*Left Menu Start */}
                        <ul className="metismenu list-unstyled" id="side-menu">
                            <li className="menu-title">Menu</li>
                            {MenuItems()}
                        </ul>
                    </div>
                </div>
            </div>
        </Fragment>
    )

}

const handleCollapse = (e) => {
    e.preventDefault();
    let subMenu_a_menu = document.querySelectorAll('.sub-menu_a_menu');
    subMenu_a_menu.length > 0 && subMenu_a_menu.forEach(element => {
        element.classList.remove("active", "mm-active")
        element.nextSibling.classList.remove("mm-show");
    });
    if (e.currentTarget.classList.contains("active_static") == false) {
        subMenu_a_menu.length > 0 && subMenu_a_menu.forEach(element => {
            element.classList.remove("active_static")
        });
        e.currentTarget.classList.add("active", "mm-active", "active_static")
        e.currentTarget.nextSibling.classList.add("mm-show");
    } else {
        e.currentTarget.classList.remove("active_static")
    }
}

const Administrador = () => {
    return (
        <Fragment>
            {/*
            <li>
                <Navitem to={''}>
                    <i className="fas fa-grip-horizontal"></i>
                    <span>Inicio</span>
                </Navitem>
            </li>
            */}
            <li>
                <Navitem to={`/user`}>
                    <i className="fas fa-users"></i>
                    <span>Usuarios</span>
                </Navitem>
            </li>
        </Fragment>
    )

}

const Alumno = () => {
    return (
        <Fragment>
            {/*
            <li>
                <Navitem to={''}>
                    <i className="fas fa-grip-horizontal"></i>
                    <span>Inicio</span>
                </Navitem>
            </li>
            */}
            <li>
                <Navitem to={'/question'}>
                    <i className="fas fa-tasks"></i>
                    <span>Encuesta</span>
                </Navitem>
            </li>
            <li>
                <Navitem to={'/surveyQuestion'}>
                    <i className="fas fa-tasks"></i>
                    <span>Historial</span>
                </Navitem>
            </li>

        </Fragment>
    )
}

const Navitem = ({ to, activeOnlyWhenExact = true, children }) => {
    // console.log(typeof to)
    let has_arrow_a = document.getElementsByClassName('has-arrow');
    console.log(has_arrow_a.length)
    has_arrow_a.length > 0 && has_arrow_a.forEach(element => {
        element.classList.remove('active', 'mm-active');
        element.children[1].classList.remove('active', 'mm-active');
    });


    if (typeof to === 'object') {
        const { pathname } = to;
        to = pathname;
    }

    let path = pathDashboard + to;

    let match = useRouteMatch({
        path: path,
        exact: activeOnlyWhenExact
    });

    return (
        <Link
            to={path}
            className={`waves-effect ${match ? 'active mm-active' : ''}`}>
            <span>{match && "> "}</span>
            {children}
        </Link>
    );

}

const mapStateToProps = ({ Auth }) => {
    return {
        Auth
    }
}

export default connect(mapStateToProps)(Sidebar);
