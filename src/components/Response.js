import React, { Component } from 'react';
import { Col, Well } from 'react-bootstrap';

export default class Meme extends Component {
    constructor() {
        super();
    }

    render() {
        // let backgroundColor = "rgba(217, 83, 79, 0.5)";
        // let border = "1px rgb(217, 83, 79) solid";

        // if (this.props.isPositive) {
        //     backgroundColor = "rgba(92, 184, 92, 0.5)";
        //     border = "1px rgb(92, 184, 92) solid";
        // }

        let style = {/*backgroundColor: backgroundColor,*/ padding: "20px", borderRadius: "4px", /*border: border,*/ height: "100%"};
        return (
            <Col xs={6} style={{marginBottom: "20px"}}>
                <div style={style}>
                    <div>
                        <h4><strong>Meme description:</strong></h4>
                        <a href={this.props.description} target="_blank">{this.props.description}</a>
                        <p>{this.props.topic}</p>
                        <p>{this.props.sentiment}</p>
                    </div>
                    <br />
                    {/* <strong>{this.props.isPositive ? "This is a positive meme!" : "This is a negative meme!"}</strong> */}
                </div>
            </Col>
        );
    }
}