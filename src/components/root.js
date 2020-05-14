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
            <Col md={{span: 6, offset: 3}} sm={12}>
                <PomoTimer />
            </Col>
        </Row>
    </Container>
);

export default RootComponent;
