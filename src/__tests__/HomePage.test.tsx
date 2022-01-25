import React from 'react';
import { act, render, screen } from '@testing-library/react';
import HomePage from '../pages/HomePage'


describe('HomePage Component', () => {

    it('renders without crashing', async () => {

        await act(async () => {
  
        render(<HomePage />)
    })
}

);
})
