import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import store from '../app/store';
import Home from './Home';

it('should renders <Home /> page correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <Home />
    </Provider>,
  )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
