import React from "react";
import { connect } from "react-redux";
import { handleAlertMessage } from './AlertMessage'
import { handlePreloader } from './Preloader'
import { signOffAuth } from './Auth'

export const fetchRequest = (state) => {
    return {
        type: 'request',
        payload: state
    }
}


const downloadFile = (request, response) => {


    let filename = "";
    try {
        const header = request.headers.get('Content-Disposition');
        const parts = header.split(';');
        filename = parts[1].split('=')[1];
    } catch (error) {
        filename = "archivo";
    }


    var data = response;
    const blob = new Blob([data], { type: data.type || 'application/octet-stream' });

    if (typeof window.navigator.msSaveBlob !== 'undefined') {
        window.navigator.msSaveBlob(blob, filename);
        return;
    }
    const blobURL = window.URL.createObjectURL(blob);

    const tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    tempLink.href = blobURL;
    tempLink.setAttribute('target', '_blank');
    /*
    tempLink.setAttribute('download', filename);
    if (typeof tempLink.download === 'undefined') {
        tempLink.setAttribute('target', '_blank');
    }
    */
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    setTimeout(() => {
        window.URL.revokeObjectURL(blobURL);
    }, 100);

}

export const processRequest = async (store, requestData) => {
    try {
        store.dispatch(handleAlertMessage({
            showMessage: false
        }));

        let response;
        let messages = "";
        let messages_array = [];
        let showLoader = requestData.hasOwnProperty('showLoader') && requestData.showMessage === false ? false : true;

        if (showLoader) {
            store.dispatch(handlePreloader(true));
        }

        let request = await fetch(requestData.url, requestData.request);
        let typeAlert = request.status != 200 ? 'warning' : 'success';
        //console.log(request);
        let showMessageRequest = requestData.hasOwnProperty('showMessage') && requestData.showMessage ? true : false;

        if (requestData.hasOwnProperty('file_blob') && requestData.file_blob && request.status != 401) {
            response = await request.blob();

            downloadFile(request, response);
        } else {
            response = await request.json();
        }

        messages = response.message || "";
        messages_array.push(messages);

        if (response.errors) {
            typeAlert = response.status != 200 ? "warning" : "success";
            messages_array = []
            for (const key in response.errors) {
                messages_array.push(response.errors[key]);
            }
        }
        //console.log(messages_array);

        if (request.status == 401) {
            showMessageRequest = true;
            typeAlert = "danger";
            store.dispatch(signOffAuth());
        }

        if (showMessageRequest) {
            store.dispatch(handleAlertMessage({
                message: messages_array,
                type: typeAlert,
                showMessage: true
            }));
        }

        if (showLoader) {
            store.dispatch(handlePreloader(false));
        }

        return response;

    } catch (error) {

        console.log("error desde aqui")
        console.log(error);

        store.dispatch(handlePreloader(false));
        store.dispatch(handleAlertMessage({
            message: ["Ha ocurrido un error, intenta de nuevo más tarde.", `Error: ${error.message}`],
            type: 'danger',
            showMessage: true
        }));
    }
};
