import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import $ from 'jquery';

/*global AzureStorage*/

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

                <input id="upload" ref="upload" type="file" accept="image/*"
                    onChange={(event)=> { 
                        this.uploadImage(event); 
                    }}
                    onClick={(event)=> { 
                        event.target.value = null;
                    }}
                />
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

                console.log(data);
            });
        }
    }

    uploadImage(event) {
        // your account and SAS information
        var fileUri = 'https://memalyzer.file.core.windows.net/';
        var fileService = AzureStorage.createFileServiceWithSas(fileUri, 'tzDH4lCGh7u3pRnGiIkHnwrH4q5GThK1xGJe0Mub4eKq8fDfKVxVj6vczrLT/J+duI5k1zyxrZPXQUDE7uokUA==');

        let files = document.getElementById("upload").files;
        let file = files[0];

        var speedSummary = fileService.createFileFromBrowserFile('myfileshare', 'mydirectory', file.name, file, {}, function(error, result, response) {
            if (error) {
                // Upload file failed
                console.log(error);
            } else {
                // Upload successfully
                console.log("Success!");
            }
        });
    }
}