import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente About.js', () => {
  it('Deve conter um h2 com o texto "About Pokédex"', () => {
    renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);

    const h2Text = screen.getByRole('heading', { name: /about pokédex/i });

    expect(h2Text).toBeInTheDocument();
  });
});
