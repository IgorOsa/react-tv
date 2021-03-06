import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import store from './app/store';
import App from './App';

it('should renders <App /> page correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <App />
    </Provider>,
  )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
