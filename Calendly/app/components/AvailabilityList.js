import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';

import TimeRow from './TimeRow';

class AvailabilityList extends Component {
  _renderSeparator = () => <View style={{ height: 10, backgroundColor: 'grey' }} />;

  _renderItem = item => (
    <TimeRow
      text={moment(item.item)
        .add(7, 'hours')
        .format('LT')}
    />
  );

  render() {
    console.log(`isFetching is: ${this.props.isFetching}`);
    console.log(`times is: ${this.props.times}`);
    return (
      <View>
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
