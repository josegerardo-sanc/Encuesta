import React, { Fragment, useState, useEffect } from "react";
import { connect, connectAdvanced } from "react-redux";

/**actions */
import { fetchRequest } from "../../Redux/Actions/fetchRequest";
/**config */
import { pathApi } from "../../env";
/**helper */
import AlertMessageSingular from "../../Helpers/AlertMessageSingular";
import { object } from "prop-types";


const Question = ({
    Auth,
    fetchRequest
}) => {

    useEffect(() => {
        document.getElementById('title_module').innerText = "Encuesta";
        getQuestion();
    }, [])

    const [responseMessage, setResponseMessage] = useState({})

    const { token } = Auth;



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

    const [questions, setQuestions] = useState([]);

    const getQuestion = async (e) => {
        setResponseMessage({});
        let request = {
            'url': `${pathApi}/getQuestion`,
            'request': {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        };
        const response = await fetchRequest(request);
        setQuestions(response.data);
    }

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

        let selectionAnswer = JSON.parse(quest.selectionAnswer);
        if (quest.input == "selected") {
            return (
                <select
                    onChange={handleChangeInputDate}
                    class="form-control" name={quest.id} key={quest.id} defaultValue="0" data-selected_date={quest.selected_date}>
                    <option value="0">Seleccione una opción</option>
                    {selectionAnswer.map(item => <option value={item}>{item}</option>)}
                </select>
            )
        } else {
            return <input className="form-control" type="text" name={quest.id} key={quest.id} placeholder="" />
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


    const handleSendForm = async (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.target))
        //console.log(JSON.stringify(data));
        setResponseMessage({});
        let request = {
            'url': `${pathApi}/answerQuestion`,
            'request': {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            }
        };
        const response = await fetchRequest(request);
        setResponseMessage(response);
        if (response.status != 200) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            setStep(0);
            document.getElementById('form_questions').reset();
            if (response.insert) {
                hanldeOPenFile(response.data.id_survey_records);
            }
        }

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
                            <div className="col-sm-12 mb-4 mt-4">
                                <AlertMessageSingular {...responseMessage}></AlertMessageSingular>
                            </div>
                            <form id="form_questions" onSubmit={handleSendForm}>
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
                                                {index == 3 ? (
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary btn-block">Enviar</button>
                                                ) : (
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
                            </form>
                        </div>
                    </div>
                </div>
            </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(Question);
