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
} from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';
import { hook } from 'cavy';

import * as STYLES from '../common/Styles';
import IconRow from './IconRow';
import TimeRow from './TimeRow';
import PickerRow from './PickerRow';

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
      availabilty: {
        eventName: '',
        description: '',
        duration: '15',
        location: '',
        startDate: '2017-10-24',
        endDate: '2017-10-26',
        buffer: '10',
        recipientEmail: 'spencerspenst@gmail.com',
        earliestTime: '10:00',
        latestTime: '18:00',
      },
      formCompleted: false,
      showList: false,
    };
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
      <ScrollView ref={this.props.generateTestHook('AvailabilityForm')} style={styles.container}>
        <TextInput
          style={styles.textBox}
          onChangeText={eventName =>
            this.setState({
              availabilty: {
                ...this.state.availabilty,
                eventName,
              },
            })}
          placeholder="Event Name"
          value={this.state.availabilty.eventName}
        />
        <TextInput
          style={styles.textBox}
          onChangeText={description =>
            this.setState({
              availabilty: {
                ...this.state.availabilty,
                description,
              },
            })}
          placeholder="Description"
          value={this.state.availabilty.description}
          multiline
        />
        <IconRow
          icon="room"
          onChange={location =>
            this.setState({
              availabilty: {
                ...this.state.availabilty,
                location,
              },
            })}
          text={this.state.availabilty.location}
          defaultText="Location"
        />
        <IconRow
          icon="update"
          onChange={duration =>
            this.setState({
              availabilty: {
                ...this.state.availabilty,
                duration,
              },
            })}
          text={this.state.availabilty.duration}
          defaultText="Duration"
        />
        <IconRow
          icon="schedule"
          onChange={buffer =>
            this.setState({
              availabilty: {
                ...this.state.availabilty,
                buffer,
              },
            })}
          text={this.state.availabilty.buffer}
          defaultText="Event Buffer"
        />
        <PickerRow
          icon="schedule"
          onChange={earliestTime =>
            this.setState({
              availabilty: {
                ...this.state.availabilty,
                earliestTime,
              },
            })}
          onPress={() => console.log('THIS IS ONE OF MY TESTS')}
          text={this.state.availabilty.earliestTime}
          defaultText="Earliest Time"
        />
        <PickerRow
          icon="schedule"
          onChange={latestTime =>
            this.setState({
              availabilty: {
                ...this.state.availabilty,
                latestTime,
              },
            })}
          onPress={() => console.log('THIS IS A TEST> THE OTHER TIME BUSH BUTTON WORKS')}
          text={this.state.availabilty.latestTime}
          defaultText="Latest Time"
        />
        <IconRow
          icon="today"
          onChange={startDate =>
            this.setState({
              availabilty: {
                ...this.state.availabilty,
                startDate,
              },
            })}
          text={this.state.availabilty.startDate}
          defaultText="Start Date"
        />
        <IconRow
          icon="today"
          onChange={endDate =>
            this.setState({
              availabilty: {
                ...this.state.availabilty,
                endDate,
              },
            })}
          text={this.state.availabilty.endDate}
          defaultText="End Date"
        />
        <IconRow
          icon="email"
          onChange={recipientEmail =>
            this.setState({
              availabilty: {
                ...this.state.availabilty,
                recipientEmail,
              },
            })}
          text={this.state.availabilty.recipientEmail}
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
            onPress={() => this.props.onSubmit(this.state.availabilty)}
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
