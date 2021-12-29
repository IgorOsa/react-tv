import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import NotFound from './NotFound';

it('should renders NotFound page correctly', () => {
  const tree = renderer.create(
    <MemoryRouter initialEntries={[{ pathname: '/someMockErrorlink' }]}>
      <NotFound />
    </MemoryRouter>,
  )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
