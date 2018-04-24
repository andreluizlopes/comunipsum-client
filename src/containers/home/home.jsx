import React from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/content/content-copy';
import Snackbar from 'material-ui/Snackbar';

import '../../assets/css/containers/home/home.css';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      copied: false,
      open: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  updatePhrase(nextProps) {
    this.setState({
      phrase: nextProps.phrase
    });
  }

  componentDidMount() {
    this.props.fetchMessage(this.props.history);
  }

  handleClick() {
    this.setState({
      open: true,
    });
  };

  handleRequestClose() {
    this.setState({
      open: false,
    });
  };

  render() {

    return (
      <div className="home">
        <div className="container">
          <div className="home-description">
            <h2>Make your phrases based on communist texts</h2>
          </div>
          <div className="home-actions clearfix">
            <span>How many paragraphs?</span>
            <div className="home-actions-field">
              <TextField
                name="home-actions-input"
                type="number"
              />
            </div>
          </div>
          <Divider />
          <div className="home-phrase">
            <Paper className="phrase-paper" zDepth={3}>
              <CopyToClipboard text={this.props.phrase}
                onCopy={() => this.setState({copied: true})}
              >
                <RaisedButton
                  label="Copy"
                  onClick={this.handleClick}
                  labelPosition="before"
                  primary={true}
                  className="phrase-copy"
                  icon={<ActionAndroid />}
                />
              </CopyToClipboard>
              <textarea
                ref={this.phraseTextarea}
                className="phrase-textarea"
                value={this.props.phrase}
              />
            </Paper>
          </div>
        </div>
        <Snackbar
          className="home-alert"
          open={this.state.open}
          message="Copied"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  phrase: state.auth.phrase
});

export default connect(
  mapStateToProps,
  actions
)(Home);