import React from 'react';
import { connect } from 'react-redux';
import List from '../../components/list/list';
import Filter from '../../components/filter/filter';
import * as actions from '../../actions/special_price';


class SpecialPrice extends React.Component {
  componentWillMount() {
    this.props.fetchSearch();
  }

  render() {
    return (
      <div>
      <Filter />
      <List
        rows={this.props.search._embedded.items}
        columns={this.props.columns}
        currentPage={this.props.search.current_page}
        totalItens={this.props.search.total_itens}
        totalItensCurrentPage={this.props.search.total_itens_current_page}
        maxPerPage={this.props.search.max_per_page}
        hasPreviousPage={this.props.search.has_previous_page}
        hasNextPage={this.props.search.has_next_page}
        handleFetch={this.props.fetchSearch}
      />
    </div>
    );  
  }
}

SpecialPrice.defaultProps = {
  columns : [
    {index: 'sku', label: 'SKU'},
    {index: 'special_prices[0].store_slug', label: 'Store'},
    {index: 'price', label: 'Original Price'},
    {index: 'special_prices[0].special_price', label: 'Special Price'},
    {index: 'special_prices[0].from', label: 'Data de Início'},
    {index: 'special_prices[0].to', label: 'Data de Fim'},
    {index: 'special_prices[0].update_by', label: 'Última Atualização'}
  ],
  search: {
    _embedded: {
      items: []
    },
    current_page: 1,
    total_itens: 0,
    total_itens_current_page: 0,
    max_per_page: 10,
    has_previous_page: false,
    has_next_page: false
  }
}

const mapStateToProps = state => ({
  search: state.special_price.search
});

export default connect(
  mapStateToProps,
  actions
)(SpecialPrice);