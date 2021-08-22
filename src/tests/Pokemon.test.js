import React from 'react';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../helper/RenderWithRouter';
import App from '../App';
// import pokemons from '../data';

afterEach(cleanup);

describe('Testa o componente Pokemon.js', () => {
  test('se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />); // Já começa com o Pikachu!!!

    // expect(screen.getByTestId('pokemon-name').innerHTML).toMatch(pokemons[0].name); // Testa o nome.
    // expect(screen.getByTestId('pokemon-type').innerHTML).toMatch(pokemons[0].type); // Testa o tipo.

    // const arrayPokemon = pokemons[0].averageWeight;
    // expect(screen.getByTestId('pokemon-weight').innerHTML)
    //   .toMatch(`Average weight: ${arrayPokemon.value} ${arrayPokemon.measurementUnit}`); // Testa o peso.

    // expect(screen.getByRole('img').src).toMatch(pokemons[0].image);
    // expect(screen.getByRole('img').alt).toMatch(`${pokemons[0].name} sprite`); // Testa a imagem.

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByRole('img');

    expect(pokemonName).toHaveTextContent(/pikachu/i); // Testa o nome.
    expect(pokemonType).toHaveTextContent(/electric/i); // Testa o tipo.
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg'); // Testa o peso.
    expect(pokemonImage.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png'); // Testa a imagem.
    expect(pokemonImage.alt).toBe('Pikachu sprite');
  });

  test('se o card do Pokémon contém um link para exibir detalhes deste Pokémon', () => {
    const { history } = renderWithRouter(<App />); // Já começa com o Pikachu!!!

    // const moreDetails = screen.getByRole('link', { name: /more details/i });
    // expect(moreDetails).toBeInTheDocument();
    // fireEvent.click(moreDetails);

    // const { pathname } = history.location;
    // expect(pathname).toMatch(`/pokemons/${pokemons[0].id}`);

    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();

    const moreDetails = screen.getByText(/more details/i);
    fireEvent.click(moreDetails);
    const { pathname } = history.location; // esse { pathname } tem que vir depois do click
    expect(pathname).toBe('/pokemons/25');
  });

  test('se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: /more details/i }));
    fireEvent.click(screen.getByText('Pokémon favoritado?'));
    fireEvent.click(screen.getByText('Home'));

    const starImage = screen.getByRole('img', { name: /is marked as favorite/i });
    expect(starImage.src).toMatch('/star-icon.svg');
  });
});
