import React, { Fragment, useState, useEffect } from "react";

/*Componets */
import Login from '../Components/Auth/Login';
import Preloader from "../Helpers/Preloader";

import logoItss from '../Components/Layout/logotec.png'

/**styles */
import './style.css'
const ViewLogin = () => {

    return (
        <Fragment>
            <Preloader></Preloader>
            <div className="containerLogin">
                <div className="row justify-content-center align-center centerLogin">
                    <div className="bg-white col-lg-6 col-xl-4">
                        <div className="bg-login text-center">
                            <div className="bg-login-overlay"></div>
                            <div className="position-relative" >
                                <h5 className="text-white font-size-20">Bienvenido de nuevo </h5>
                                <p className="text-white-50 mb-0">Inicie sesión para continuar.</p>
                                <a href="index" className="logo logo-admin mt-4">

                                    <img src={logoItss} alt="logo" height="80" />

                                </a>
                            </div>
                        </div>
                        <div className="p-4">
                            <Login></Login>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ViewLogin;
