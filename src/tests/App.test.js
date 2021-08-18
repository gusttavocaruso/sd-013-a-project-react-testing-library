import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente App.js', () => {
  it('Testa se o topo da aplicação contém um conjunto fixo de links de navegação.',
    () => {
      renderWithRouter(<App />);

      const home = screen.getByText(/Home/i);
      expect(home).toBeInTheDocument();
      const about = screen.getByText(/About/i);
      expect(about).toBeInTheDocument();
      const favoritePokemon = screen.getByText(/Favorite Pokémons/i);
      expect(favoritePokemon).toBeInTheDocument();
    });

  it('Testa se a aplicação é redirecionada para a página inicial.',
    () => {
      const { history } = renderWithRouter(<App />);
      const home = screen.getByText(/Home/i);

      userEvent.click(home);
      expect(history.location.pathname).toBe('/');
    });

  it('Testa se a aplicação é redirecionada para a página de About.',
    () => {
      const { history } = renderWithRouter(<App />);
      const about = screen.getByText(/About/i);

      userEvent.click(about);
      expect(history.location.pathname).toBe('/about');
    });

  it('Testa se a aplicação é redirecionada para a página de Pokémons Favoritados.',
    () => {
      const { history } = renderWithRouter(<App />);
      const favoritePokemons = screen.getByText(/Favorite Pokémons/i);

      userEvent.click(favoritePokemons);
      expect(history.location.pathname).toBe('/favorites');
    });

  it('Testa se a aplicação é redirecionada para a página Not Found.',
    async () => {
      const { history } = renderWithRouter(<App />);

      history.push('/any');
      const notFound = screen.getByText(/Page requested not found/i);
      expect(notFound).toBeInTheDocument();
    });
});
