import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import $ from 'jquery';

/*global firebase*/

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
                <InputGroup style={{width: "100%"}}>
                    <Grid><Row>
                        <Col xs={12}><FormControl type="text" placeholder="Image URL" style={{borderTopLeftRadius: "2px", borderTopRightRadius: "2px", border: "none", height: "40px"}} onChange={this.updateUrl.bind(this)} /></Col>
                        <Col xs={12}><Button style={{width: "100%", borderRadius: "0px", border: "none", height: "40px", backgroundImage: "none", backgroundColor: "#008975", textShadow: "none", color: "white"}} onClick={this.submitLink.bind(this)}>Submit</Button></Col>
                        <Col xs={12}><Button onClick={this.clickUpload.bind(this)} style={{width: "100%", borderRadius: "0px", borderBottomLeftRadius: "2px", borderBottomRightRadius: "2px", border: "none", height: "40px", backgroundImage: "none", backgroundColor: "#008975", textShadow: "none", color: "white"}} >Upload Image</Button></Col>
                        </Row></Grid>
                </InputGroup>

                 <input style={{display: "none"}} id="upload" ref="upload" type="file" accept="image/*"
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

    clickUpload() {
        document.getElementById('upload').click();
    }

    updateUrl(e) {
        this.setState({
            url: e.target.value
        });
    }

    submitLink() {
        if (this.state.url !== "") {
            this.props.setLoading(true);

            // Submit to server
            const requestUrl = "https://memalyzer-classification.azurewebsites.net/api/HttpTriggerJS1?code=oWa3gWLuqJfUZNYDzNEkv8UM8U9cuAU2mTnEQXgF66SO/LFGi/7bWw==&url=";

            $.get(requestUrl + this.state.url).then(data => {
                this.props.updateUrl(this.state.url);
                this.props.updateData(data);
                this.props.setLoading(false);

                console.log(data);
            });
        }
    }

    uploadImage(event) {
        this.props.setLoading(true);

        // Create a root reference
        var storageRef = firebase.storage().ref().child("upload");
        var file = document.getElementById("upload").files[0]; // use the Blob or File API
        let thisRef = this;
        storageRef.put(file).then(function(snapshot) {

            thisRef.setState({
                url: snapshot.downloadURL
            });
            thisRef.submitLink();
        });

        // // your account and SAS information
        // var fileUri = 'https://memalyzer.file.core.windows.net/';
        // var fileService = AzureStorage.createFileServiceWithSas(fileUri, 'tzDH4lCGh7u3pRnGiIkHnwrH4q5GThK1xGJe0Mub4eKq8fDfKVxVj6vczrLT/J+duI5k1zyxrZPXQUDE7uokUA==');

        // let files = document.getElementById("upload").files;
        // let file = files[0];

        // var speedSummary = fileService.createFileFromBrowserFile('myfileshare', 'mydirectory', file.name, file, {}, function(error, result, response) {
        //     if (error) {
        //         // Upload file failed
        //         console.log(error);
        //     } else {
        //         // Upload successfully
        //         console.log("Success!");
        //     }
        // });
    }
}