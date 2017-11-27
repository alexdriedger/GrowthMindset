import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TimePickerAndroid,
  DatePickerAndroid,
} from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';
import { hook } from 'cavy';

import * as STYLES from '../common/Styles';
import IconRow from './IconRow';
import TimeRow from './TimeRow';
import TimePickerRow from './TimePickerRow';
import DatePickerRow from './DatePickerRow';

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

/**
 * Returns e.g. '3:05'.
 */
function _formatTime(hour, minute) {
  return `${hour}:${minute < 10 ? `0${minute}` : minute}`;
}

class AvailabilityForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availability: {
        eventName: '',
        description: '',
        duration: '15',
        location: '',
        startDate: '2017-10-24',
        endDate: '2017-10-26',
        buffer: '10',
        recipientEmail: 'spencerspenst@gmail.com',
        earliestTime: '9:00',
        earliestHour: 9,
        earliestMinute: 0,
        latestTime: '18:00',
        latestHour: 18,
        latestMinute: 0,
      },
      formCompleted: false,
      showList: false,
    };
  }

  renderSeparator = () => <View style={{ height: 10, backgroundColor: 'grey' }} />;

  pickTimeFunction = async (whichTime) => {
    try {
      // Set the initial times of the time picker to the last chosen time for that field
      initialHour = this.state.availability.latestHour;
      initialMinute = this.state.availability.latestMinute;
      if (whichTime === 'earliestTime') {
        initialHour = this.state.availability.earliestHour;
        initialMinute = this.state.availability.earliestMinute;
      }

      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: initialHour,
        minute: initialMinute,
        is24Hour: false,
      });

      console.log(`read time as: ${hour} hours and ${minute} minutes`);
      console.log('state is now: ', this.state);
      if (action !== TimePickerAndroid.dismissedAction) {
        newTime = _formatTime(hour, minute);
        if (whichTime === 'earliestTime') {
          console.log(`setting EARLIEST TIME state as: ${hour} hours and ${minute} minutes. This is formatted as ${newTime}`);
          this.setState({
            availability: {
              ...this.state.availability,
              earliestTime: newTime,
              earliestHour: hour,
              earliestMinute: minute,
            },
          });
          // this.setState({ availablity.earliestTime: `${newTime}` });
          console.log('state is now: ', this.state);
        } else {
          console.log(`setting LATEST TIME state as: ${hour} hours and ${minute} minutes`);
          this.setState({
            availability: {
              ...this.state.availability,
              latestTime: newTime,
              latestHour: hour,
              latestMinute: minute,
            },
          });
          console.log('state is now: ', this.state);
        }
      }
    } catch ({ code, message }) {
      console.warn('Cannot open time picker', message);
    }
  };

  // pickDateFunction = async (whichDate) => {
  //   try {
  //     const {action, year, month, day} = await DatePickerAndroid.open({
  //       // Use `new Date()` for current date.
  //       // May 25 2020. Month 0 is January.
  //       date: new Date()
  //     });
  //     if (action !== DatePickerAndroid.dismissedAction) {
  //       // Selected year, month (0-11), day
  //       // this.setState();
  //     }
  //   } catch ({code, message}) {
  //     console.warn('Cannot open date picker', message);
  // };

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
      <ScrollView ref={this.props.generateTestHook('AvailabilityForm')} style={styles.container}>
        <TextInput
          style={styles.textBox}
          onChangeText={eventName =>
            this.setState({
              availability: {
                ...this.state.availability,
                eventName,
              },
            })}
          placeholder="Event Name"
          value={this.state.availability.eventName}
        />
        <TextInput
          style={styles.textBox}
          onChangeText={description =>
            this.setState({
              availability: {
                ...this.state.availability,
                description,
              },
            })}
          placeholder="Description"
          value={this.state.availability.description}
          multiline
        />
        <IconRow
          icon="room"
          onChange={location =>
            this.setState({
              availability: {
                ...this.state.availability,
                location,
              },
            })}
          text={this.state.availability.location}
          defaultText="Location"
        />
        <IconRow
          icon="update"
          onChange={duration =>
            this.setState({
              availability: {
                ...this.state.availability,
                duration,
              },
            })}
          text={this.state.availability.duration}
          defaultText="Duration"
        />
        <IconRow
          icon="schedule"
          onChange={buffer =>
            this.setState({
              availability: {
                ...this.state.availability,
                buffer,
              },
            })}
          text={this.state.availability.buffer}
          defaultText="Event Buffer"
        />
        <TimePickerRow
          icon="schedule"
          onChange={earliestTime =>
            this.setState({
              availability: {
                ...this.state.availability,
                earliestTime,
              },
            })}
          onPress={() => this.pickTimeFunction('earliestTime')}
          text={this.state.availability.earliestTime}
          defaultText={this.state.availability.earliestTime}
        />
        <TimePickerRow
          icon="schedule"
          onChange={latestTime =>
            this.setState({
              availability: {
                ...this.state.availability,
                latestTime,
              },
            })}
          onPress={() => this.pickTimeFunction('latestTime')}
          text={this.state.availability.latestTime}
          defaultText={this.state.availability.latestTime}
        />
        <IconRow
          icon="today"
          onChange={startDate =>
            this.setState({
              availability: {
                ...this.state.availability,
                startDate,
              },
            })}
          // onPress={() => this.pickDateFunction('startDate')}
          text={this.state.startDate}
          defaultText="Start Date"
        />
        <IconRow
          icon="today"
          onChange={endDate =>
            this.setState({
              availability: {
                ...this.state.availability,
                endDate,
              },
            })}
          // onPress={() => this.pickDateFunction('endDate')}
          text={this.state.endDate}
          defaultText="End Date"
        />
        <IconRow
          icon="email"
          onChange={recipientEmail =>
            this.setState({
              availability: {
                ...this.state.availability,
                recipientEmail,
              },
            })}
          text={this.state.availability.recipientEmail}
          defaultText="Recipient Email"
        />
        <View style={styles.button}>
          <TouchableOpacity
            ref={this.props.generateTestHook('AvailabilityForm.Submit')}
            style={{
              backgroundColor: STYLES.COLOR_PRIMARY,
              alignSelf: 'stretch',
              alignItems: 'center',
              padding: 16,
            }}
            onPress={() => this.props.onSubmit(this.state.availability)}
            activeOpacity={0.7}
          >
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

AvailabilityForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const TestableAvailabilityForm = hook(AvailabilityForm);
export default TestableAvailabilityForm;
