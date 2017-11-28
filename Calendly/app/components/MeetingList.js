import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import PropTypes from 'prop-types';

import MeetingListRow from '../components/MeetingListRow';

class MeetingList extends Component {
  constructor(props) {
    super(props);
    this.props.fetchMeetings(this.props.authToken);
  }

  // {
  //   fetch('https://growthmindset-calendly.herokuapp.com/choose_meeting_time', {
  //     headers: {
  //       chosen_time: item.item.available_list[3].substring(0, 15),
  //       code: this.props.authToken,
  //       list_id: item.item.list_id,
  //     },
  //   });
  // }

  _renderItem = item => (
    <MeetingListRow
      lineOne={item.item.summary}
      lineTwo={item.item.email_creator}
      onPress={() => {
        console.log(item.item);
        this.props.onItemPress(item.item.list_id);
      }}
    />
  );

  render() {
    // console.log(this.props.data);
    return (
      <View>
        <FlatList data={this.props.data} renderItem={this._renderItem} />
      </View>
    );
  }
}

// MeetingList.propTypes = {
//   data: PropTypes.arrayOf(PropTypes.shape({
//     description: PropTypes.string.isRequired,
//     email_creator: PropTypes.string.isRequired,
//     id: PropTypes.string.isRequired,
//     location: PropTypes.string.isRequired,
//     summary: PropTypes.string.isRequired,
//   }).isRequired).isRequired,
// };

export default MeetingList;
