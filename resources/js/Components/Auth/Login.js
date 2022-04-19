import React, { useState, useEffect, Fragment } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

/**actions redux */
import { saveSesionAuth } from '../../Redux/Actions/Auth'
import { fetchRequest } from '../../Redux/Actions/fetchRequest'
/**configurations */
import { pathApi } from '../../env'

/**helpers */
import AlertMessage from "../../Helpers/AlertMessage";
import AlertMessageSingular from "../../Helpers/AlertMessageSingular";

const Login = ({
    saveSesionAuth,
    fetchRequest
}) => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        'remember_session': false
    });

    const handleChange = (e) => {

        //console.log(e.target.type, e.target.checked);
        if (e.target.type == "checkbox") {
            setData({
                ...data,
                [e.target.name]: e.target.checked
            });
        } else {
            setData({
                ...data,
                [e.target.name]: e.target.value
            });
        }
    };


    const handleonKeyPress = (ev) => {
        if (ev.key === 'Enter') {
            handleClickSubmit();
        }
    }


    const handleClickSubmit = async () => {
        let request = {
            'url': `${pathApi}/authenticate`,
            'request': {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            },
            'showMessage': true
        };
        const response = await fetchRequest(request);
        if (response.status == 200) {
            setTimeout(() => {
                saveSesionAuth(response.data);
            }, 500);
        }
    }


    const showPassword = (e) => {
        if (document.getElementById('password').type == "text") {
            document.getElementById('span_icon').innerHTML = '<i class="far fa-eye-slash"></i>';
            document.getElementById('password').type = "password";
        } else {
            document.getElementById('span_icon').innerHTML = '<i class="far fa-eye"></i>';
            document.getElementById('password').type = "text"
        }
    }



    return (

        <Fragment>
            <AlertMessage></AlertMessage>
            <form className="form-horizontal" action="index">
                <div className="form-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <div className="input-group mb-0">
                        <div className="input-group-prepend">
                            <span className="input-group-text" >
                                <i class="fas fa-envelope"></i>
                            </span>
                        </div>
                        <input
                            name="email"
                            onChange={handleChange}
                            onKeyPress={handleonKeyPress}
                            type="text"
                            className="form-control" id="email"
                            placeholder="Correo electrónico"
                            maxLength={100}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <div className="input-group mb-0">
                        <div className="input-group-prepend">
                            <span className="input-group-text" >
                                <i className="fas fa-key"></i>
                            </span>
                        </div>
                        <input
                            name="password"
                            onChange={handleChange}
                            onKeyPress={handleonKeyPress}
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Ingresa tu clave"
                            autoComplete="current-password"
                            maxLength={100}
                        />
                        <div className="input-group-append" onClick={showPassword}>
                            <span className="input-group-text" id="span_icon">
                                <i className="far fa-eye-slash"></i>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="custom-control custom-checkbox">
                    <input name="remember_session" onChange={handleChange} type="checkbox" className="custom-control-input" id="remember_session" defaultChecked={false} />
                    <label className="custom-control-label" htmlFor="remember_session">Permanecer registrado</label>
                    {/*
                    {data.remember_session && (
                        <small className="d-block text-danger"><strong>sesión activa</strong> durante 15 días.</small>
                    )}

                    */}
                </div>

                <div className="mt-3">
                    <button
                        onClick={handleClickSubmit}
                        disabled={loading}
                        className="btn btn-primary btn-block waves-effect waves-light" type="button">iniciar sesión</button>
                </div>

                <div className="mt-4 text-center">
                    <Link to="/recovery-password" className="text-muted">
                        <i className="mdi mdi-lock mr-1"></i> ¿Olvidaste tu contraseña?
                    </Link>
                </div>
            </form >
        </Fragment>
    )
}

const mapDispatchToProps = {
    saveSesionAuth, fetchRequest
}

/*
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch1: (state) => {
            dispatch(saveSesionAuth(state))
        }
    }
}
*/


const RecoveryPass = ({
    fetchRequest
}) => {

    const [responseMessage, setResponseMessage] = useState({})
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handleClickSubmit = async () => {
        setResponseMessage({})
        setLoading(true);
        let request = {
            'url': `${pathApi}/recoveryPassword`,
            'request': {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        };
        const response = await fetchRequest(request);

        setResponseMessage(response)
        setLoading(false);

        if (response.status == 200) {

        }
    }

    return (
        <Fragment>
            <AlertMessageSingular {...responseMessage} />
            <form className="form-horizontal" action="index">
                <div className="form-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <input name="email" onChange={handleChange} type="text" className="form-control" id="email" placeholder="Correo electrónico" maxLength={100} />
                </div>
                <div className="mt-3">
                    <button
                        onClick={handleClickSubmit}
                        disabled={loading}
                        className="btn btn-primary btn-block waves-effect waves-light" type="button">Continuar</button>
                </div>
            </form >
        </Fragment>
    )
}


export default connect(null, mapDispatchToProps)(Login);
export const RecoveryPassword = connect(null, mapDispatchToProps)(RecoveryPass);
