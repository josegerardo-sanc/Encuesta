import React, { Fragment, useState, useEffect } from "react";
import { connect, connectAdvanced } from "react-redux";
import Pagination from "react-js-pagination";
import { useParams, Link } from 'react-router-dom'

/**actions */
import { fetchRequest } from "../../Redux/Actions/fetchRequest";
/**config */
import { pathApi, pathDashboard } from "../../env";
/**helper */
import AlertMessageSingular from "../../Helpers/AlertMessageSingular";


const QuestionHistory = ({
    fetchRequest,
    Auth
}) => {
    useEffect(() => {
        document.getElementById('title_module').innerText = "Historial de encuesta";
    }, [])

    const { token } = Auth;
    const [questionRecords, setQuestionRecords] = useState([])
    //table
    const [activePage, setActivePage] = useState(1);
    const [itemsCountPerPage, setItemsCountPerPage] = useState(10);
    const [totalItemsCount, setTotalItemsCount] = useState(0);

    const [dataPagination, setDataPagination] = useState({
        'startRow': 0,
        'endRow': 0
    });

    useEffect(() => {
        getQuestionRecords();
    }, [])

    const getQuestionRecords = async (numberPage = 1, itemsCountPerPage = 10) => {

        setQuestionRecords([]);
        let request = {
            'url': `${pathApi}/getQuestionHistoryStudent`,
            'request': {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    'numberPage': numberPage,
                    'endRow': itemsCountPerPage
                })
            }
        };
        let response = await fetchRequest(request);
        //console.log(response);

        if (response.status == 200) {
            setQuestionRecords(response.data);
            //table
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

    const handlePaintTable = () => {


        let { startRow } = dataPagination;
        let rows = questionRecords.map((item, key) => {

            startRow = startRow + 1;
            let colorCircle = item.percentage < 80 ? "red" : "green";
            let row = <tr key={item.id_survey_records}>
                <td>{startRow}</td>
                <td>{item.full_name}</td>
                <td>{item.matricula}</td>
                <td>{item.carrera}</td>
                <td>{item.semester}</td>
                <td>{item.school_shift}</td>
                <td>{item.last_registration_date}</td>
                <td>
                    <Link
                        to={`${pathDashboard}/question/suvery-records/${item.id_users}`}
                    >
                        <button
                            className="btn btn-light">
                            Ver más <span class="badge badge-danger waves-effect waves-light">{item.totalRows}</span>
                        </button>
                    </Link>
                </td>
            </tr>;
            return row;
        })

        return rows;
    }

    const handleNumberPage = (numberPage) => {
        //console.log("numberPage" + numberPage, "itemsCountPerPage" + itemsCountPerPage)
        getQuestionRecords(numberPage, itemsCountPerPage)
    }
    const handleItemsCountPerPage = ({ target }) => {
        setItemsCountPerPage(target.value);
        //console.log("numberPage" + activePage, "itemsCountPerPage" + target.value)
        getQuestionRecords(activePage, target.value)
    }

    return (<Fragment>
        <div className="card">
            <div className="card-body">
                <div className="table-responsive mb-0" data-pattern="priority-columns">
                    <table id="table_data" className="table table-striped table-bordered" style={{ width: '100%' }}>
                        <thead style={{ backgroundColor: "#1864ab", color: 'white' }}>
                            <tr>
                                <th>{'#'}</th>
                                <th>{'Nombre'}</th>
                                <th>{'Matricula'}</th>
                                <th>{'Carrera'}</th>
                                <th>{'Semestre'}</th>
                                <th>{'Turno'}</th>
                                <th>{'Ultimo registro'}</th>
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
            </div>
        </div>
    </Fragment>)
}


const QuestionHistory_Singular = (props) => {

    const {
        fetchRequest,
        Auth
    } = props;

    console.log(props)

    let { id } = useParams();

    useEffect(() => {
        document.getElementById('title_module').innerText = "Historial";

        if (id != undefined && id != null) {
            getQuestionRecords(id);
        }

    }, [])

    const { token } = Auth;
    const [questionRecords, setQuestionRecords] = useState([])
    //table
    const [activePage, setActivePage] = useState(1);
    const [itemsCountPerPage, setItemsCountPerPage] = useState(10);
    const [totalItemsCount, setTotalItemsCount] = useState(0);

    const [dataPagination, setDataPagination] = useState({
        'startRow': 0,
        'endRow': 0
    });
    const [dataUser, setDataUser] = useState({})

    const getQuestionRecords = async (numberPage = 1, itemsCountPerPage = 10) => {

        setQuestionRecords([]);
        let request = {
            'url': `${pathApi}/getHistoryStudent`,
            'request': {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    'numberPage': numberPage,
                    'endRow': itemsCountPerPage,
                    'id_users': id
                })
            }
        };
        let response = await fetchRequest(request);
        //console.log(response);

        if (response.status == 200) {
            setQuestionRecords(response.data);
            setDataUser(response.dataUser);
            //table
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

    const handlePaintTable = () => {


        let { startRow } = dataPagination;
        let rows = questionRecords.map((item, key) => {

            startRow = startRow + 1;
            let colorCircle = item.percentage < 80 ? "red" : "green";
            let row = <tr key={item.id_survey_records}>
                <td>{startRow}</td>
                <td>
                    <i className="fas fa-circle" style={{
                        color: colorCircle
                    }}></i>
                </td>
                <td>{item.created_at}</td>
                <td>
                    <button
                        title="Descargar"
                        onClick={(e) => alert("En desarrollo.")}
                        type="button" className="m-1 btn btn-link waves-effect waves-light">
                        Ver encuesta
                    </button>
                </td>
            </tr>;
            return row;
        })

        return rows;
    }

    const handleNumberPage = (numberPage) => {
        //console.log("numberPage" + numberPage, "itemsCountPerPage" + itemsCountPerPage)
        getQuestionRecords(numberPage, itemsCountPerPage)
    }
    const handleItemsCountPerPage = ({ target }) => {
        setItemsCountPerPage(target.value);
        //console.log("numberPage" + activePage, "itemsCountPerPage" + target.value)
        getQuestionRecords(activePage, target.value)
    }

    return (<Fragment>
        <div className="card">
            <div className="card-body">
                <div><h4><strong className="text-dark">Nombre:</strong>{dataUser.full_name}</h4></div>
                <div><h4><strong className="text-dark">Matricula:</strong>{dataUser.matricula}</h4></div>
                <div><h4><strong className="text-dark">Carrera:</strong>{dataUser.carrera}</h4></div>
                <div><h4><strong className="text-dark">Semestre:</strong>{dataUser.semester}</h4></div>
                <div><h4><strong className="text-dark">Turno:</strong>{dataUser.school_shift}</h4></div>

                <div className="table-responsive mb-0 mt-4" data-pattern="priority-columns">
                    <table id="table_data" className="table table-striped table-bordered" style={{ width: '100%' }}>
                        <thead style={{ backgroundColor: "#1864ab", color: 'white' }}>
                            <tr>
                                <th>{'#'}</th>
                                <th>{'status'}</th>
                                <th>{'Fecha registro'}</th>
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
            </div>
        </div>
    </Fragment>)
}



const mapStateToProps = ({ Auth }) => {
    return {
        Auth
    }
}

const mapDispatchToProps = {
    fetchRequest
}


export default connect(mapStateToProps, mapDispatchToProps)(QuestionHistory);
export const QuestionHistorySingular = connect(mapStateToProps, mapDispatchToProps)(QuestionHistory_Singular);
