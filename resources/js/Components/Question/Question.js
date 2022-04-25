import React, { Fragment } from "react";




const Question = () => {

    return (
        <Fragment>
            <div className="checkout-tabs">
                <div className="row">
                    <div className="col-lg-2">
                        <div className="nav nav-pills flex-column nav-justified " id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <a className=" nav-link active" id="v-pills-gen-ques-tab" data-toggle="pill" href="#v-pills-gen-ques" role="tab" aria-controls="v-pills-gen-ques" aria-selected="true">
                                {/*
                                <i className="bx bx-question-mark d-block check-nav-icon mt-4 mb-2"></i>
                                */}
                                <p className="font-weight-bold mb-2 mt-2">Encuesta</p>
                            </a>
                            <a
                                className="nav-link nav-fill disabled"
                                id="v-pills-privacy-tab"
                                data-toggle="pill"
                                href="#v-pills-privacy"
                                role="tab"
                                aria-controls="v-pills-privacy"
                                aria-selected="false"

                            >
                                {/*
                                <i className="bx bx-question-mark d-block check-nav-icon mt-4 mb-2"></i>
                                */}
                                <p className="font-weight-bold mb-2 mt-2">Descargar QR</p>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-10">
                        <div className="card">
                            <div className="card-body">
                                <div className="tab-content" id="v-pills-tabContent">
                                    <div className="tab-pane fade show active" id="v-pills-gen-ques" role="tabpanel" aria-labelledby="v-pills-gen-ques-tab">
                                        <QuestionPoll></QuestionPoll>
                                    </div>
                                    <div className="tab-pane fade" id="v-pills-privacy" role="tabpanel" aria-labelledby="v-pills-privacy-tab">
                                        {/**content */}
                                        <h4 className="card-title mb-5">Descargar tu qr</h4>

                                        {/**content */}
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

const UserData = () => {
    return (
        <Fragment>

        </Fragment>
    )
}
const QuestionPoll = () => {
    return (
        <Fragment>
            {/**content */}
            <h4 className="card-title mb-5">Preguntas</h4>
            <div className="faq-box media mb-4">
                <div className="faq-icon mr-3">
                    <i className="bx bx-help-circle font-size-20 text-success"></i>
                </div>
                <div className="media-body">
                    <h5 className="font-size-15">Where can I get some?</h5>
                    <p className="text-muted">To an English person</p>
                </div>
            </div>
            {/**content */}
        </Fragment>
    )
}

const DowloadQr = () => {
    return (
        <Fragment>

        </Fragment>
    )
}


export default Question;
