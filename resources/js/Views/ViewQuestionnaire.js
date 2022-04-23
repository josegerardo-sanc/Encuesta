import React, { Fragment, useEffect } from 'react';
//material ui
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { Card, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';


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
            <CssBaseline />
            <Container>
                <Grid container spacing={2} sx={{
                    marginTop: "100px"
                }}>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h4" component="div">
                                    Encuesta
                                </Typography>
                                <Question></Question>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Fragment >
    )
}

export default ViewQuestionnaire;





