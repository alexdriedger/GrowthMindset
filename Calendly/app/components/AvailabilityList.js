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
      text={moment(item.item)
        .add(1, 'month')
        .utc()
        .calendar()}
    />
  );

  render() {
    console.log(`isFetching is: ${this.props.isFetching}`);
    console.log(`times is: ${this.props.times}`);
    console.log(`duration is: ${this.props.duration}`);
    return (
      <View style={{ backgroundColor: STYLES.COLOR_PRIMARY }}>
        <FlatList
          data={this.props.times}
          ItemSeparatorComponent={this._renderSeparator}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

AvailabilityList.propTypes = {
  times: PropTypes.arrayOf(PropTypes.string).isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default AvailabilityList;
