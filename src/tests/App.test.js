import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

// Teste se o topo da aplicação contém um conjunto fixo de links de navegação.
/*
Não funcinou com o render, na doc vi uma forma de resolver criando um arquivo auxiliar e chamando no lugar do render.
*/
describe('Teste se o topo da aplicação contém um conjunto fixo de links', () => {
  it('link home', () => {
    renderWithRouter(<App />);
    const linkWithHome = screen.getByText(/Home/i);
    const linkWithAbout = screen.getByText(/About/i);
    const linkWithFavoritePokemons = screen.getByText(/Favorite Pokémons/i);
    expect(linkWithHome).toBeInTheDocument('');
    expect(linkWithAbout).toBeInTheDocument('');
    expect(linkWithFavoritePokemons).toBeInTheDocument('');
  });
});

// Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação.

// Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação.

// Teste se a aplicação é redirecionada para a página de Pokémons Favoritados, na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.

// Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.
