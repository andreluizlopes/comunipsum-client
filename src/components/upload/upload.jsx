import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/upload';
import UploadStatus from './upload-file-status';
import { parseFile } from '../../helpers/parseFile';

import {Card} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import Divider from 'material-ui/Divider';

import '../../assets/css/components/upload/upload.css';

class Upload extends Component {

  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      fileName: '',
      disableUpdate: false
    };

  }

  handleProgress(progress) {
    this.setState({progress});
  }

  handleFile(e) {
    e.preventDefault();
    const file = this.refs.uploadFile.files[0];

    if (!file && file.size > 100000) {
      return false;
    }

    this.setState({
      progress: 50,
      fileName: file.name,
      disableUpdate: true
    });

    parseFile(file)
    .then( response => {
      this.postSpecialPrice(response);
    });
  }

  postSpecialPrice(data) {
    this.props.uploadSpecialPrice(data);

    this.setState({
      progress: 100,
      disableUpdate: false
    });
  }

  render() {
    return (
      <div className="upload">
        <div className="container">
          <div className="row">
            <div className="col-4">
              <Card className="upload-card">
                <div className="upload-info">
                  <h2>Upload files</h2>
                  <p>Clique no botão abaixo para cadastrar ou editar uma lista de Special Price (no máximo 1.000 SKUs por arquivo):</p>
                </div>
                <RaisedButton
                  label="Escolha um arquivo (.csv)"
                  containerElement='label'
                  secondary={true}
                  disabled={this.state.disableUpdate}
                  className="upload-button"
                  type="file"
                  onChange={e => this.handleFile(e)}
                >
                  <input
                    type="file"
                    ref="uploadFile"
                    className="upload-input-file"
                    disabled={this.state.disableUpdate}
                    accept=".csv"
                  />
                </RaisedButton>
                <div className="upload-progress">
                  <p className="upload-file-name">{this.state.fileName}</p>
                  <LinearProgress mode="determinate" value={this.state.progress} />
                </div>
              </Card>
            </div>
            <div className="col-8">
              <Card className="upload-card">
                <div className="upload-info">
                  <h2>Processamento dos arquivos</h2>
                  <p>Acompanhe aqui a criação ou edição dos SKUs.</p>
                </div>
                <Divider/>
                  <UploadStatus
                    errorItems={this.props.errorItems}
                    successItems={this.props.successItems}
                    fileName={this.state.fileName}
                  />
                <Divider/>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorItems: state.upload.errorItems,
    successItems: state.upload.successItems,
  };
}

export default connect(mapStateToProps, actions)(Upload);
