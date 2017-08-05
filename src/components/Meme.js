import React, { Component } from 'react';
import { Col, Well } from 'react-bootstrap';

export default class Meme extends Component {
    constructor() {
        super();
    }

    render() {
        let meme;
        if (Object.keys(this.props.data).length > 0) {
            meme = <div><strong>Meme: </strong><span>{this.props.data["Tag"]}</span><span> with a probability of </span><span>{parseFloat(this.props.data["Probability"] * 100).toFixed(2)}%</span></div>;
        }
        return (
            <Col xs={6}>
                <Well>
                    <img src={this.props.image} style={{height: "400px", width: "100%", display: "block", margin: "auto"}}/>
                    <br />
                    {meme}
                </Well>
            </Col>
        );
    }
}