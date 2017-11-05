import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import IconRow from '../app/components/IconRow';

it('renders correctly', () => {
  const tree = renderer
    .create(<IconRow icon="map" onChange={() => {}} text="Testing" defaultText="T" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
