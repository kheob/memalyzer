import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Grid, Col, Row } from 'react-bootstrap';

// Components
import Submission from './components/Submission';
import Meme from './components/Meme';
import Response from './components/Response';

class App extends Component {
  constructor() {
    super();
    this.state = {
      url: "",
      data: {}
    };
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Memalyzer</h2>
        </div>
        
        <Grid style={{paddingTop: "10px"}}>
          <Row>
            <Submission updateUrl={this.updateUrl.bind(this)} updateData={this.updateData.bind(this)} />
          </Row>
          <Row style={{display: "flex"}}>
            <Meme image={this.state.url} data={this.state.data} />
            <Response />
          </Row>
        </Grid>
      </div>
    );
  }

  updateUrl(url) {
    this.setState({
      url: url
    });
  }

  updateData(data) {
    this.setState({
      data: data
    });
  }
}

export default App;
