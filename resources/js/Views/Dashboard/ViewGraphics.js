import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";

/**chartJs */
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


import { pathApi } from '../../env'
import AlertMessageSingular from "../../Helpers/AlertMessageSingular";
import { fetchRequest } from '../../Redux/Actions/fetchRequest'

const ViewGraphics = ({
    Auth,
    fetchRequest
}) => {

    const { token } = Auth;

    const [responseMessage, setResponseMessage] = useState({})
    const [careers, setCareers] = useState([]);
    const [totalStudentCareers, setTotalStudentCareers] = useState([]);
    const [answerCareers, setAnswerCareers] = useState([]);

    useEffect(() => {
        console.log("run")
        handleGetCareers()
    }, [])

    /**get careers */
    const handleGetCareers = async () => {
        let request = {
            'url': `${pathApi}/getGraphics`,
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
        if (response.status != 200) {
            setResponseMessage(response)
        } else {
            let carreras = [];
            let numero_estudiantes_carrera = [];
            let respuestas_por_carreras = [];

            for (const iterator of response.studentCareers) {
                carreras.push(iterator.name);
                numero_estudiantes_carrera.push(iterator.total);
            }

            for (const iterator of response.answerCareers) {
                respuestas_por_carreras.push(iterator.total);
            }

            setAnswerCareers(respuestas_por_carreras);
            setCareers(carreras)
            setTotalStudentCareers(numero_estudiantes_carrera);
        }
    }


    useEffect(() => {
        document.getElementById('title_module').innerText = "Gráficas";
    }, [])

    const data = {
        labels: careers,
        datasets: [{
            label: 'Estudiantes por carrera.',
            data: totalStudentCareers,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        }]
    };

    const options = {
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: false,
                text: 'Estudiantes por carrera.',
            },
        },
    };


    const data2 = {
        labels: careers,
        datasets: [{
            label: 'Número de encuesta por carrera',
            data: answerCareers,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        }]
    };

    const options2 = {
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: false,
                text: 'Número de encuesta por carrera',
            },
        },
    };

    return (
        <div className="card">
            <div className="card-body">
                <AlertMessageSingular {...responseMessage} />
                <div className="row">
                    <div className="col-sm-12">
                        <h2>Gráficas de encuestas por carrera</h2>
                        <Bar options={options2} data={data2} />;
                        {/** */}
                    </div>
                    <div className="col-sm-12">
                        <h2>Gráficas de  alumnos por carrera</h2>
                        <Bar options={options} data={data} />;
                        {/** */}
                    </div>

                </div>
            </div>
        </div>
    )
}



/*connection with redux */
const mapStateToProps = ({ Auth }) => {
    return {
        Auth
    }
}

const mapDispatchToProps = {
    fetchRequest
}


export default connect(mapStateToProps, mapDispatchToProps)(ViewGraphics);
