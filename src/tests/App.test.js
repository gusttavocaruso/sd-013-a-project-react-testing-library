import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

describe('App.js tests', () => {
  test('Verifica se aplicação contém um conjunto fixo de link de navegação.', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const link = screen.getByRole('link', {
      name: /Home/i,
    });
    expect(link).toBeInTheDocument();

    const about = screen.getByRole('link', {
      name: /Abou/i,
    });
    expect(about).toBeInTheDocument();

    const favoritePokemons = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    expect(favoritePokemons).toBeInTheDocument();
  });
});
