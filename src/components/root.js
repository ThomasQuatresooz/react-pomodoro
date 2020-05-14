/**
 *
 *
 */

import React from "react";
import PomoTimer from "./pomotimer";
import {Container, Row, Col} from "react-bootstrap";
import Trianglify from "trianglify";
import {StyleSheet, css} from "aphrodite";

const RootComponent = () => {
    const pattern = Trianglify({
        width: 1920,
        height: 1080,
    });

    const styles = StyleSheet.create({
        triangle: {
            height: "100%",
            backgroundImage: `url(${pattern.png()})`,
            backgroundRepeat: "center",
        },
    });
    return (
        <Container className={css(styles.triangle)} fluid>
            <Row className={"h-100"}>
                <Col className={"my-auto"} md={{span: 6, offset: 3}} sm={12}>
                    <PomoTimer />
                </Col>
            </Row>
        </Container>
    );
};

export default RootComponent;
