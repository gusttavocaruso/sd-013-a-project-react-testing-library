import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa a Pokemon.js e suas funcionalidades.', () => {
  test('Testa se é renderizado o pokemon e seus detalhes', () => {
    renderWithRouter(<App />);

    const getName = screen.getByTestId('pokemon-name');
    const getType = screen.getByTestId('pokemon-type');
    const getWeight = screen.getByTestId('pokemon-weight');
    const getNext = screen.getByText('Próximo pokémon');
    const getImage = screen.getByRole('img');
    const url1 = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const url2 = 'https://cdn2.bulbagarden.net/upload/1/18/Spr_5b_023.png';

    expect(getName.innerHTML).toBe('Pikachu');
    expect(getType.innerHTML).toBe('Electric');
    expect(getWeight.innerHTML).toBe('Average weight: 6.0 kg');
    expect(getImage.src).toEqual(url1);

    fireEvent.click(getNext);
    fireEvent.click(getNext);
    fireEvent.click(getNext);

    expect(getName.innerHTML).toBe('Ekans');
    expect(getType.innerHTML).toBe('Poison');
    expect(getWeight.innerHTML).toBe('Average weight: 6.9 kg');
    expect(getImage.src).toEqual(url2);
  });
  test('Verifica se o botão more details esta funcional', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/');
    const getButton = screen.getByText('More details');
    expect(getButton).toBeInTheDocument();

    fireEvent.click(getButton);
    const getHeading = screen.getByRole('heading', { name: /summary/i });
    expect(getHeading).toBeInTheDocument();
  });
});

describe('Testes mais específicos da pokemon.js.', () => {
  test('Testa se, ao clicar no botão, a URL muda.', () => {
    const { history } = renderWithRouter(<App />);

    const getButton = screen.getByText('More details');

    fireEvent.click(getButton);
    const actualUrl = history.location.pathname;
    expect(actualUrl).toBe('/pokemons/25');
  });
  test('Testa se, ao favoritar, aparece uma estrelinha.', () => {
    renderWithRouter(<App />);

    const getMoreDetails = screen.getByRole('link', { name: /more details/i });
    fireEvent.click(getMoreDetails);
    const getFavorited = screen.getByText(/pokémon favorito?/i);
    fireEvent.click(getFavorited);

    const urlStar = '/star-icon.svg';
    const getStar = screen.getByAltText(/is marked as favorite/i);

    expect(getStar.src).toContain(urlStar);
  });
});
