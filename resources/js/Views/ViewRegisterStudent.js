import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
/*Componets */
import { RegisterStudent } from '../Components/Auth/Login';
import Preloader from "../Helpers/Preloader";

import logoItss from '../Components/Layout/logotec.png'

const ViewRegisterStudent = () => {

    return (
        <Fragment>
            <Preloader></Preloader>
            <div className="container">
                <div className=" mt-4 mb-4 row justify-content-center align-center">
                    <div className="bg-white col-lg-10">
                        <div className="bg-login text-center">
                            <div className="bg-login-overlay"></div>
                            <div className="position-relative" style={{
                                overflow: "hidden"
                            }} >
                                <h5 className="text-white font-size-20">
                                    Registrate
                                </h5>
                                {/*
                                 <p className="text-white mb-0 p-1"> Solo ingresa tu correo electrónico.Es normal que la olvidemos, por suerte puedes cambiarla..</p>

                                */}
                                <div className="logo logo-admin mt-4">
                                    <img src={logoItss} alt="logo" height="80" />
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <RegisterStudent />
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

export default ViewRegisterStudent;
