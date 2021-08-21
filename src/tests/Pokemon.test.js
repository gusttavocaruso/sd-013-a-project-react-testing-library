import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <Pokemon.js />', () => {
  test('Renderiza um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);
    const correctNamePokemon = screen.getByTestId('pokemon-name');
    expect(correctNamePokemon.innerHTML).toBe('Pikachu');
  });

  test('O tipo correto do pokémon deve ser mostrado na tela.', () => {
    renderWithRouter(<App />);
    const correctTypePokemon = screen.getByTestId('pokemon-type');
    expect(correctTypePokemon.innerHTML).toBe('Electric');
  });

  test('O peso médio do pokémon deve ser exibido.', () => {
    renderWithRouter(<App />);
    const correctWeightPokemon = screen.getByTestId('pokemon-weight');
    expect(correctWeightPokemon.innerHTML.replace('Average weight: ', '')).toBe('6.0 kg');
  });

  test('A imagem do Pokémon deve ser exibida.', () => {
    renderWithRouter(<App />);
    const correctImgPokemon = screen.getByAltText('Pikachu sprite');
    expect(correctImgPokemon.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
});

describe('Teste o componente <Pokemon.js />', () => {
  test('O card do Pokémon indicado na Pokédex tem um link para exibir detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const linkDetailsPokemon = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(linkDetailsPokemon);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/pokemons/25');
  });

  test('Existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');

    const checkBoxFavorite = screen.getByRole('checkbox');
    userEvent.click(checkBoxFavorite);

    const correctImgFavoritePokemon = screen.getByAltText('Pikachu is marked as favorite');
    expect(correctImgFavoritePokemon.src).toContain('/star-icon.svg');
  });
});
