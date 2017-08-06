import React, { Component } from 'react';
import { Col, Well } from 'react-bootstrap';
import $ from 'jquery';
import 'jquery-circle-progress';

export default class Meme extends Component {
    constructor() {
        super();
    }

    render() {
        let meme;
        if (Object.keys(this.props.data).length > 0) {
            meme = <div><h3><strong>{this.props.data["Tag"]}</strong></h3><span></span></div>;
        }
        return (
            <Col sm={6}>
                <Well style={{borderRadius: "2px", border: "none", backgroundColor: "rgba(255, 255, 255, 1)", backgroundImage: "none"}}>
                    <img src={this.props.image} style={{width: "100%", display: "block", margin: "auto"}}/>
                    {meme}

                    <div id="circleProgress" className="circle"><strong></strong></div>
                </Well>
            </Col>
        );
    }

    componentDidUpdate() {
        let thisRef = this;
        if (Object.keys(this.props.data).length > 0) {
            $('#circleProgress').circleProgress({
                value: this.props.data["Probability"],
                size: 140,
                fill: {
                gradient: ["#00BF9A", "#008975"]
                }
            }).on('circle-animation-progress', function(event, progress) {
                $(this).find('strong').html(parseInt(thisRef.props.data["Probability"] * 100) + "<i>%</i>");
            });
        }
    }

    componentDidMount() {
        let thisRef = this;
        if (Object.keys(this.props.data).length > 0) {
            $('#circleProgress').circleProgress({
                value: this.props.data["Probability"],
                size: 140,
                fill: {
                gradient: ["#00BF9A", "#008975"]
                }
            }).on('circle-animation-progress', function(event, progress) {
                $(this).find('strong').html(parseInt(thisRef.props.data["Probability"] * 100) + "<i>%</i>");
            });
        }
    }
}