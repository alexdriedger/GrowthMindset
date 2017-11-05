import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import AvailabilityList from '../app/components/AvailabilityList';

const times = require('./2017-10-17-mockdata.json').availablelist;

it('renders correctly', () => {
  const tree = renderer.create(<AvailabilityList times={times} isFetching />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders with an empty list', () => {
  const tree = renderer.create(<AvailabilityList times={[]} isFetching={false} />).toJSON();
  expect(tree).toMatchSnapshot();
});
