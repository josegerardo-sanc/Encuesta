import { join } from "lodash";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
import PropTypes from 'prop-types';


import Toggle from 'react-toggle'
import "react-toggle/style.css" // for ES6 moduless

/**configurations */
import { pathApi } from '../../env';
/**actions */
import { fetchRequest } from "../../Redux/Actions/fetchRequest";

/**helper */
import { statusAccount } from '../../Helpers/StatusAccount'



const TableUser = ({
    fetchRequest,
    Auth,
    updateTable,
    handleOpenEdit
}) => {

    const { token } = Auth;
    const [users, setUsers] = useState([])
    const [roles, setRoles] = useState([])
    const [typeRol, setTypeRol] = useState(0);

    const [activePage, setActivePage] = useState(1);
    const [itemsCountPerPage, setItemsCountPerPage] = useState(10);
    const [totalItemsCount, setTotalItemsCount] = useState(0);

    const [dataPagination, setDataPagination] = useState({
        'startRow': 0,
        'endRow': 0
    });

    useEffect(() => {
        getUser();
    }, [updateTable])

    useEffect(() => {
        getRoles();
    }, [])


    const getUser = async (numberPage = 1, itemsCountPerPage = 10) => {

        let search = document.getElementById('searchUsuario').value;
        let typeRol = document.getElementById('typeRol').value;

        let request = {
            'url': `${pathApi}/getUsers`,
            'request': {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    'search': search,
                    'typeRol': typeRol,
                    'numberPage': numberPage,
                    'endRow': itemsCountPerPage
                })
            },
            'showMessage': false,
        };
        let response = await fetchRequest(request);
        //console.log(response);

        if (response.status == 200) {
            setUsers(response.data);

            setTotalItemsCount(response.totalRows);
            setActivePage(response.numberPage);

            setDataPagination({
                'startRow': response.startRow,
                'endRow': response.endRow,
                'totalRows': response.totalRows,
                'numberPage': response.numberPage
            });
        }
    }

    const handleDelete = async (e, item) => {

        let request = {
            'url': `${pathApi}/deleteUser/${item.id_users}`,
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
        //console.log(response);
        if (response.status == 200) {
            setUsers(users.filter(us => us.id_users != item.id_users));
            setTotalItemsCount(totalItemsCount - 1);
        }
    }

    const handleUpdateAccount = async (e, item) => {

        let statusAccountUser = e.target.checked;

        let request = {
            'url': `${pathApi}/updateAccount`,
            'request': {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    'id_user': item.id_users,
                    'statusAccountUser': statusAccountUser
                })
            }
        };
        let response = await fetchRequest(request);
        //console.log(response);
        if (response.status == 200) {
            getUser();
        }
    }

    const handleItemsCountPerPage = ({ target }) => {
        setItemsCountPerPage(target.value);
        //console.log("numberPage" + activePage, "itemsCountPerPage" + target.value)
        getUser(activePage, target.value)
    }

    const handleNumberPage = (numberPage) => {
        //console.log("numberPage" + numberPage, "itemsCountPerPage" + itemsCountPerPage)
        getUser(numberPage, itemsCountPerPage)
    }

    let clearTime = "";
    const handleSearchUser = ({ target }) => {
        clearTimeout(clearTime)
        clearTime = setTimeout(() => {
            getUser(1, itemsCountPerPage);
        }, 1000);
    }

    const handleTypeRol = (e) => {
        setTypeRol(e.target.value);
        getUser(1, itemsCountPerPage);
    }


    const handlePaintTable = () => {


        let { startRow } = dataPagination;
        let rows = users.map((item, key) => {

            startRow = startRow + 1;


            let { message, color } = statusAccount(item.account_status)

            let row = <tr key={item.id_users}>
                <td>{startRow}</td>
                <th>
                    {item.name} {item.last_name} {item.second_last_name}
                    <div>
                        <strong>Usuario:</strong> <span className={`badge badge-${color}`}>{message}</span>
                    </div>
                </th>
                <th>
                    {item.email}
                </th>
                <td>
                    <div className="d-flex justify-content-between align-center">
                        {join(item.roles.map(rol => rol.name))}
                        <Toggle
                            id='statusAccountUser'
                            defaultChecked={(item.account_status == "1" ? true : false)}
                            onChange={(e) => handleUpdateAccount(e, item)}
                        />
                    </div>
                </td>
                <td>
                    <button
                        data-type="user"
                        data-title="Editar usuario"
                        title="Actualizar/Ver Información"
                        onClick={(e) => handleOpenEdit(e, item)}
                        type="button" className="m-1 btn btn-warning waves-effect waves-light">
                        <i
                            data-type="user"
                            data-title="Editar usuario"
                            className="bx bx-edit-alt">
                        </i>
                    </button>
                    <button
                        title="Eliminar"
                        onClick={(e) => handleDelete(e, item)}
                        type="button" className="m-1 btn btn-danger waves-effect waves-light">
                        <i
                            className="bx bx-trash-alt"
                        ></i>
                    </button>
                </td>
            </tr>;

            return row;

        })

        return rows;
    }

    const getRoles = async () => {
        let request = {
            'url': `${pathApi}/getRoles`,
            'request': {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            },
            'showLoader': false
        };
        let response = await fetchRequest(request);
        if (response.status == 200) {
            setRoles(response.data)
        }
    }



    return (
        <Fragment>
            <div className="form-row">

                <div className="form-group col-sm-12 col-md-4">
                    <label className="form-control-label" style={{ opacity: '0' }}>Buscar</label>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar"
                            id="searchUsuario"
                            onChange={handleSearchUser}
                        />
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2">
                                <i className="fas fa-search"></i>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="form-group col-sm-12 col-md-4">
                    <label className="form-control-label">Tipo</label>
                    <select value={typeRol} onChange={handleTypeRol} id="typeRol" className="form-control">
                        <option value={0} disabled>Seleccione una opción</option>
                        {roles.map(item => (<option value={item.name} key={item.id}>{item.name}</option>))}
                        <option value={"all"}>Todos(*)</option>
                    </select>
                </div>
            </div>
            <div className="table-responsive mb-0" data-pattern="priority-columns">
                <table id="table_data" className="table table-striped table-bordered" style={{ width: '100%' }}>
                    <thead style={{ backgroundColor: "#1864ab", color: 'white' }}>
                        <tr>
                            <th>{'#'}</th>
                            <th>{'Nombre'}</th>
                            <th>{'Correo'}</th>
                            <th>{'Tipo de usuario'}</th>
                            <th>{'Acciones'}</th>
                        </tr>
                    </thead>
                    <tbody >
                        {handlePaintTable()}
                    </tbody>
                </table>
            </div>
            <div className="form-row">
                <div className="col-sm-12 col-md-6 d-flex align-items-center form-control border-0">
                    {/** Mostrando <strong>{dataPagination.startRow + 1}</strong> a <strong>{dataPagination.startRow + dataPagination.endRow}</strong> de <strong>{totalItemsCount}</strong> registros */}

                    Mostrando <strong className="mr-1 ml-1">{dataPagination.startRow + 1}</strong> a
                    <select className="mr-1 ml-1 form-control" value={itemsCountPerPage} onChange={handleItemsCountPerPage} style={{ width: '80px' }}>
                        <option value={10}>10</option>
                        <option value={30}>30</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                    de
                    <strong className="mr-1 ml-1">{totalItemsCount}</strong>
                    registros
                </div>
                <div className="col-sm-12 col-md-6 row justify-content-end">


                    <Pagination
                        linkClass={"page-link"}
                        itemClass={"page-item"}
                        activePage={activePage}
                        itemsCountPerPage={parseInt(itemsCountPerPage)}
                        totalItemsCount={totalItemsCount}
                        pageRangeDisplayed={5}
                        onChange={(numberPage) => handleNumberPage(numberPage)}
                    />
                </div>
            </div>
        </Fragment >
    )
}

const mapDispatchToProps = {
    fetchRequest
}

const mapStateToProps = ({ Auth }) => {
    return {
        Auth
    }
}


TableUser.propTypes = {
    updateTable: PropTypes.bool.isRequired,
    handleOpenEdit: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUser)
