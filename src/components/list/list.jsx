import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Pagination from './pagination';
import _ from "lodash";

import {Card} from 'material-ui/Card';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Divider from 'material-ui/Divider';

class List extends Component {
  renderList() {
    const listItems = [];
    const responseMessage = this.props.rows;
    if (responseMessage) {
      responseMessage.map((row, index) => {
        return listItems.push(
          <TableRow key={index}>
            {
              this.props.columns.map( (column, index) => {
                return <TableRowColumn key={index}>{_.get(row, column.index)}</TableRowColumn>
              })
            }
          </TableRow>
        );
      });
    }

    return listItems;
  }

  renderPagination() {
    return (<Pagination
      currentPage={this.props.currentPage}
      totalItens={this.props.totalItens}
      totalItensCurrentPage={this.props.totalItensCurrentPage}
      maxPerPage={this.props.maxPerPage}
      hasPreviousPage={this.props.hasPreviousPage}
      hasNextPage={this.props.hasNextPage}
      handleFetch={this.props.handleFetch}
    />);
  }

  render() {
    return (
      <div className="container">
        <Card>
          <Table>
            <TableHeader
              adjustForCheckbox={false}
              displaySelectAll={false}
            >
              <TableRow>
              {
                this.props.columns.map( (column, index) => {
                  return <TableHeaderColumn key={index}>{column.label}</TableHeaderColumn>
                })
              }
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
            >
              {this.renderList()}
            </TableBody>
          </Table>
          <Divider/>
          {this.renderPagination()}
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { };
}

export default connect(mapStateToProps, actions)(List);