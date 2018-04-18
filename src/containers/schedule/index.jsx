import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import List from '../../components/list/list';
import Filter from '../../components/filter/filter';
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from '../../reducers/counter';

const Home = props => (
  <div>
    <Filter />
    <List />
  </div>
);

const mapStateToProps = state => ({
  count: state.counter.count,
  isIncrementing: state.counter.isIncrementing,
  isDecrementing: state.counter.isDecrementing
});

const mapDispatchToProps = dispatch => bindActionCreators({
  increment,
  incrementAsync,
  decrement,
  decrementAsync
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
