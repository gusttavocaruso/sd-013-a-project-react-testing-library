import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../helper/RenderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o componente Pokemon.js', () => {
  test('se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    expect(screen.getByTestId('pokemon-name').innerHTML).toMatch(pokemons[0].name); // Testa o nome.
    expect(screen.getByTestId('pokemon-type').innerHTML).toMatch(pokemons[0].type); // Testa o tipo.

    const arrayPokemon = pokemons[0].averageWeight;
    expect(screen.getByTestId('pokemon-weight').innerHTML)
      .toMatch(`Average weight: ${arrayPokemon.value} ${arrayPokemon.measurementUnit}`); // Testa o peso.

    expect(screen.getByRole('img').src).toMatch(pokemons[0].image);
    expect(screen.getByRole('img').alt).toMatch(`${pokemons[0].name} sprite`); // Testa a imagem.
  });

  test('se o card do Pokémon contém um link para exibir detalhes deste Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
    fireEvent.click(moreDetails);

    const { pathname } = history.location;
    expect(pathname).toMatch(`/pokemons/${pokemons[0].id}`);
  });

  test('se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: /more details/i }));
    fireEvent.click(screen.getByText('Pokémon favoritado?'));
    fireEvent.click(screen.getByText('Home'));

    const starImage = screen.getByRole('img', { name: /is marked as favorite/i });
    expect(starImage.src).toMatch('http://localhost/star-icon.svg');
  });
});
