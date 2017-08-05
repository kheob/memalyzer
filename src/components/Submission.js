import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import $ from 'jquery';

export default class Submission extends Component {
    constructor() {
        super();
        this.state = {
            url: ""
        };
    }

    render() {
        return (
            <FormGroup>
                <InputGroup>
                    <Grid><Row>
                        <Col xs={9}><FormControl type="text" style={{borderRadius: "4px"}} onChange={this.updateUrl.bind(this)} /></Col>
                        <Col xs={3}><Button style={{width: "100%"}} onClick={this.submitLink.bind(this)}>Go</Button></Col>
                        </Row></Grid>
                </InputGroup>
            </FormGroup>
        );
    }

    updateUrl(e) {
        this.setState({
            url: e.target.value
        });
    }

    submitLink() {
        if (this.state.url !== "") {
            // Submit to server
            const requestUrl = "https://memalyzer-classification.azurewebsites.net/api/HttpTriggerJS1?code=oWa3gWLuqJfUZNYDzNEkv8UM8U9cuAU2mTnEQXgF66SO/LFGi/7bWw==&url=";
            $.get(requestUrl + this.state.url).then(data => {
                this.props.updateUrl(this.state.url);
                this.props.updateData(data);
            });
        }
    }
}