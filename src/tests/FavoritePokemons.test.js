import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

/**
  Consultei o repositório do Gui-Alucard.
  Vei dele a ideia de utilizar o renderWithRouter passando props para o elemento.
  Lembrando que para tal é necessario limpar a renderisação antes de cada teste
  e para o segundo teste é necessario usar o array de pokemons que esta em ../data
  https://github.com/Gui-Alucard/Block15-Project-RTL
*/

describe('Requisito 3: texte do componente FavoritePokemons', () => {
  afterEach(cleanup);
  it('Requisito 3.1: Teste se é exibido No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    /** ======== acessando o elemento ========= */
    const noFavorite = screen.getByText(/No favorite pokemon found/i);

    /** ======== testando os elementos ========= */
    expect(noFavorite).toBeInTheDocument();
  });

  it('Requisito 3.2: Teste se são exibidos todos os cards de Pokemons', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    /** ======== acessando o elemento ========= */
    const favorites = screen.getAllByTestId('pokemon-name');

    /** ======== testando os elementos ========= */
    expect(favorites[0]).toHaveTextContent(/Pikachu/i);
    expect(favorites[8]).toHaveTextContent(/Dragonair/i);
  });
});
