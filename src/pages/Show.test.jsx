import React from 'react';
import { waitFor } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { useSession } from '../firebase/UserProvider';
import store from '../app/store';
import Show from './Show';

jest.mock('../firebase/UserProvider');

it('should renders <Home /> page correctly', async () => {
  useSession.mockReturnValueOnce([{ user: null, loading: false }, false]);

  const tree = (await renderer.create(
    <Provider store={store}>
      <Show match={{
        params: { id: '1' }, isExact: true, path: '', url: '',
      }}
      />
    </Provider>,
  ))
    .toJSON();

  waitFor(() => expect(tree).toMatchSnapshot());
});
