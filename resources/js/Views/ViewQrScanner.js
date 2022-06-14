import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";

/*Componets */
import Preloader from "../Helpers/Preloader";
import QrScanner from 'qr-scanner'; // if installed via package and bundling with a module bundler like webpack or rollup

import { pathApi } from '../env'
import AlertMessageSingular from "../Helpers/AlertMessageSingular";
import { fetchRequest } from '../Redux/Actions/fetchRequest'
import imageProfileDefault from '../Components/Layout/imageProfileDefault.png';
import { split } from "lodash";
import { Link } from "react-router-dom";

const ViewQrScanner = ({
    Auth,
    fetchRequest
}) => {

    const [responseReq, setResponseReq] = useState({})
    const handleScaner = async (id) => {
        setResponseReq({})
        let request = {
            'url': `${pathApi}/getAccess/${id}`,
            'request': {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            },
            'showLoader': false
        };


        const response = await fetchRequest(request);

        if (response.status != 400) {

            let user = response.data;
            let row = `
            <tr>
                <td>${user.full_name}</td>
                <td>${user.name}</td>
                <td>${user.matricula}</td>
                <td>${user.created_at}</td>
            </tr>
            `

            document.getElementById('tbody_scaner_table').innerHTML = row;
        } else {
            setResponseReq(response)
        }

        console.log(response);
    }


    useEffect(() => {

        //handleScaner(3);
        const video = document.getElementById('qr-video');
        const videoContainer = document.getElementById('video-container');
        const camHasCamera = document.getElementById('cam-has-camera');
        const camList = document.getElementById('cam-list');
        const flashToggle = document.getElementById('flash-toggle');
        const flashState = document.getElementById('flash-state');
        const camQrResult = document.getElementById('cam-qr-result');
        const camQrResultTimestamp = document.getElementById('cam-qr-result-timestamp');


        const camHasFlash = document.getElementById('cam-has-flash');
        const fileSelector = document.getElementById('file-selector');
        const fileQrResult = document.getElementById('file-qr-result');




        let codeQr = "";

        function setResult(label, result) {
            console.log(result.data);
            let value = result.data.split("|");
            if (value != null) {
                if (codeQr != value[0]) {
                    document.getElementById('sound_scaner').muted = false;
                    document.getElementById('sound_scaner').play();
                    console.log(value)
                    handleScaner(value[0]);
                    codeQr = value[0]
                }

            }

            //label.textContent = result.data;
            //camQrResultTimestamp.textContent = new Date().toString();
            //label.style.color = 'teal';
            //clearTimeout(label.highlightTimeout);
            //label.highlightTimeout = setTimeout(() => label.style.color = 'inherit', 100);
        }

        // ####### Web Cam Scanning #######

        const scanner = new QrScanner(video, result => setResult(camQrResult, result), {
            onDecodeError: error => {
                camQrResult.textContent = error;
                camQrResult.style.color = 'inherit';
            },
            highlightScanRegion: true,
            highlightCodeOutline: true,
        });

        const updateFlashAvailability = () => {
            scanner.hasFlash().then(hasFlash => {
                //camHasFlash.textContent = hasFlash;
                flashToggle.style.display = hasFlash ? 'inline-block' : 'none';
            });
        };

        scanner.start().then(() => {
            updateFlashAvailability();
            // List cameras after the scanner started to avoid listCamera's stream and the scanner's stream being requested
            // at the same time which can result in listCamera's unconstrained stream also being offered to the scanner.
            // Note that we can also start the scanner after listCameras, we just have it this way around in the demo to
            // start the scanner earlier.
            QrScanner.listCameras(true).then(cameras => cameras.forEach(camera => {
                const option = document.createElement('option');
                option.value = camera.id;
                option.text = camera.label;
                camList.add(option);
            }));
        });

        QrScanner.hasCamera().then(hasCamera => camHasCamera.textContent = hasCamera);

        // for debugging
        window.scanner = scanner;


        /*
        document.getElementById('scan-region-highlight-style-select').addEventListener('change', (e) => {
            videoContainer.className = e.target.value;
            scanner._updateOverlay(); // reposition the highlight because style 2 sets position: relative
        });
        document.getElementById('show-scan-region').addEventListener('change', (e) => {
            const input = e.target;
            const label = input.parentNode;
            label.parentNode.insertBefore(scanner.$canvas, label.nextSibling);
            scanner.$canvas.style.display = input.checked ? 'block' : 'none';
        });
         */

        document.getElementById('inversion-mode-select').addEventListener('change', event => {
            scanner.setInversionMode(event.target.value);
        });

        camList.addEventListener('change', event => {
            scanner.setCamera(event.target.value).then(updateFlashAvailability);
        });

        flashToggle.addEventListener('click', () => {
            scanner.toggleFlash().then(() => flashState.textContent = scanner.isFlashOn() ? 'on' : 'off');
        });

        document.getElementById('start-button').addEventListener('click', () => {
            scanner.start();
        });


        /*
        document.getElementById('stop-button').addEventListener('click', () => {
            scanner.stop();
        });
        */

        // ####### File Scanning #######

        /*
        fileSelector.addEventListener('change', event => {
            const file = fileSelector.files[0];
            if (!file) {
                return;
            }
            QrScanner.scanImage(file, { returnDetailedScanResult: true })
                .then(result => setResult(fileQrResult, result))
                .catch(e => setResult(fileQrResult, { data: e || 'No QR code found.' }));
        });
         */
        return () => {
            scanner.stop();
        };

    }, [])


    return (
        <Fragment>
            <nav className="navbar navbar-dark  justify-content-end" style={{ backgroundColor: "#916730" }}>
                <Link to="/" className="btn btn-link text-muted">
                    <a className="navbar-brand" >
                        Iniciar sesión
                    </a>
                </Link>
            </nav>
            <Preloader></Preloader>
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 mb-4 mt-4">
                        <AlertMessageSingular {...responseReq}></AlertMessageSingular>
                    </div>
                    <div className="col-sm-12">
                        <h1 className="display-4 mt-4 mb-4 text-center">Control de acceso</h1>
                        <div id="video-container" style={{ height: "auto" }}>
                            <video id="qr-video" style={{ height: "400px", width: '100%' }}></video>
                        </div>
                    </div>


                    <div className="col-sm-12 mt-4">
                        <table class="table">
                            <thead className="btn-primary">
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Carrera</th>
                                    <th scope="col">Matricula</th>
                                    <th scope="col">Fecha de registro</th>
                                </tr>
                            </thead>
                            <tbody id="tbody_scaner_table">
                                {/*
                                <tr>
                                    <th scope="row">
                                        <img
                                            className="avatar-lg mx-auto img-thumbnail rounded-circle"
                                            style={{ objectFit: 'cover' }}
                                            src={imageProfileDefault}></img>
                                    </th>
                                    <td>Jose gerardo sanchez alvarado </td>
                                    <td>ing.informatica</td>
                                    <td>14e303479</td>
                                    <td>2022 07 14 jueves</td>
                                </tr>

                                */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div style={{ display: "none" }}>
                <div className="col-sm-12">
                    <button type="button" className="btn-block btn btn-primary" id="start-button">Escanear nuevamente</button>
                </div>
                <span id="cam-has-camera"></span>
                <div>
                    <select id="inversion-mode-select">
                        <option value="original">Scan original (dark QR code on bright background)</option>
                        <option value="invert">Scan with inverted colors (bright QR code on dark background)</option>
                        <option value="both">Scan both</option>
                    </select>

                </div>
                <b>Preferred camera:</b>
                <select id="cam-list">
                    <option value="environment" selected>Environment Facing (default)</option>
                    <option value="user">User Facing</option>
                </select>

                <span id="cam-has-flash"></span>
                <div>
                    <button id="flash-toggle">📸 Flash: <span id="flash-state">off</span></button>
                </div>

                <b>Detected QR code: </b>
                <span id="cam-qr-result">None</span>
                <b>Last detected at: </b>
                <span id="cam-qr-result-timestamp"></span>
            </div>

        </Fragment>
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


export default connect(mapStateToProps, mapDispatchToProps)(ViewQrScanner);
