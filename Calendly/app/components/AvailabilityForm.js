import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textBox: {
    height: 50,
    padding: 8,
    fontSize: 22,
  },
});

class AvailabilityForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: '',
      description: '',
      location: '',
      earliestDay: '',
      earliestTime: '',
      notBusy: true,
      buffer: 15,
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
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'black' }}>New Event</Text>
        </View>
        <TextInput
          style={styles.textBox}
          onChangeText={eventName => this.setState({ eventName })}
          placeholder="Event Name"
          value={this.state.eventName}
        />
      </View>
    );
  }
}

export default AvailabilityForm;
