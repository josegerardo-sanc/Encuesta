import React, { useState, useRef, useEffect, Fragment } from "react";

export const runningTimer = (dateTimer) => {
    // 2022-03-31 15:55:39
    let MILLISECONDS_OF_A_SECOND = 1000;
    let MILLISECONDS_OF_A_MINUTE = MILLISECONDS_OF_A_SECOND * 60;
    let MILLISECONDS_OF_A_HOUR = MILLISECONDS_OF_A_MINUTE * 60;
    let MILLISECONDS_OF_A_DAY = MILLISECONDS_OF_A_HOUR * 24;

    const DATE_TARGET = new Date(dateTimer);
    const NOW = new Date()
    const DURATION = NOW - DATE_TARGET;
    const REMAINING_DAYS = Math.floor(DURATION / MILLISECONDS_OF_A_DAY);
    let REMAINING_HOURS = Math.floor((DURATION % MILLISECONDS_OF_A_DAY) / MILLISECONDS_OF_A_HOUR);
    let REMAINING_MINUTES = Math.floor((DURATION % MILLISECONDS_OF_A_HOUR) / MILLISECONDS_OF_A_MINUTE);
    let REMAINING_SECONDS = Math.floor((DURATION % MILLISECONDS_OF_A_MINUTE) / MILLISECONDS_OF_A_SECOND);
    //console.log(REMAINING_HOURS)

    if (REMAINING_HOURS < 10) {
        REMAINING_HOURS = "0" + REMAINING_HOURS;
    }
    if (REMAINING_MINUTES < 10) {
        REMAINING_MINUTES = "0" + REMAINING_MINUTES;
    }
    if (REMAINING_SECONDS < 10) {
        REMAINING_SECONDS = "0" + REMAINING_SECONDS;
    }

    return `${REMAINING_HOURS}:${REMAINING_MINUTES}:${REMAINING_SECONDS}`;
}

const Timer = ({
    dateTimer
}) => {
    const [time, setTime] = useState("00:00:00");
    const timer = useRef(null);

    useEffect(() => {
        if (!timer.current) {
            timer.current = setInterval(() => setTime(runningTimer(dateTimer)), 1000);
        }
        return () => {
            clearInterval(timer.current);
            timer.current = null;
        }
    }, [])

    return (
        <Fragment>
            {time}
        </Fragment>
    );
};

export default Timer;