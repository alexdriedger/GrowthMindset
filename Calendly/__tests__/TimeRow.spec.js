import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import TimeRow from '../app/components/TimeRow';

it('renders correctly', () => {
  const tree = renderer.create(<TimeRow text="lsb" />).toJSON();
  expect(tree).toMatchSnapshot();
});
