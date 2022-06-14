import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import moment from "moment";


/**components */
import TitleModule from '../Helpers/TitleModule'
import Navar from "../Components/Layout/Navar";
import Sidebar from "../Components/Layout/Sidebar";
import Footer from "../Components/Layout/Footer";
import Preloader, { LoaderPreloader } from '../Helpers/Preloader'
/**actions redux */
import { verifySessionAuth } from '../Redux/Actions/Auth'
import { fetchRequest } from '../Redux/Actions/fetchRequest'
import { pathApi } from "../env";
import Timer from "../Helpers/Timer";

const Dashboard = (props) => {
    let location = useLocation();
    let { token } = props.Auth;

    useEffect(() => {
        moment.locale('es');
        setTimeout(() => {
            document.getElementsByClassName('LoaderPreloader')[0].style.display = 'none';
        }, 2000);

        getCheckInTime();

        return () => {
            document.getElementsByClassName('LoaderPreloader')[0].style.display = 'block';
        }
    }, [])

    const [checkInTime, setCheckInTime] = useState("");
    const getCheckInTime = async () => {
        let request = {
            'url': `${pathApi}/getCheckInTime`,
            'request': {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        };
        const response = await props.fetchRequest(request);

        if (response.status != 400) {
            setCheckInTime(response.date_start);
        }

        console.log(response)
    }


    return (
        <Fragment>
            <LoaderPreloader></LoaderPreloader>
            <Preloader></Preloader>
            <div className="container-fluid">
                <div id="layout-wrapper">
                    <Navar></Navar>
                    <Sidebar></Sidebar>
                    <div className="main-content">
                        <div className="page-content">
                            <TitleModule></TitleModule>
                            <div className="card">
                                <div className="card-body">
                                    <h1 >
                                        Tiempo de sessión:
                                        <strong id="tiempo_de_sesion">
                                            {
                                                checkInTime != "" && (
                                                    <Timer
                                                        dateTimer={checkInTime}
                                                    />
                                                )
                                            }
                                        </strong>
                                    </h1>
                                </div>
                            </div>
                            {props.children}
                        </div>
                        <Footer></Footer>
                    </div>
                </div>
            </div>
        </Fragment>
    )

}




const mapStateToProps = ({ Auth }) => {
    return {
        Auth
    }
}

const mapDispatchToProps = {
    verifySessionAuth,
    fetchRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);