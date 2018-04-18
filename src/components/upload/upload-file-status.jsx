import React, { Component } from 'react';

import CircularProgress from 'material-ui/CircularProgress';
import IconCloudDone from 'material-ui/svg-icons/file/cloud-done';
import IconInfo from 'material-ui/svg-icons/action/info';
import IconCheckCircle from 'material-ui/svg-icons/action/check-circle';

import '../../assets/css/components/upload/upload-file-status.css';

class UploadStatus extends Component {

  uploadFileStatus() {
    if (this.props.errorItems >= 0 && this.props.successItems >= 0) {
      return this.completeFile();
    }
    if (this.props.errorItems) {
      return this.errorFile();
    }
    if (this.props.fileName) {
      return this.processFile();
    }
    return this.noFile();
  }

  completeFile() {
    return (
      <div className="upload-file-process is-active">
        <div className="row">
          <div className="col-2">
            <IconCloudDone color="#3F51B5" className="upload-file-process-loader"/>
          </div>
          <div className="col-2">
            <p className="upload-file-process-name">{this.props.fileName}</p>
          </div>
          <div className="col-3">
            <div className="upload-file-response">
              <span className="icon-response">
                <IconInfo color="#F44336" style={{width:'18px'}}/>
              </span>
              <span className="value">
                {this.props.errorItems} itens com erro
              </span>
            </div>
          </div>
          <div className="col-4">
            <div className="upload-file-response">
              <span className="icon-response">
                <IconCheckCircle color="#64DD17" style={{width:'18px'}}/>
              </span>
              <span className="value">
                {this.props.successItems} itens criados com sucesso!
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  errorFile() {
    return (
      <div className="upload-file-process is-active">
        <div className="row">
          <div className="col-2">
            <IconInfo color="#F44336" className="upload-file-process-loader"/>
          </div>
          <div className="col-2">
            <p className="upload-file-process-name">{this.props.fileName}</p>
          </div>
          <div className="col-3"></div>
          <div className="col-4">
              <p className="error-message">Erro ao processar o arquivo: SKUs duplicados</p>
          </div>
        </div>
      </div>
    );
  }

  processFile() {
    return (
      <div className="upload-file-process is-active">
        <div className="row">
          <div className="col-2">
            <CircularProgress size={30} thickness={6} value={80} className="upload-file-process-loader"/>
          </div>
          <div className="col-2">
            <p className="upload-file-process-name">{this.props.fileName}</p>
          </div>
          <div className="col-3"></div>
          <div className="col-4">
            <p className="upload-file-process-status">…Processando</p>
          </div>
        </div>
      </div>
    );
  }

  noFile() {
    return (
      <div className="upload-file-process">
        <p className="upload-file-process-empty">Nenhum arquivo em processamento</p>
      </div>
    );
  }

  render() {
    return (
      <div className="upload-file-status">
        {this.uploadFileStatus()}
      </div>
    );
  }
}

export default UploadStatus;