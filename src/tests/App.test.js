import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

describe('App', () => {
  test('Renderiza os links com o texto "Home", "About", "Favorite Pokémons" ', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    expect(screen.getByText('Home')).toBeDefined();
    expect(screen.getByText('About')).toBeDefined();
    expect(screen.getByText('Favorite Pokémons')).toBeDefined();
  });
});
