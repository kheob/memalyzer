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
    let result = <Row style={{color: "white", paddingTop: "28px"}}><Col xs={12}><p>Memalyzer uses cutting edge machine learning to help you better understand and react to memes.</p>
    <p>To get started, upload a meme!</p><p style={{fontSize: "20px"}}>😂😂😂</p></Col></Row>;
    let loading;

    if (this.state.showLoading) {
      loading = <LoadingIndicator style={{marginTop: "10px", marginBottom: "20px"}} />;
    }

    if (Object.keys(this.state.data).length > 0 && !this.state.showLoading) {
      result = <Row>
            <Meme image={this.state.url} data={this.state.data} />
            <Response description={this.state.data["Description"]} url={this.state.data["Url"]} />
          </Row>;
    }

    return (
      <div className="App">
        <div className="App-header" style={{backgroundColor: "#00BF9A"}}>
          <h1 style={{fontSize: "50px"}}>Memalyzer</h1>
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
