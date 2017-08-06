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

        let style = {/*backgroundColor: backgroundColor,*/ padding: "20px", borderRadius: "4px", border: "1px solid white", height: "100%", color: "white"};
        return (
            <Col sm={6} style={{marginBottom: "20px"}}>
                <div style={style}>
                    <div>
                        <h3><strong>Meme Description:</strong></h3>
                        <br />
                        <p>{this.props.description}</p>
                        <br />
                        <h4><strong><a href={this.props.url} target="_blank" style={{color: "#008975", textDecoration: "underline"}}>More Information</a></strong></h4>
                        
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