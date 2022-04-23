import React, { useEffect } from "react";

/**components */
import { CardProfile, FormProfile, FormProfileStudent } from "../../Components/User/Profile";

/**helpers */
import AlertMessage from "../../Helpers/AlertMessage";

const ViewProfile = () => {
    useEffect(() => {
        document.getElementById('title_module').innerText = "Perfil";
    }, [])

    return (
        <div className="row">
            <div className="col-12">
                <AlertMessage></AlertMessage>
            </div>
            <div className="col-md-12 col-xl-3">
                <CardProfile></CardProfile>
            </div>
            <div className="col-md-12 col-xl-9">
                <FormProfile></FormProfile>
                <FormProfileStudent></FormProfileStudent>
            </div>
        </div>
    )
}
export default ViewProfile;
