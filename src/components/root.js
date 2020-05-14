/**
 *
 *
 */

import React from "react";
import PomoTimer from "./pomotimer";
import {Container, Row, Col} from "react-bootstrap";

const RootComponent = () => (
    <Container>
        <Row>
            <Col sm={{span: 6, offset: 3}}>
                <PomoTimer />
            </Col>
        </Row>
    </Container>
);

export default RootComponent;
