import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa os links do top da aplicacao', () => {
  it('Verifica se aplicacao é redirecionada para Home', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', {
      name: (/Home/i),
    });
    const { pathname } = history.location;
    expect(homeLink).toBeInTheDocument();
    // Verificar se ao clicar , leva para o caminho correto
    userEvent.click(homeLink);
    // Cliquei no botao
    expect(pathname).toBe('/');
  });

  it('Verifica se aplicacao é redirecionada para About', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByText(/about/i);
    expect(aboutLink).toBeInTheDocument();
    // Verificar se ao clicar , leva para o caminho correto
    userEvent.click(aboutLink);
    const { pathname } = history.location;
    // Cliquei no botao
    expect(pathname).toBe('/about');
  });

  it('Verifica se aplicacao é redirecionada para Favorite Pokemons', () => {
    const { history } = renderWithRouter(<App />);
    const favPokemonLink = screen.getByText(/Favorite Pokémons/i);
    expect(favPokemonLink).toBeInTheDocument();
    // Verificar se ao clicar , leva para o caminho correto
    userEvent.click(favPokemonLink);
    const { pathname } = history.location;
    // Cliquei no botao
    expect(pathname).toBe('/favorites');
  });
});
