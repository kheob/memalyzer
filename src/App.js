import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Grid, Col, Row } from 'react-bootstrap';
import LoadingIndicator from 'react-loading-indicator';

// Components
import Submission from './components/Submission';
import Meme from './components/Meme';
import Response from './components/Response';

class App extends Component {
  constructor() {
    super();
    this.state = {
      url: "",
      data: {},
      showLoading: false
    };
  }

  render() {
    let result;
    let loading;

    if (this.state.showLoading) {
      loading = <LoadingIndicator />;
    }

    if (Object.keys(this.state.data).length > 0) {
      result = <Row style={{display: "flex"}}>
            <Meme image={this.state.url} data={this.state.data} />
            <Response description={this.state.data["Description"]} />
          </Row>;
    }

    return (
      <div className="App">
        <div className="App-header">
          <h2>Memalyzer</h2>
        </div>
        
        <Grid style={{paddingTop: "10px"}}>
          <Row>
            <Submission updateUrl={this.updateUrl.bind(this)} updateData={this.updateData.bind(this)} setLoading={this.setLoading.bind(this)} />
          </Row>
          {loading}
          {result}
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

  setLoading(state) {
    this.setState({
      showLoading: state
    });
  }
}

export default App;
