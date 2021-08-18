import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

test('Testa o App.js', () => {
  renderWithRouter(<App />);
  const homeLink = screen.getByRole('link', {
    name: /home/i,
  });
  expect(homeLink).toBeInTheDocument();

  const aboutLink = screen.getByRole('link', {
    name: /about/i,
  });
  expect(aboutLink).toBeInTheDocument();

  const favoriteLink = screen.getByRole('link', {
    name: /favorite pokémons/i,
  });
  expect(favoriteLink).toBeInTheDocument();
});
