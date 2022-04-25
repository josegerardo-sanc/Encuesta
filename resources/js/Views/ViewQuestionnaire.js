import React, { Fragment, useEffect } from 'react';


//compents
import Question from '../Components/Question/Question';

const ViewQuestionnaire = () => {

    useEffect(() => {

        document.querySelectorAll('body')[0].style.backgroundColor = "#D2DE9D";

        return () => {
            document.querySelectorAll('body')[0].style.backgroundColor = "#ffff";
        }
    }, [])


    return (
        <Fragment>

        </Fragment >
    )
}

export default ViewQuestionnaire;





