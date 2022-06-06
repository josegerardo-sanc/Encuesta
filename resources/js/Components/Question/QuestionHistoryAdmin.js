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
    const [questions, setQuestions] = useState([]);
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
                <td><strong>{item.percentage}%</strong></td>
                <td>{item.created_at}</td>
                <td>
                    <button
                        title="Descargar"
                        onClick={(e) => hanldeAnswers(e, item.id_survey_records)}
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


    const hanldeAnswers = async (e, id_survey_records) => {
        e.preventDefault();

        let request = {
            'url': `${pathApi}/getAnswersUser`,
            'request': {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    'id_survey_records': id_survey_records
                })
            }
        };
        let response = await fetchRequest(request);
        if (response.status == 200) {
            setQuestions(response.data);
            window.$('#content_answersUser').modal('show');
        }

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
                                <th>{'Porcentaje'}</th>
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

        <div className="modal fade" id="content_answersUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div className="modal-dialog modal-xl" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Encuesta</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Question questions={questions} />
                    </div>
                </div>
            </div>
        </div>

    </Fragment>)
}


const Question = ({
    questions
}) => {

    let contador = 0;
    const pintarPreguntas = (step) => {
        let rows = questions.map((item, index) => {
            if (item.type == (step + 1)) {
                contador = contador + 1;
                return (
                    <div className="faq-box media mb-4" key={item.id}>
                        <div className="faq-icon mr-3">
                            <i className="bx bx-help-circle font-size-20 text-info"></i>
                        </div>
                        <div className="media-body">
                            <h5 className="font-size-15">{contador}.¿{item.question}?</h5>
                            {typeHtml(item)}
                            {item.selected_date == "yes" && (
                                <input className="mt-2 form-group form-control d-none" type="date" name="selected_date" id="selected_date" />
                            )}
                        </div>
                    </div>
                )
            } else {
                contador = 0;
            }
        })
        return rows;

    }


    const typeHtml = (quest) => {

        if (quest.input == "selected") {
            return (
                <select
                    disabled
                    onChange={handleChangeInputDate}
                    class="form-control" name={quest.id} key={quest.id} defaultValue="0" data-selected_date={quest.selected_date}>
                    <option>{quest.answers}</option>
                </select>
            )
        } else {
            return <input disabled className="form-control" type="text" name={quest.id} key={quest.id} placeholder="" value={quest.answers || ""} />
        }
    }

    const handleChangeInputDate = (e) => {

        let is_date = e.target.getAttribute('data-selected_date');
        let opcion = e.target.value;
        if (is_date == "yes") {
            if (opcion == "si") {
                document.querySelector('#selected_date').classList.remove('d-none');
                document.querySelector('#selected_date').classList.add('d-block');
            } else {
                document.querySelector('#selected_date').classList.remove('d-block');
                document.querySelector('#selected_date').classList.add('d-none');
                document.querySelector('#selected_date').value = "";
            }
        }
    }

    const title = ["Antecedentes", "Diagnostico", "Contacto Social", "Factores de riesgo"];
    const [step, setStep] = useState(0);
    const handlesetStep = (index) => {
        setStep(index)
    }

    return (
        <Fragment>
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-12 col-md-2">
                            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                {title.map((item, index) => (
                                    <Fragment key={index}>
                                        <a
                                            key={index}
                                            className={index == step ? "nav-link active" : "nav-link"}
                                            id="v-pills-settings-tab"
                                            data-toggle="pill"
                                            onClick={() => handlesetStep(index)}
                                            role="tab"
                                            aria-controls={"#" + index}
                                            aria-selected="false"
                                        >
                                            {item}
                                        </a>
                                    </Fragment>
                                ))}
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-8">
                            <div className="tab-content" id="v-pills-tabContent">
                                {title.map((item, index) => (
                                    <Fragment>
                                        <div
                                            key={index}
                                            class={index == step ? "tab-pane fade show active" : "tab-pane fade"}
                                            id={"tab_" + index}
                                            role="tabpanel"
                                            aria-labelledby="v-pills-home-tab"
                                        >
                                            <h1 className="display-4 mb-3">{item}</h1>

                                            {pintarPreguntas(index)}
                                            {index < 3 && (
                                                <a
                                                    onClick={() => handlesetStep(index + 1)}
                                                    data-toggle="pill"
                                                    role="tab"
                                                    aria-controls={"#" + index}
                                                    aria-selected="false"
                                                    className="btn btn-secondary btn-block">Siguiente
                                                </a>
                                            )}
                                        </div>
                                    </Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </Fragment >
    )
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
