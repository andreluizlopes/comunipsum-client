import React, { Component } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import IconButton from 'material-ui/IconButton';
import IconArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import IconArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import '../../assets/css/components/list/pagination.css';

class Pagination extends Component {

  handleFormSubmit(formProps) {
    this.props.fetchMessage();
  }

  currentInitItem() {
    if (this.props.currentPage === 1) {
      return this.props.currentPage;
    }
    if ( this.props.currentPage > 1) {
      return (this.props.maxPerPage * this.props.currentPage + 1) - this.props.maxPerPage;
    }
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

  handlePage(page) {
    this.props.change('page', page);
    this.props.handleFetch();
  }

  render() {
    const { handleSubmit, fields: { page }} = this.props;

    return (
      <div className="pagination">
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <Field
            {...page}
            component={this.renderText}
            type="hidden"
            name="page"
            value={this.props.currentPage}
          />
        </form>
        <div className="pagination-display">
          {this.currentInitItem()}-{this.currentInitItem()+this.props.totalItensCurrentPage-1} of {this.props.totalItens}
        </div>
        <div className="pagination-actions">
          <IconButton
            disabled={!this.props.hasPreviousPage}
            onClick={() => this.handlePage(this.props.currentPage - 1)}
          >
            <IconArrowLeft />
          </IconButton>
          <IconButton
            disabled={!this.props.hasNextPage}
            onClick={() => this.handlePage(this.props.currentPage + 1)}
          >
            <IconArrowRight />
          </IconButton>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'filterPagination',
  fields: ['page': '1']
})(
  connect(null, actions)(Pagination)
);
