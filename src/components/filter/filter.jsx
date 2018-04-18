import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { TextField, SelectField, MenuItem, DatePicker, TimePicker } from 'material-ui';

import '../../assets/css/components/filter/filter.css';

class Filter extends Component {
  constructor() {
    super();
    this.state = {
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: ''
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleStartTime = this.handleStartTime.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
    this.handleEndTime = this.handleEndTime.bind(this);
  }

  handleFocus(event) {
    event.target.click();
  }

  handleFormSubmit(formProps) {
    this.props.fetchMessage();
  }

  handleStartDate(event, date) {
    this.setState({
      startDate: date
    });
    this.setDates();
  }

  handleStartTime(event, date) {
    this.setState({
      startTime: date
    });
    this.setDates();
  }

  handleEndDate(event, date) {
    this.setState({
      endDate: date
    });
    this.setDates();
  }

  handleEndTime(event, date) {
    this.setState({
      endTime: date
    });
    this.setDates();
  }

  setDates() {
    let startDate = '';
    let startTime = '';
    let endDate = '';
    let endTime = '';
    if (this.state.startDate) {
      startDate = `${this.state.startDate.getFullYear()}/${this.state.startDate.getMonth()+1}/${this.state.startDate.getDate()}`;
    }
    if (this.state.startTime) {
      startTime = `T${this.state.startTime.getHours()}:${this.state.startTime.getMinutes()}`;
    }
    if (this.state.endDate) {
      endDate = `${this.state.endDate.getFullYear()}/${this.state.endDate.getMonth()+1}/${this.state.endDate.getDate()}`;
    }
    if (this.state.endTime) {
      endTime = `T${this.state.endTime.getHours()}:${this.state.endTime.getMinutes()}`;
    }
    const dateStartConverted = `${startDate}${startTime}`;
    const dateEndConverted = `${endDate}${endTime}`;

    this.props.change('start', dateStartConverted);
    this.props.change('end', dateEndConverted);
  }

  renderText({ input, label, type, meta: { touched, error } }) {
    return (
      <input
        {...input}
        type={type}
        placeholder={label}
      />
    );
  }

  renderTextField({ input, label, type, meta: { touched, error } }) {
    return (
      <TextField
        {...input}
        hintText={label}
        fullWidth={true}
        type={type}
        floatingLabelText={label}
      />
    );
  }

  renderSelectField({ input, label, type, meta: { touched, error }, children, ...custom }) {
    return (
      <SelectField
        {...input}
        floatingLabelText={label}
        fullWidth={true}
        onChange={(event, index, value) => input.onChange(value)}
        children={children}
        {...custom}
      />
    );
  }

  render() {
    const { handleSubmit, fields: { sku, store, special_price, start, end }} = this.props;

    return (
      <div className="filter">
          <div className="container">
          <form onSubmit={handleSubmit(this.handleFormSubmit)}>
            <div className="row">
              <div className="col-3">
                <Field
                  {...sku}
                  component={this.renderTextField}
                  name="sku"
                  label="Sku"
                />
              </div>
              <div className="col-1">
                <Field
                  {...store}
                  component={this.renderSelectField}
                  name="store"
                  label="store"
                >
                  <MenuItem value="dafiti" primaryText="Dafiti" />
                  <MenuItem value="kanui" primaryText="Kanui" />
                  <MenuItem value="tricae" primaryText="Tricae" />
                </Field>
              </div>
              <div className="col-2">
                <Field
                  {...special_price}
                  component={this.renderTextField}
                  name="special_price"
                  label="Special Price"
                />
              </div>
              <div className="col-1">
                <DatePicker
                  hintText="Início"
                  fullWidth={true}
                  autoOk={true}
                  ref="startDate"
                  id="startDate"
                  className="filter-date-picker"
                  onChange={this.handleStartDate}
                />
                <Field
                  {...start}
                  component={this.renderText}
                  type="hidden"
                  name="start"
                  label="Início"
                />
              </div>
              <div className="col-1">
                <TimePicker
                  format="24hr"
                  hintText="Horário"
                  fullWidth={true}
                  autoOk={true}
                  ref="startTime"
                  id="startTime"
                  className="filter-date-picker"
                  onChange={this.handleStartTime}
                />
              </div>
              <div className="col-1">
                <span className="filter-space-date">-</span>
              </div>
              <div className="col-1">
                <DatePicker
                  hintText="Fim"
                  fullWidth={true}
                  autoOk={true}
                  ref="endDate"
                  id="endDate"
                  className="filter-date-picker"
                  onChange={this.handleEndDate}
                />
                <Field
                  {...end}
                  component={this.renderText}
                  type="hidden"
                  name="end"
                  label="Fim"
                />
              </div>
              <div className="col-1">
                <TimePicker
                  format="24hr"
                  hintText="Horário"
                  fullWidth={true}
                  autoOk={true}
                  ref="endTime"
                  id="endTime"
                  className="filter-date-picker"
                  onChange={this.handleEndTime}
                />
              </div>
              <div className="col-1">
                <button className="filter-button"></button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

  function validate(formProps) {
    const errors = {};
    return errors;
  }

export default reduxForm({
  form: 'filterForm',
  fields: ['sku', 'store', 'special_price', 'start', 'end'],
  validate
})(
  connect(null, actions)(Filter)
);