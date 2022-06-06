import React, { Fragment, useState, useEffect } from "react";

/*Componets */
import Preloader from "../Helpers/Preloader";
import QrScanner from 'qr-scanner'; // if installed via package and bundling with a module bundler like webpack or rollup


import logoItss from '../Components/Layout/logotec.png'

const ViewQrScanner = () => {



    return (
        <Fragment>
            <Preloader></Preloader>
            <div className="container">
                <h1>Scan from WebCam:</h1>
                <div id="video-container">
                    <video id="qr-video"></video>
                </div>

                <b>Detected QR code: </b>
                <span id="cam-qr-result">None</span>

            </div>
        </Fragment>
    )
}

export default ViewQrScanner;
