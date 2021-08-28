import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  test('se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);

    const pokemonPikachu = screen.getByText('Pikachu');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByText('Average weight: 6.0 kg');
    expect(pokemonPikachu).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toBeInTheDocument();

    const img = screen.getByRole('img');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(img.alt).toBe('Pikachu sprite');
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém um link'
  + ' de navegação para exibir detalhes deste Pokémon', () => {
    renderWithRouter(<App />);

    const { id } = pokemons[0];

    const linkDetails = screen.getByRole('link', { name: 'More details' });
    expect(linkDetails.href).toBe(`http://localhost/pokemons/${id}`);
  });

  test('Verifica se ao clicar no link para a página de detalhes de um Pokémon, '
  + 'é feito o redirecionamento para esta página', () => {
    const { id } = pokemons[0];
    const { history } = renderWithRouter(
      <Pokemon isFavorite={ false } pokemon={ pokemons[0] } />,
    );

    const linkDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkDetails);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it('Verifica se existe um ícone de estrela nos Pokémons favoritados,'
  + 'é feito o redirecionamento para esta página', () => {
    renderWithRouter(
      <Pokemon isFavorite pokemon={ pokemons[0] } />,
    );

    const starIcon = screen.getByRole('img', { name: /marked as favorite/i });
    expect(starIcon).toBeInTheDocument();

    expect(starIcon.src).toMatch(/star-icon.svg/i);

    expect(starIcon.alt).toBe(`${pokemons[0].name} is marked as favorite`);
  });
});
