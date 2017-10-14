import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';

import IconRow from './IconRow';

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
    };
  }

  render() {
    return (
      <View style={styles.container}>
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
            onPress={() => console.log(this.state)}
            activeOpacity={0.7}
          >
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default AvailabilityForm;
