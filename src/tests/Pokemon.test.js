import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa a Pokemon.js e suas funcionalidades.', () => {
  const {
    name,
    type,
    averageWeight: { value, measurementUnit },
    image,
  } = pokemons[0];
  test('Testa se é renderizado os pokemon e seus detalhes', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(name);
    expect(screen.getByTestId('pokemon-weight')).toHaveTextContent(
      `Average weight: ${value} ${measurementUnit}`,
    );
    expect(screen.getByAltText(`${name} sprite`)).toHaveAttribute('src', image);
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
