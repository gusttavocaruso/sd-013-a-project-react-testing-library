import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa componente Pokemon.js.', () => {
  test('O nome correto do Pokémon deve ser mostrado na tela.', () => {
    renderWithRouter(<App />);
    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon.innerHTML).toBe('Pikachu');
  });

  test('O tipo correto do Pokémon deve ser mostrado na tela.', () => {
    renderWithRouter(<App />);
    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon.innerHTML).toBe('Electric');
  });

  test('O peso médio do Pokémon deve ser mostrado na tela.', () => {
    renderWithRouter(<App />);
    const typePokemon = screen.getByTestId('pokemon-weight');
    expect(typePokemon.innerHTML).toBe('Average weight: 6.0 kg');
  });

  test('A imagem do Pokémon deve ser exibida.', () => {
    renderWithRouter(<App />);
    const alt = 'Pikachu sprite';
    const imgPokemon = screen.getByAltText(alt);
    expect(imgPokemon.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('O card do Pokémon deve conter um link de navegação para exibir detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', {
      name: /More details/i,
    });
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('Deve existir um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(moreDetails);
    const check = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    userEvent.click(check);
    const alt = 'Pikachu is marked as favorite';
    const imgStar = screen.getByAltText(alt);
    expect(imgStar.src).toBe('http://localhost/star-icon.svg');
  });
});
