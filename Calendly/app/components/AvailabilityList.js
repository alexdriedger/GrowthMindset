import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';

import TimeRow from './TimeRow';

import * as STYLES from '../common/Styles';

class AvailabilityList extends Component {
  _renderSeparator = () => (
    <View
      style={{
        height: 5,
        backgroundColor: STYLES.COLOR_PRIMARY,
      }}
    />
  );

  _renderItem = item => (
    <TimeRow
      text={moment(item.item).format('dddd [at] LT')}
      onPress={() => {
        console.log(item);
        this.props.onItemPress(item.index);
      }}
    />
  );

  render() {
    return (
      <View style={{ backgroundColor: STYLES.COLOR_PRIMARY }}>
        <FlatList
          data={this.props.times}
          ItemSeparatorComponent={this._renderSeparator}
          renderItem={this._renderItem}
          isFetching={this.props.isFetching}
          ListEmptyComponent={() => <View style={{ height: 2000 }} />}
        />
      </View>
    );
  }
}

AvailabilityList.propTypes = {
  times: PropTypes.arrayOf(PropTypes.string).isRequired,
  isFetching: PropTypes.bool.isRequired,
  onItemPress: PropTypes.func,
};

AvailabilityList.defaultProps = {
  onItemPress: () => {},
};

export default AvailabilityList;
