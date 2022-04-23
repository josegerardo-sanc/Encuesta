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
    const [responseMessage, setResponseMessage] = useState({})
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
        setResponseMessage(response)
        setLoading(false);
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
            <AlertMessageSingular {...responseMessage} />
            <form className="form-horizontal" action="index">
                <div className="form-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <div className="input-group mb-0">
                        <div className="input-group-prepend">
                            <span className="input-group-text" >
                                <i className="fas fa-envelope"></i>
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

                <div className="mt-4 d-flex justify-content-around">
                    <Link to="/recovery-password" className="text-muted">
                        <button className="btn btn-link" type="button">
                            <i className="mdi mdi-lock mr-1"></i> ¿Olvidaste tu contraseña?
                        </button>
                    </Link>
                    <Link to="/register" className="text-link font-weight-bold">
                        <button className="btn btn-link" type="button">
                            Registrate
                        </button>
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
            setData({});
        }
    }

    return (
        <Fragment>
            <AlertMessageSingular {...responseMessage} />
            <form className="form-horizontal" action="index">
                <div className="form-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        name="email"
                        value={data.email || ""}
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder="Correo electrónico"
                        maxLength={100} />
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


const Register = ({
    saveSesionAuth,
    fetchRequest
}) => {

    const [responseMessage, setResponseMessage] = useState({})
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});

    const [careers, setCareers] = useState([]);


    useEffect(() => {
        handleGetCareers()
    }, [])


    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };


    const handleonKeyPress = (ev) => {
        if (ev.key === 'Enter') {
            handleClickSubmit();
        }
    }


    const handleClickSubmit = async () => {
        let request = {
            'url': `${pathApi}/saveUser`,
            'request': {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...data })
            }
        };
        const response = await fetchRequest(request);
        setResponseMessage(response)
        setLoading(false);
        if (response.status == 200) {
            handleReset();
        }
    }


    const handleShowPassword = (e) => {
        setShowPassword((showPassword) => !showPassword);
    }


    /**get careers */
    const handleGetCareers = async () => {
        setLoading(true);
        let request = {
            'url': `${pathApi}/getCareers`,
            'request': {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        };
        const response = await fetchRequest(request);
        if (response.status != 200) {
            setResponseMessage(response)
        }
        setCareers(response.data)
        setLoading(false);
    }

    const validMatricula = (e) => {
        var expreg = /^[0-9]{2}[Ee]{1}[0-9]{5}$/;

        if (e.target.value != "") {
            e.target.value = e.target.value.toUpperCase();
        }

        if (expreg.test(e.target.value)) {
            e.target.classList.remove('is-invalid');
            //e.target.classList.add('is-valid')
        } else {
            e.target.classList.add('is-invalid');
        }
        //console.log(e.target.value, "matricula valid" + expreg.test(e.target.value))

    }


    const handleReset = () => {
        setData({});
    }

    return (
        <Fragment>
            <AlertMessageSingular {...responseMessage} />
            <form className="mt-4 form-horizontal" action="index">
                {/**full name */}
                <div className="row">
                    {/**name */}
                    <div className="col-sm-4 form-group">
                        <label htmlFor="name">Nombre</label>
                        <div className="input-group mb-0">
                            <input
                                name="name"
                                onChange={handleChange}
                                value={data.name || ""}
                                type="text"
                                className="form-control"
                                maxLength={100}
                                placeholder="Nombre"
                            />
                        </div>
                    </div>
                    {/*last name*/}
                    <div className="col-sm-4 form-group">
                        <label htmlFor="last_name">Primer apellido</label>
                        <div className="input-group mb-0">
                            <input
                                name="last_name"
                                onChange={handleChange}
                                value={data.last_name || ""}
                                type="text"
                                className="form-control"
                                maxLength={100}
                                placeholder="Primer apellido"
                            />
                        </div>
                    </div>
                    {/*second last name*/}
                    <div className="col-sm-4 form-group">
                        <label htmlFor="second_last_name">Segundo apellido</label>
                        <div className="input-group mb-0">
                            <input
                                name="second_last_name"
                                onChange={handleChange}
                                value={data.second_last_name || ""}
                                type="text"
                                className="form-control"
                                maxLength={100}
                                placeholder="Segundo apellido"
                            />
                        </div>
                    </div>
                    {/**genero */}
                    <div className="col-sm-6 form-group">
                        <label htmlFor="" className="form-label label_filter">Genero</label>
                        <div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input
                                    onChange={handleChange}
                                    defaultValue={"Masculino"}
                                    checked={data.gender == "Masculino" ? true : false}
                                    name="gender"
                                    type="radio" id="_customRadioInline1" className="custom-control-input" />
                                <label className="custom-control-label" htmlFor="_customRadioInline1">Masculino</label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input
                                    onChange={handleChange}
                                    defaultValue={"Femenino"}
                                    checked={data.gender == "Femenino" ? true : false}
                                    name="gender"
                                    type="radio" id="_customRadioInline2" className="custom-control-input" />
                                <label className="custom-control-label" htmlFor="_customRadioInline2">Femenino</label>
                            </div>
                        </div>
                    </div>
                    {/**email */}
                    <div className="col-sm-12 form-group">
                        <div>
                            <label htmlFor="email">Correo electrónico</label>
                            <div className="input-group mb-0">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" >
                                        <i className="fas fa-envelope"></i>
                                    </span>
                                </div>
                                <input
                                    name="email"
                                    onChange={handleChange}
                                    value={data.email || ""}
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    placeholder="Correo electrónico"
                                    maxLength={100}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/**password */}
                <div className="row form-group">
                    <div className="col-sm-6 form-group">
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
                                value={data.password || ""}
                                type={`${showPassword ? "text" : "password"}`}
                                className="form-control"
                                id="password"
                                placeholder="Ingresa tu clave"
                                autoComplete="current-password"
                                maxLength={100}
                            />
                            <div className="input-group-append" onClick={handleShowPassword}>
                                <span className="input-group-text" id="span_icon">
                                    {
                                        showPassword ? (
                                            <i className="far fa-eye"></i>
                                        ) : (

                                            <i className="far fa-eye-slash"></i>
                                        )
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 form-group">
                        <label htmlFor="password_confirmation">Confirma contraseña</label>
                        <div className="input-group mb-0">
                            <div className="input-group-prepend">
                                <span className="input-group-text" >
                                    <i className="fas fa-key"></i>
                                </span>
                            </div>
                            <input
                                name="password_confirmation"
                                onChange={handleChange}
                                value={data.password_confirmation || ""}
                                type={`${showPassword ? "text" : "password"}`}
                                className="form-control"
                                id="password_confirmation"
                                placeholder="Confirma tu clave"
                                autoComplete="current-password"
                                maxLength={100}
                            />
                            <div className="input-group-append" onClick={handleShowPassword}>
                                <span className="input-group-text" id="span_icon">
                                    {
                                        showPassword ? (
                                            <i className="far fa-eye"></i>
                                        ) : (

                                            <i className="far fa-eye-slash"></i>
                                        )
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {/**datos escolares */}
                <div className="row">
                    {/**matricula */}
                    <div className="col-sm-12 form-group">
                        <label htmlFor="matricula">Matricula</label>
                        <div className="input-group mb-0">
                            <input
                                name="matricula"
                                onChange={handleChange}
                                value={data.matricula || ""}
                                onKeyUp={(e) => validMatricula(e)}
                                type="text"
                                className="form-control"
                                maxLength={8}
                                placeholder="Matricula"
                            />
                        </div>
                    </div>
                    {/**carreras */}
                    <div className="col-sm-12 form-group">
                        <label htmlFor="careers">Carrera</label>
                        <select
                            className="form-control"
                            name="careers"
                            id="careers"
                            onChange={handleChange}
                            value={data.careers || 0}
                        >
                            <option value={0} disabled>{'Selecciona tu carrera'}</option>
                            {
                                careers.map(item => <option key={item.id_university_careers} value={item.id_university_careers}>{item.name}</option>)
                            }
                        </select>
                    </div>
                    {/**semestres */}
                    <div className="col-sm-6 form-group">
                        <label htmlFor="semester" className="form-label label_filter">Semestre</label>
                        <select
                            name="semester"
                            onChange={handleChange}
                            value={data.semester || 0}
                            id="semester"
                            className="form-control">
                            <option value="0" disabled>Selecciona tu semestre</option>
                            <option value="1">1º Semestre</option>
                            <option value="2">2º Semestre</option>
                            <option value="3">3º Semestre</option>
                            <option value="4">4º Semestre</option>
                            <option value="5">5º Semestre</option>
                            <option value="6">6º Semestre</option>
                            <option value="7">7º Semestre</option>
                            <option value="8">8º Semestre</option>
                            <option value="9">9º Semestre</option>
                        </select>
                    </div>
                    {/**turno */}
                    <div className="col-sm-6 form-group">
                        <label htmlFor="school_shift" className="form-label label_filter">Turno</label>
                        <select
                            name="school_shift"
                            onChange={handleChange}
                            value={data.school_shift || 0}
                            id="school_shift"
                            className="form-control">
                            <option value="0" disabled >Selecciona una opción</option>
                            <option value="Matutino">Matutino</option>
                            <option value="Vespertino">Vespertino</option>
                        </select>
                    </div>
                </div>
                <div className="mt-3">
                    <button
                        onClick={handleClickSubmit}
                        disabled={loading}
                        className="btn btn-primary btn-block waves-effect waves-light" type="button">
                        Continuar
                    </button>
                    {/*
                    <button
                        onClick={handleReset}
                        className="btn btn-danger btn-block waves-effect waves-light" type="button">
                        Continuar
                    </button>
                    */}
                </div>
            </form >
        </Fragment >
    )
}


export default connect(null, mapDispatchToProps)(Login);
export const RecoveryPassword = connect(null, mapDispatchToProps)(RecoveryPass);
export const RegisterStudent = connect(null, mapDispatchToProps)(Register);
