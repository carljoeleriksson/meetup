import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header'
import { BrowserRouter } from 'react-router-dom';


describe('Header Component', () => {
    it('renders without crashing', () => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        )
    })

})
