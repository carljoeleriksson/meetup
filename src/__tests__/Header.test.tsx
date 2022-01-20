import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header'


describe('Header Component', () => {
    it('renders without crashing', () => {
        render(<Header />)
    })

})
