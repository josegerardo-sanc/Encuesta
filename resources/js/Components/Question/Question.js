import React, { Fragment } from "react";

/**
 * @returns https://mui.com/material-ui/react-stepper/
 */
import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Stepper, Step, StepLabel, StepContent } from '@mui/material';
import { TextField, Button } from '@mui/material';

const steps = [
    {
        label: 'Encuesta'
    },
    {
        label: 'Descargar QR'
    }];

const Question = () => {

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Fragment>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel
                            /*
                            optional={
                                 index === 2 ? (
                                     <Typography variant="caption">Last step</Typography>
                                 ) : null
                             }
                            */
                            >
                                {step.label}
                            </StepLabel>
                            <StepContent>

                                {activeStep == 1 && (
                                    <QuestionPoll></QuestionPoll>
                                )}
                                {activeStep == 2 && (
                                    <DowloadQr></DowloadQr>
                                )}

                                <Box sx={{ mb: 2 }}>
                                    <div>
                                        {
                                            (activeStep == 0 || activeStep == 1) && (
                                                <Button
                                                    variant="contained"
                                                    onClick={handleNext}
                                                    sx={{ mt: 1, mr: 1 }}
                                                >
                                                    Continuar
                                                </Button>
                                            )
                                        }
                                        {
                                            activeStep == 1 && (
                                                <Button
                                                    disabled={index === 0}
                                                    onClick={handleBack}
                                                    sx={{ mt: 1, mr: 1 }}
                                                >
                                                    Anterior
                                                </Button>
                                            )
                                        }
                                    </div>
                                </Box>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            </Box>
        </Fragment>
    )
}

const UserData = () => {
    return (
        <Fragment>
            <Box component="form">
                <Grid container spacing={1} rowSpacing={2}>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            required
                            id="name"
                            label="Nombre"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            required
                            id="lastName"
                            label="Primer apellido"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            required
                            id="secondLastName"
                            label="Segundo apellido"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            required
                            id="email"
                            label="Correo"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            required
                            id="phone"
                            label="Telefono"
                        />
                    </Grid>
                </Grid>
            </Box>
        </Fragment>
    )
}
const QuestionPoll = () => {
    return (
        <Fragment>
            preguntas
        </Fragment>
    )
}

const DowloadQr = () => {
    return (
        <Fragment>
            <Typography>
                Descargar codigo qr
            </Typography>
            <Button
                variant="contained"
                onClick={() => { }}
                sx={{ mt: 1, mr: 1 }}
            >
                Descargar
            </Button>
        </Fragment>
    )
}


export default Question;
