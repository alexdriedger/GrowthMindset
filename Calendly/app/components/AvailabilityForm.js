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
import Icon from 'react-native-vector-icons/MaterialIcons';

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
        startDate: moment().format('YYYY-MM-DD'),
        endDate: moment().add(1, 'day').format('YYYY-MM-DD'),
        buffer: '10',
        recipientEmail: 'spencerspenst@gmail.com',
        earliestTime: '9:00',
        earliestHour: 9,
        earliestMinute: 0,
        latestTime: '18:00',
        code: props.authCode,
        latestHour: 18,
        latestMinute: 0,
      },
    };
  }

  renderSeparator = () => <View style={{ height: 10, backgroundColor: 'grey' }} />;

  pickTimeFunction = async (whichTime) => {
    try {
      // Set the initial times of the time picker to the last chosen time for that field
      let initialHour = this.state.availability.latestHour;
      let initialMinute = this.state.availability.latestMinute;
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
        const newTime = _formatTime(hour, minute);
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

  pickDateFunction = async (whichDate) => {
    try {
      const {
        action, year, month, day,
      } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date(),
      });
      console.log(`the read date is: ${year} ${month} ${day}`);
      if (action !== DatePickerAndroid.dismissedAction) {
        const newDate = moment(`${year}-${month + 1}-${day}`, 'YYYY-MM-DD').format('YYYY-MM-DD');
        if (whichDate === 'startDate') {
          this.setState({
            availability: {
              ...this.state.availability,
              startDate: newDate,
            },
          });
          // this.setState({ availablity.earliestTime: `${newTime}` });
          console.log('state is now: ', this.state);
        } else {
          this.setState({
            availability: {
              ...this.state.availability,
              endDate: newDate,
            },
          });
          console.log('state is now: ', this.state);
        }
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <TextInput
          style={[styles.textBox, { backgroundColor: STYLES.COLOR_PRIMARY, paddingLeft: 16, color: 'white' }]}
          onChangeText={eventName =>
            this.setState({
              availability: {
                ...this.state.availability,
                eventName,
              },
            })}
          placeholder="Enter title"
          placeholderTextColor="white"
          value={this.state.availability.eventName}
          underlineColorAndroid="transparent"
        />
        <View style={{ flexDirection: 'row' }}>
          <View style={{ padding: 16, width: 88 }}>
            <Icon
              name="schedule"
              size={30}
              color="black"
            />
          </View>
          <View style={{ flexDirection: 'column', flex: 1 }}>
            <DatePickerRow
              icon="today"
              onChange={startDate =>
                this.setState({
                  availability: {
                    ...this.state.availability,
                    startDate,
                  },
                })}
              onPress={() => this.pickDateFunction('startDate')}
              text={moment(this.state.availability.startDate).format('ddd[,] MMM D[,] YYYY')}
              defaultText={moment(this.state.availability.startDate).format('ddd[,] MMM D[,] YYYY')}
            />
            <DatePickerRow
              icon="today"
              onChange={endDate =>
                this.setState({
                  availability: {
                    ...this.state.availability,
                    endDate,
                  },
                })}
              onPress={() => this.pickDateFunction('endDate')}
              text={moment(this.state.availability.endDate).format('ddd[,] MMM D[,] YYYY')}
              defaultText={moment(this.state.availability.endDate).format('ddd[,] MMM D[,] YYYY')}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 48, paddingTop: 16 }}>
              <View style={{ flexDirection: 'column', flex: 1 }}>
                <Text>Earliest</Text>
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
              </View>
              <View style={{ flexDirection: 'column', flex: 1 }}>
                <Text>Latest</Text>
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
              </View>
            </View>
          </View>
        </View>
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

export default AvailabilityForm;
