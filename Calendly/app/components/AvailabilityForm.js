import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import moment from 'moment';

import IconRow from './IconRow';
import TimeRow from './TimeRow';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textBox: {
    height: 50,
    padding: 8,
    fontSize: 22,
  },
  button: {
    alignItems: 'center',
  },
});

class AvailabilityForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: '',
      description: '',
      duration: '',
      location: '',
      dateRange: '',
      // notBusy: true,
      buffer: '',
      recipientEmail: '',
      formCompleted: false,
      showList: false,
    };
  }

  async getAvailability() {
    try {
      const response = await fetch(`https://growthmindset-calendly.herokuapp.com/events/${this.state.dateRange}`);
      const responseJson = await response.json();
      console.log(responseJson.availablelist);
      this.setState({ data: responseJson.availablelist });
      console.log(this.state);
      this.setState({ showList: true });
    } catch (error) {
      console.error(error);
    }
  }

  renderSeparator = () => <View style={{ height: 10, backgroundColor: 'grey' }} />;

  render() {
    if (this.state.formCompleted) {
      if (this.state.showList) {
        return (
          <FlatList
            data={this.state.data}
            ItemSeparatorComponent={this.renderSeparator}
            renderItem={(item) => {
              console.log(item);
              return <TimeRow text={moment(item.item).format('LT')} />;
            }}
          />
        );
      }
      return <Text>Loading</Text>;
    }
    return (
      <ScrollView style={styles.container}>
        <View
          style={{
            height: 62,
            backgroundColor: '#0C6991',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}>New Event</Text>
        </View>
        <TextInput
          style={styles.textBox}
          onChangeText={eventName => this.setState({ eventName })}
          placeholder="Event Name"
          value={this.state.eventName}
        />
        <TextInput
          style={styles.textBox}
          onChangeText={description => this.setState({ description })}
          placeholder="Description / Instructions"
          value={this.state.description}
          multiline
        />
        <IconRow
          icon="room"
          onChange={location => this.setState({ location })}
          text={this.state.location}
          defaultText="Location"
        />
        <IconRow
          icon="update"
          onChange={duration => this.setState({ duration })}
          text={this.state.duration}
          defaultText="Duration"
        />
        <IconRow
          icon="schedule"
          onChange={buffer => this.setState({ buffer })}
          text={this.state.buffer}
          defaultText="Event Buffer"
        />
        <IconRow
          icon="today"
          onChange={dateRange => this.setState({ dateRange })}
          text={this.state.dateRange}
          defaultText="Date Range"
        />
        <IconRow
          icon="email"
          onChange={recipientEmail => this.setState({ recipientEmail })}
          text={this.state.recipientEmail}
          defaultText="Recipient Email"
        />
        <View style={styles.button}>
          <TouchableOpacity
            style={{
              backgroundColor: '#0C6991',
              alignSelf: 'stretch',
              alignItems: 'center',
              padding: 16,
            }}
            onPress={() => {
              this.setState({ formCompleted: true });
              console.log(this.state);
              console.log('Getting Availability');
              this.getAvailability();
            }}
            activeOpacity={0.7}
          >
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

export default AvailabilityForm;
