import React, { Fragment, useState, useEffect } from "react";
import { connect, connectAdvanced } from "react-redux";

/**actions */
import { fetchRequest } from "../../Redux/Actions/fetchRequest";
/**config */
import { pathApi } from "../../env";
/**helper */
import AlertMessageSingular from "../../Helpers/AlertMessageSingular";

const Question = ({
    Auth,
    fetchRequest
}) => {

    const [responseMessage, setResponseMessage] = useState({})
    const [step, setStep] = useState(1)

    return (
        <Fragment>
            <div className="checkout-tabs">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="nav nav-pills flex-column nav-justified " id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <a className={`${step == 1 ? "active" : "disabled"} nav-link `} id="v-pills-gen-ques-tab" data-toggle="pill" href="#v-pills-gen-ques" role="tab" aria-controls="v-pills-gen-ques" aria-selected="true">
                                {/*
                                <i className="bx bx-question-mark d-block check-nav-icon mt-4 mb-2"></i>
                                */}
                                <p className="font-weight-bold mb-2 mt-2">Encuesta</p>
                            </a>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="mb-2 mt-2">
                            <AlertMessageSingular {...responseMessage}></AlertMessageSingular>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <div className="tab-content" id="v-pills-tabContent">
                                    <div className="tab-pane fade show active" id="v-pills-gen-ques" role="tabpanel" aria-labelledby="v-pills-gen-ques-tab">
                                        <QuestionPollR
                                            setResponseMessage={setResponseMessage}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}



const QuestionPoll = ({
    Auth,
    fetchRequest,
    setResponseMessage
}) => {

    useEffect(() => {
        document.getElementById('title_module').innerText = "Encuesta";
    }, [])
    const { token } = Auth;

    const handle_save = async () => {
        setResponseMessage({});

        let fiebre = document.querySelector('input[name=fiebre]:checked');
        let sintomas = document.querySelector('input[name=sintomas]:checked');

        if (fiebre === null || sintomas === null) {
            alert("favor de contestar todas las preguntas");
            return false;
        }
        let percentaje = parseInt(fiebre.value) + parseInt(sintomas.value);

        let data = {
            'percentaje': percentaje
        };

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
        } else {
            if (response.insert) {
                hanldeOPenFile(response.data.id_survey_records);
            }
        }
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

    return (
        <Fragment>
            {/**content */}
            <h3 className="mb-4">A continuación responda a las pregunta.</h3>
            {/**question */}
            <div className="faq-box media mb-4">
                <div className="faq-icon mr-3">
                    <i className="bx bx-help-circle font-size-20 text-info"></i>
                </div>
                <div className="media-body">
                    <h5 className="font-size-15">{'FIEBRE > 37,7ºC ¿Presenta fiebre de más de 37,7ºC?'}</h5>
                    {/**div */}
                    <div className="custom-control custom-radio custom-control-inline p-3">
                        <input type="radio" id="_customRadioInline1" name="fiebre" className="custom-control-input" value={0} />
                        <label className="custom-control-label" htmlFor="_customRadioInline1"> si</label>
                    </div>
                    {/**div */}
                    <div className="custom-control custom-radio custom-control-inline p-3">
                        <input type="radio" id="__customRadioInline1" name="fiebre" className="custom-control-input" value={50} />
                        <label className="custom-control-label" htmlFor="__customRadioInline1"> no</label>
                    </div>
                </div>
            </div>
            {/**question */}
            <div className="faq-box media mb-4">
                <div className="faq-icon mr-3">
                    <i className="bx bx-help-circle font-size-20 text-info"></i>
                </div>
                <div className="media-body">
                    <h5 className="font-size-15">{'PRESENCIA DE SÍNTOMAS'}</h5>
                    {/**div */}
                    <div className="custom-control custom-radio custom-control-inline p-3">
                        <input type="radio" id="_customRadioInline2" name="sintomas" className="custom-control-input" value={0} />
                        <label className="custom-control-label" htmlFor="_customRadioInline2">si</label>
                    </div>
                    {/**div */}
                    <div className="custom-control custom-radio custom-control-inline p-3">
                        <input type="radio" id="__customRadioInline2" name="sintomas" className="custom-control-input" value={50} />
                        <label className="custom-control-label" htmlFor="__customRadioInline2">no</label>
                    </div>
                </div>
            </div>
            {/**end question */}
            <div className="mt-2 form-group">
                <button
                    onClick={handle_save}
                    type="button"
                    className="btn btn-primary waves-effect waves-light"
                >
                    <i className="font-size-16 align-middle mr-2"></i> Continuar
                </button>
            </div>
            {/**content */}
        </Fragment>
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


const QuestionPollR = connect(mapStateToProps, mapDispatchToProps)(QuestionPoll);

export default connect(mapStateToProps, mapDispatchToProps)(Question);
