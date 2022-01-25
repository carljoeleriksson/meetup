import React from 'react';
import { act, render, screen } from '@testing-library/react';
import App from '../App';

test('renders without crashing', async () => {

  await act(async () => {

  render(<App />);

})

});
