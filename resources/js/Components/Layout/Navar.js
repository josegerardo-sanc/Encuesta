import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";


/**actions */
import { signOffAuth } from '../../Redux/Actions/Auth'
import { fetchRequest } from "../../Redux/Actions/fetchRequest";

import { pathApi, pathDashboard } from "../../env";


/**imageLogoUser */
import imageProfileDefault from './imageProfileDefault.png'
import logoSystem from './itss.jpg'
import logoSystemLarge from './logotec.png'

const initLeftMenuCollapse = (event) => {
    event.preventDefault();
    $('body').toggleClass('sidebar-enable');
    if ($(window).width() >= 992) {
        $('body').toggleClass('vertical-collpsed');
    } else {
        $('body').removeClass('vertical-collpsed');
    }
}


const Navar = ({ Auth, fetchRequest, signOffAuth }) => {

    const { user, token } = Auth;

    /**Cerrar sessión */
    const handleLogout = async () => {
        let request = {
            'url': `${pathApi}/logout`,
            'request': {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            },
            //'showMessage': true
        };

        const response = await fetchRequest(request);
        signOffAuth();
        /*
        if (response.status == 200) {
        }
        */
    }



    return (
        <header id="page-topbar">
            <div className="navbar-header">
                <div className="container-fluid">
                    <div className="float-right">

                        {/*
                        <div className="dropdown d-inline-block d-lg-none ml-2">
                            <button type="button" className="btn header-item noti-icon waves-effect" id="page-header-search-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="mdi mdi-magnify"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right p-0" aria-labelledby="page-header-search-dropdown">

                                <form className="p-3">
                                    <div className="form-group m-0">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Search ..." aria-label="Recipient's username" />
                                            <div className="input-group-append">
                                                <button className="btn btn-primary" type="submit"><i className="mdi mdi-magnify"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="dropdown d-none d-lg-inline-block ml-1">
                            <button type="button" className="btn header-item noti-icon waves-effect" data-toggle="fullscreen">
                                <i className="mdi mdi-fullscreen"></i>
                            </button>
                        </div>
                        */}


                        {/*
                        <Notifications></Notifications>
                        */}

                        <div className="dropdown d-inline-block">
                            <button type="button" className="btn header-item waves-effect" id="page-header-user-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img
                                    className="rounded-circle header-profile-user"
                                    src={(Auth.hasOwnProperty('user') && user.photo != null ? user.photo : imageProfileDefault)}
                                    style={{ objectFit: 'cover' }}
                                    alt="logo" />
                                <span className="d-none d-xl-inline-block ml-1">{(Auth.hasOwnProperty('user') && user.name != null ? user.name : "test")}</span>
                                <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                                {/*item */}
                                <Link className="dropdown-item" to={`${pathDashboard}/user/profile`}>
                                    <i className="bx bx-user font-size-16 align-middle mr-1"></i>
                                    Perfil
                                </Link>
                                {/*
                                <a className="dropdown-item" href="#"><i className="bx bx-wallet font-size-16 align-middle mr-1"></i> My Wallet</a>
                                <a className="dropdown-item d-block" href="#"><span className="badge badge-success float-right">11</span><i className="bx bx-wrench font-size-16 align-middle mr-1"></i> Settings</a>
                                <a className="dropdown-item" href="#"><i className="bx bx-lock-open font-size-16 align-middle mr-1"></i> Lock screen</a>
                                */}
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item text-danger"
                                    onClick={handleLogout}
                                    href="#">
                                    <i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger"></i>
                                    Salir
                                </a>
                            </div>
                        </div>

                        {/*
                        <div className="dropdown d-inline-block">
                            <button type="button" className="btn header-item noti-icon right-bar-toggle waves-effect">
                                <i className="mdi mdi-settings-outline"></i>
                            </button>
                        </div>
                        */}

                    </div>
                    <LogoSystem></LogoSystem>
                </div>
            </div>
        </header>
    )
}


const Notifications = () => {

    return (
        <Fragment>
            <div className="dropdown d-inline-block">
                <button type="button" className="btn header-item noti-icon waves-effect" id="page-header-notifications-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="mdi mdi-bell-outline"></i>
                    <span className="badge badge-danger badge-pill">3</span>
                </button>
                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right p-0" aria-labelledby="page-header-notifications-dropdown">
                    <div className="p-3">
                        <div className="row align-items-center">
                            <div className="col">
                                <h6 className="m-0"> Notifications </h6>
                            </div>
                            <div className="col-auto">
                                <a href="#!" className="small"> View All</a>
                            </div>
                        </div>
                    </div>
                    <div data-simplebar style={{ maxHeight: "230px" }}>
                        <a href="" className="text-reset notification-item">
                            <div className="media">
                                <div className="avatar-xs mr-3">
                                    <span className="avatar-title bg-primary rounded-circle font-size-16">
                                        <i className="bx bx-cart"></i>
                                    </span>
                                </div>
                                <div className="media-body">
                                    <h6 className="mt-0 mb-1">Your order is placed</h6>
                                    <div className="font-size-12 text-muted">
                                        <p className="mb-1">If several languages coalesce the grammar</p>
                                        <p className="mb-0"><i className="mdi mdi-clock-outline"></i> 3 min ago</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                        <a href="" className="text-reset notification-item">
                            <div className="media">
                                <img src="images/users/avatar-3.jpg" className="mr-3 rounded-circle avatar-xs" alt="user-pic" />
                                <div className="media-body">
                                    <h6 className="mt-0 mb-1">James Lemire</h6>
                                    <div className="font-size-12 text-muted">
                                        <p className="mb-1">It will seem like simplified English.</p>
                                        <p className="mb-0"><i className="mdi mdi-clock-outline"></i> 1 hours ago</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                        <a href="" className="text-reset notification-item">
                            <div className="media">
                                <div className="avatar-xs mr-3">
                                    <span className="avatar-title bg-success rounded-circle font-size-16">
                                        <i className="bx bx-badge-check"></i>
                                    </span>
                                </div>
                                <div className="media-body">
                                    <h6 className="mt-0 mb-1">Your item is shipped</h6>
                                    <div className="font-size-12 text-muted">
                                        <p className="mb-1">If several languages coalesce the grammar</p>
                                        <p className="mb-0"><i className="mdi mdi-clock-outline"></i> 3 min ago</p>
                                    </div>
                                </div>
                            </div>
                        </a>

                        <a href="" className="text-reset notification-item">
                            <div className="media">
                                <img src="images/users/avatar-4.jpg" className="mr-3 rounded-circle avatar-xs" alt="user-pic" />
                                <div className="media-body">
                                    <h6 className="mt-0 mb-1">Salena Layfield</h6>
                                    <div className="font-size-12 text-muted">
                                        <p className="mb-1">As a skeptical Cambridge friend of mine occidental.</p>
                                        <p className="mb-0"><i className="mdi mdi-clock-outline"></i> 1 hours ago</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="p-2 border-top">
                        <a className="btn btn-sm btn-link font-size-14 btn-block text-center" href="#">
                            <i className="mdi mdi-arrow-right-circle mr-1"></i> View More..
                        </a>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

const LogoSystem = () => {
    return (
        <Fragment>
            <div>
                {/*<!-- LOGO --> */}
                <div className="navbar-brand-box">
                    {/*
                        <a href="index" className="logo logo-dark">
                            <span className="logo-sm">
                                <img src="images/logo-sm.png" alt="" height="20" />
                            </span>
                            <span className="logo-lg">
                                <img src="images/logo-dark.png" alt="" height="17" />
                            </span>
                        </a>
                    */}

                    <a href="index" className="logo logo-light">
                        <span className="logo-sm">
                            <img src={logoSystem} alt="logo" height="60" />
                        </span>
                        <span className="logo-lg">
                            <img src={logoSystemLarge} alt="logo" height="80" />
                        </span>
                    </a>
                </div>

                <button
                    onClick={initLeftMenuCollapse}
                    type="button" className="btn btn-sm px-3 font-size-16 header-item toggle-btn waves-effect">
                    <i className="fa fa-fw fa-bars"></i>
                </button>
            </div>
        </Fragment>
    )
}

const mapDispatchToProps = {
    fetchRequest, signOffAuth
}
const mapStateToProps = ({ Auth }) => {
    return {
        Auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navar);
