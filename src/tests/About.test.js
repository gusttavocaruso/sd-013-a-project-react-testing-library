import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente About.js', () => {
  test('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: 'About' }));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const aboutText = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(aboutText).toBeInTheDocument();
  });
});
