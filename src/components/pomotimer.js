/**
 *
 *
 */

import React, {useState, useEffect} from "react";
import {Card, Button, ButtonGroup, Modal} from "react-bootstrap";
import {StyleSheet, css} from "aphrodite";
import click from "../audio/click.mp3";
import ding from "../audio/ding.mp3";
import tick from "../audio/tick.mp3";

const PomoTimer = props => {
    const [isRunning, setRunningState] = useState(false);
    const [isBreak, setBreak] = useState(false);
    const [timer, setTimer] = useState(props.workingSession);
    //Modal
    const [isShowing, setShowState] = useState(false);

    function resetTimer() {
        setRunningState(false);
        setBreak(false);
        setTimer(props.workingSession);
    }

    function handleClose() {
        setShowState(false);
    }

    function beginBreak() {
        handleClose();
        setBreak(!isBreak);
        setRunningState(true);
    }

    function playSound(sound, volume = 0.3) {
        const sfx = new Audio(sound);
        sfx.volume = volume;
        sfx.play();
    }

    function displaytimer() {
        const seconds = timer % 60;
        const minutes = parseInt(timer / 60) % 60;
        function addLeadingZeroes(time) {
            return time < 10 ? `0${time}` : time;
        }
        return `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`;
    }

    useEffect(() => {
        setTimer(isBreak ? props.breakSession : props.workingSession);
    }, [isBreak]);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    useEffect(() => {
        if (timer === 0 && isRunning) {
            playSound(ding);
            document.title = isBreak ? "Back to work ?" : "Take a break !";
            setRunningState(!isRunning);
            setShowState(true);
        } else {
            document.title = displaytimer();
        }
        if (isRunning && timer <= 5 && timer > 0) {
            playSound(tick, 0.2);
        }
    }, [timer]);

    const styles = StyleSheet.create({
        timer: {
            width: "75%",
            textAlign: "center",

            "@media (max-width: 576px)": {
                fontSize: "5em",
            },
            "@media (min-width: 576px) and (max-width: 767.98px)": {
                fontSize: "5em",
            },
            "@media (min-width: 767.98px) and (max-width: 992px)": {
                fontSize: "5em",
            },
            "@media (min-width: 992px) and (max-width: 1199.98px)": {
                fontSize: "5em",
            },
            "@media (min-width: 1200px)": {
                fontSize: "6em",
            },
        },
    });

    return (
        <div>
            <Card className={"shadow-lg"}>
                <Card.Header className={"text-center"}>
                    {isBreak ? "Pause Session" : "Working Session"}
                </Card.Header>
                <Card.Body>
                    <div className={"d-flex flex-row align-items-center"}>
                        <p className={css(styles.timer)}>{displaytimer()}</p>
                        <ButtonGroup vertical className={"w-25"}>
                            <Button
                                disabled={isRunning}
                                onClick={() => {
                                    playSound(click);
                                    setTimer(timer + 60);
                                }}>
                                {"+"}
                            </Button>
                            <Button
                                disabled={timer <= 0}
                                onClick={() => {
                                    playSound(click);
                                    setRunningState(!isRunning);
                                }}>
                                {isRunning ? "Stop" : "Play"}
                            </Button>
                            <Button
                                onClick={() => {
                                    playSound(click);
                                    resetTimer();
                                }}>
                                {"Reset"}
                            </Button>
                            <Button
                                disabled={
                                    isRunning || parseInt(timer / 60) % 60 === 0
                                }
                                onClick={() => {
                                    playSound(click);
                                    setTimer(timer - 60);
                                }}>
                                {"-"}
                            </Button>
                        </ButtonGroup>
                    </div>
                </Card.Body>
            </Card>
            <Modal show={isShowing}>
                <Modal.Header>
                    <Modal.Title>{"Time out !"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {`You just finished a ${
                        isBreak ? "break" : "working"
                    } session ! Ready for the next session ?`}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"secondary"} onClick={handleClose}>
                        {"Nope"}
                    </Button>
                    <Button variant={"primary"} onClick={beginBreak}>
                        {`${isBreak ? "Time to code !" : "Take a break !"}`}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

PomoTimer.defaultProps = {
    //in seconds = 25 mins - 1500
    workingSession: 1500,

    //in seconds = 5 min - 300s
    breakSession: 300,
};

export default PomoTimer;
