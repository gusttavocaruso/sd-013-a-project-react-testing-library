import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';

import App from '../App';

describe('verify if the header contains navigation links', () => {
  it('should verify if the first link is the Home link', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
  });

  it('should verify if the second link is the About link', () => {
    renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
  });

  it('should verify if the third link is the Favorite Poke link', () => {
    renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoriteLink).toBeInTheDocument();
  });
});
