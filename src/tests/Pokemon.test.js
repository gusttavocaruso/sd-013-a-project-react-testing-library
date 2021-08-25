import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Verificando o componente Pokemon', () => {
  test('Verifica se é renderizado card com as informações do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/65');

    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName.innerHTML).toBe('Alakazam');
    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType.innerHTML).toBe('Psychic');
    const pokeWeight = screen.getByTestId('pokemon-weight');
    expect(pokeWeight.innerHTML).toBe('Average weight: 48.0 kg');
    const pokeImg = screen.getByAltText('Alakazam sprite');
    const srcPokeImg = pokeImg.src.includes('https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png');
    expect(srcPokeImg).toBeTruthy();
  });

  test('Verifica o link more details da pokedex', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', {
      name: 'More details',
    });
    userEvent.click(moreDetails);
    expect(moreDetails.href).toBe('http://localhost/pokemons/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/65');

    const linkFavoritePokémons = screen.getByRole('checkbox', { checked: false });
    userEvent.click(linkFavoritePokémons);
    expect(linkFavoritePokémons).toBeChecked();

    const pokeImgFavorite = screen.getByAltText('Alakazam is marked as favorite');
    const srcPokeImg = pokeImgFavorite.src.includes('/star-icon.svg');
    expect(srcPokeImg).toBeTruthy();
  });
});

// Reaproveitei alguns testes de outros arquivos que eu ja havia feito, e em alguns testes consultei a web, e reassisti a aula aovivo 15.3.

// https://www.ti-enxame.com/pt/reactjs/como-testar-o-href-da-ancora-com-react-testing-library/812065590/
