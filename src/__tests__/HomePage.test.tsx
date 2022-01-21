import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../pages/HomePage'


describe('HomePage Component', () => {
    it('renders without crashing', () => {
        render(<HomePage />)
    })

})
