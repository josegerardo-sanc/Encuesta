
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";

/**actions */
import { fetchRequest } from '../../Redux/Actions/fetchRequest';
import { updateDataUserAuth } from '../../Redux/Actions/Auth';

/**configurations */
import { pathApi } from "../../env";


/**logo */
import imageProfileDefault from '../Layout/imageProfileDefault.png';

const CardProfileConnect = ({ Auth, fetchRequest, updateDataUserAuth }) => {

    const { user, token } = Auth;
    //console.log(user, user.roleNames);
    const [uploadFile, setUploadFile] = useState(false)

    const handlePhotoUpdate = async () => {
        let file = document.getElementById('photo_user').files;
        console.log(file)

        if (file.length > 0) {
            var formData = new FormData()
            formData.append('photo', file[0])

            let request = {
                'url': `${pathApi}/updateImageProfile`,
                'request': {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        //'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    'body': formData
                },
                'showMessage': true
            };
            let response = await fetchRequest(request);
            if (response.status == 200) {
                updateDataUserAuth(response.data);
                setUploadFile(false);
            }
        }

    }

    const handlePhotoSearch = async () => {
        document.getElementById('photo_user').click();
    }

    const changeFile = (e) => {
        let file = e.target.files[0];
        //console.log(file)
        let invalid_img_photo = document.getElementById('invalid_img_photo');
        invalid_img_photo.innerHTML = "";
        let error_img = "";

        if (validFileType(file)) {
            /**validacion del peso */
            let sizeImg = file.size;
            //KB  1024
            //3MB EN EL BACKEND 3145728
            //1MB 1048576
            let heigthMax = (3 * 1048576);
            if (sizeImg < heigthMax) {
                let image = document.getElementById('avatarImg');
                image.src = URL.createObjectURL(file);
                setUploadFile(true);
                handlePhotoUpdate();
                return false;
            } else {
                error_img += `<br/> <strong>Peso maximo ${returnFileSize(heigthMax)} MB ${returnFileSize(sizeImg)}</strong >.`;
            }
        } else {
            error_img += `<br/> <strong>Formato invalido ${file.name.split('.').pop()}</strong >`;
        }
        e.target.value = "";
        invalid_img_photo.innerHTML = `<strong>Nombre del archivo</strong> ${file.name}  ${error_img} `;
        setUploadFile(false);

    }

    const handlePhotoCancel = () => {
        setUploadFile(false)
        document.getElementById('invalid_img_photo').innerHTML = "";
    }


    function returnFileSize(number) {
        //El tamaño del archivo en bytes.
        if (number < 1024) {
            return number + 'bytes';
        } else if (number >= 1024 && number < 1048576) {
            return (number / 1024).toFixed(1) + 'KB';
        } else if (number >= 1048576) {
            return (number / 1048576).toFixed(1) + 'MB';
        }
    }


    const fileTypes = [
        "image/apng",
        "image/jpeg",
        "image/pjpeg",
        "image/png"
    ];

    function validFileType(file) {
        return fileTypes.includes(file.type);
    }

    return (
        <Fragment>
            <div className="card">
                <div className="card-body">
                    <div className="profile-widgets py-3">

                        <div className="text-center">
                            <div className="">
                                <img
                                    src={(Auth.hasOwnProperty('user') && user.photo != null ? user.photo : imageProfileDefault)}
                                    alt="photo"
                                    className="avatar-lg mx-auto img-thumbnail rounded-circle"
                                    style={{ objectFit: 'cover' }}
                                    id="avatarImg"
                                />
                                <div className="online-circle"><i className="fas fa-circle text-success"></i></div>
                            </div>
                            {/**photo action */}
                            <div>
                                <span
                                    onClick={handlePhotoSearch}
                                    className="btn btn-info badge badge-info">{'Editar'}</span>
                                {/*
                                codigo para actualizar la foto de manera manual
                                {uploadFile && (
                                    <Fragment>
                                        <span
                                            onClick={handlePhotoUpdate}
                                            className="btn btn-success  badge badge-success">{'Guardar'}</span>
                                        <span
                                            onClick={handlePhotoCancel}
                                            className="btn btn-danger badge badge-danger">{'Cancelar'}</span>
                                    </Fragment>
                                )}*/}

                                {/**accept="image/*" */}
                                <div className="block">
                                    <small className="text-danger" id="invalid_img_photo"></small>
                                </div>
                                <input type="file" id="photo_user" onChange={changeFile} style={{ display: 'none' }} />
                            </div>
                            {/**photo action */}
                            <div className="mt-3 ">
                                <a href="#" className="text-dark font-weight-medium font-size-16">
                                    {(Auth.hasOwnProperty('user') && user.name != null ? user.name : "test")}
                                </a>
                                <p className="text-body mt-1 mb-1">
                                    {(Auth.hasOwnProperty('user') && user.roleNames != null ? (user.roleNames.toString()) : "rol test")}
                                </p>

                                {/*
                                <span className="badge badge-success">{'Follow Me'}</span>
                                <span className="badge badge-danger">{'Message'}</span>*/}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    )
}


const FormProfileConnect = ({ Auth, fetchRequest, updateDataUserAuth }) => {
    const { user, token } = Auth;
    const [data, setData] = useState(user)
    const [seePassword, setSeePassword] = useState(false)

    const handleUpdateProfile = async () => {

        console.log(data)

        let data_object = Object.assign({ ...data, 'type_form': 'profile' });

        let request = {
            'url': `${pathApi}/updateProfile`,
            'request': {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                'body': JSON.stringify(data_object)
            },
            'showMessage': true
        };
        let response = await fetchRequest(request);
        console.log(response);
        if (response.status == 200) {
            updateDataUserAuth(response.data);
        }


    }

    const onChangeInputData = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }


    const handleSeePassword = () => {
        setSeePassword(!seePassword);
    }



    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title mb-4">Información de perfil</h4>

                <form action="#" method="post">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="control-label">{'Nombre *'}</label>
                                <input className="form-control" type="text" name="name" defaultValue={data.name} onChange={onChangeInputData} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="control-label">{'Primer Apellido *'}</label>
                                <input className="form-control" type="text" name="last_name" defaultValue={data.last_name} onChange={onChangeInputData} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="control-label">{'Segundo Apellido *'}</label>
                                <input className="form-control" type="text" name="second_last_name" defaultValue={data.second_last_name} onChange={onChangeInputData} />
                            </div>
                        </div>
                        {/**genero */}
                        <div className="col-sm-12 form-group">
                            <label htmlFor="" className="form-label label_filter">Genero</label>
                            <div>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input
                                        defaultValue={"Masculino"}
                                        checked={data.gender == "Masculino" ? true : false}
                                        name="gender"
                                        type="radio" id="_customRadioInline1" className="custom-control-input" />
                                    <label className="custom-control-label" htmlFor="_customRadioInline1">Masculino</label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input
                                        defaultValue={"Femenino"}
                                        checked={data.gender == "Femenino" ? true : false}
                                        name="gender"
                                        type="radio" id="_customRadioInline2" className="custom-control-input" />
                                    <label className="custom-control-label" htmlFor="_customRadioInline2">Femenino</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label">{'Correo *'}</label>
                                <input className="form-control" type="email" name="email" defaultValue={data.email} onChange={onChangeInputData} placeholder="Correo" />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label">{'Teléfono *'}</label>
                                <input className="form-control" type="tel" name="phone" defaultValue={data.phone || ""} onChange={onChangeInputData} placeholder="Teléfono" />
                            </div>
                        </div>

                        {/*
                        <div className="col-md-12">
                            <div className="form-group">
                                <label className="control-label">{'Dirección'} <small className="text-muted">({'opcional'})</small></label>
                                <input className="form-control" type="text" name="addreses" defaultValue={data.addreses || ""} onChange={onChangeInputData} placeholder="Dirección" />
                            </div>
                        </div>
                       */}

                        <div className="mt-3 col-md-12">
                            <hr></hr>
                            <p className="font-weight-bold text-muted">Para cambiar su contraseña complete ambos campos *</p>
                        </div>

                        {/*
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label className="control-label">Contraseña anterior</label>
                                    <input className="form-control" type="password" name="old_password" />
                                </div>
                            </div>
                            */}

                        <div className="col-md-6 form-group">
                            <label className="control-label">{'Nueva contraseña'}</label>
                            <div className="input-group mb-0">
                                <input type={seePassword ? "text" : "password"} name="password" onChange={onChangeInputData} className="form-control" placeholder="Nueva contraseña" />
                                <div className="input-group-append">
                                    <span className="input-group-text" onClick={handleSeePassword} style={{ backgroundColor: 'white' }}>
                                        {
                                            seePassword ? (<i className="far fa-eye"></i>) : (<i className="far fa-eye-slash"></i>)
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 form-group">
                            <label className="control-label">{'Confirmar contraseña'}</label>
                            <div className="input-group mb-0">
                                <input type={seePassword ? "text" : "password"} name="password_confirmation" onChange={onChangeInputData} className="form-control" placeholder="Confirmar contraseña" />
                                <div className="input-group-append">
                                    <span className="input-group-text" onClick={handleSeePassword} style={{ backgroundColor: 'white' }}>
                                        {
                                            seePassword ? (<i className="far fa-eye"></i>) : (<i className="far fa-eye-slash"></i>)
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-end">
                        <button onClick={handleUpdateProfile} type="button" className="btn btn-primary">{'Guardar'}</button>
                    </div>
                </form >
            </div >
        </div >
    )
}

const FormStudent = ({
    Auth,
    fetchRequest,
    updateDataUserAuth
}) => {
    const { user, token } = Auth;
    const [data, setData] = useState({});

    let rolType = "";

    if (Auth.hasOwnProperty('user') && user.roleNames != null) {
        rolType = Auth.user.roleNames[0]
    }

    useEffect(() => {
        if (rolType == "Alumno") {
            hanldeStudent();
        }
    }, [])


    const hanldeStudent = async () => {
        let request = {
            'url': `${pathApi}/getDataStudent`,
            'request': {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        };
        let response = await fetchRequest(request);
        if (response.status == 200) {
            setData(response.data)
        }
    }

    if (rolType == "Alumno") {
        return (
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title mb-4">Información escolar</h4>
                    {/**datos escolares */}
                    <div className="row">
                        {/**matricula */}
                        <div className="col-sm-12 form-group">
                            <label htmlFor="matricula">Matricula</label>
                            <div className="input-group mb-0">
                                <input
                                    value={data.matricula || ""}
                                    name="matricula"
                                    type="text"
                                    className="form-control"
                                    maxLength={8}
                                    placeholder="Matricula"
                                    disabled={true}
                                />
                            </div>
                        </div>
                        {/**carreras */}
                        <div className="col-sm-12 form-group">
                            <label htmlFor="careers">Carrera</label>
                            <input
                                name="careers"
                                type="text"
                                value={data.name || ""}
                                className="form-control"
                                maxLength={8}
                                placeholder="careers"
                                disabled={true}
                            />
                        </div>
                        {/**semestres */}
                        <div className="col-sm-6 form-group">
                            <label htmlFor="semester" className="form-label label_filter">Semestre</label>
                            <select
                                disabled={true}
                                value={data.semester}
                                name="semester"
                                id="semester"
                                className="form-control">
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
                                disabled={true}
                                value={data.school_shift}
                                name="school_shift"
                                id="school_shift"
                                className="form-control">
                                <option value="0" disabled >Selecciona una opción</option>
                                <option value="Matutino">Matutino</option>
                                <option value="Vespertino">Vespertino</option>
                            </select>
                        </div>
                    </div>
                </div >
            </div >
        )
    }
    return '';
}


const mapStateToProps = ({ Auth }) => {
    return {
        Auth
    }
}

const mapDispatchToProps = {
    fetchRequest, updateDataUserAuth
}

const CardProfile = connect(mapStateToProps, mapDispatchToProps)(CardProfileConnect);
const FormProfile = connect(mapStateToProps, mapDispatchToProps)(FormProfileConnect);
const FormProfileStudent = connect(mapStateToProps, mapDispatchToProps)(FormStudent);
export {
    CardProfile,
    FormProfile,
    FormProfileStudent
};
