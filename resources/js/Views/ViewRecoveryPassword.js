import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
/*Componets */
import { RecoveryPassword } from '../Components/Auth/Login';
import Preloader from "../Helpers/Preloader";

import logoItss from '../Components/Layout/logotec.png'
/**styles */
import './style.css'
const ViewRecoveryPassword = () => {

    return (
        <Fragment>
            <Preloader></Preloader>
            <div className="containerLogin">
                <div className="row justify-content-center align-center centerLogin">
                    <div className="bg-white col-lg-6 col-xl-4">
                        <div className="bg-login text-center">
                            <div className="bg-login-overlay"></div>
                            <div className="position-relative" style={{
                                overflow: "hidden"
                            }} >
                                <h5 className="text-white font-size-20">
                                    Cambia tu contraseña
                                </h5>
                                <p className="text-white mb-0 p-1"> Solo ingresa tu correo electrónico.Es normal que la olvidemos, por suerte puedes cambiarla..</p>
                                <a href="index" className="logo logo-admin mt-4">
                                    <img src={logoItss} alt="logo" height="80" />
                                </a>
                            </div>
                        </div>
                        <div className="p-4">
                            <RecoveryPassword />
                        </div>
                        <div className="mt-4 text-center p-4">
                            <Link to="/" className="btn btn-link waves-effect waves-light">
                                <i className="font-size-16 align-middle mr-2 fas fa-undo-alt"></i>
                                Regresar
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ViewRecoveryPassword;
