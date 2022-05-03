import React, { Fragment, useState, useEffect } from "react";
import { connect, connectAdvanced } from "react-redux";
import Pagination from "react-js-pagination";

/**actions */
import { fetchRequest } from "../../Redux/Actions/fetchRequest";
/**config */
import { pathApi } from "../../env";
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
            'url': `${pathApi}/getQuestionHistory`,
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
                <td>
                    <i className="fas fa-circle" style={{
                        color: colorCircle
                    }}></i>
                </td>
                <td>{item.created_at}</td>
                <td>
                    <button
                        disabled={(item.percentage < 80 ? true : false)}
                        title="Descargar"
                        onClick={(e) => hanldeOPenFile(item.id_survey_records)}
                        type="button" className="m-1 btn btn-primary waves-effect waves-light">
                        Descargar QR
                    </button>
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


    const hanldeOPenFile = async (idSurvey) => {
        let requestqR = {
            'url': `${pathApi}/printQr/${idSurvey}`,
            'request': {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            },
            'file_blob': true
        };
        const response = await fetchRequest(requestqR);
        console.log(response);
    }

    return (<Fragment>
        <div className="card">
            <div className="card-body">
                <div className="table-responsive mb-0" data-pattern="priority-columns">
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
