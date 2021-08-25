import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
// import Pokemon from '../components/Pokemon';

describe('Pokemon.js tests', () => {
  it('verifica que o nome e tipo correto do pokemon renderiza', () => {
    renderWithRouter(<App />);

    const getName = screen.getByTestId('pokemon-name');
    expect(getName).toBeDefined();

    const getType = screen.getByTestId('pokemon-type');
    expect(getType).toBeDefined();

    const getNameText = screen.getByText(/pikachu/i);
    expect(getNameText).toBeInTheDocument();

    const getTypeText = screen.getByText(/electric/i);
    expect(getTypeText).toBeInTheDocument();
  });

  it('Verifica se o peso médio renderiza corretamente', () => {
    renderWithRouter(<App />);

    const getWeight = screen.getByTestId('pokemon-weight');
    expect(getWeight).toBeInTheDocument();
  });

  it('verifica se a imagem renderiza e se existe um alt', () => {
    renderWithRouter(<App />);

    const getImage = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });
    expect(getImage).toBeInTheDocument();

    const getImageByAlt = screen.getByAltText(/pikachu sprite/i);
    expect(getImageByAlt).toBeInTheDocument();
  });

  it('Verifica se existe um"Link" com o texto "More details" e se funciona', () => {
    renderWithRouter(<App />);

    const getLink = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(getLink).toBeInTheDocument();
    userEvent.click(getLink);
    const details = screen.getByText('Pikachu Details');
    expect(details).toBeInTheDocument();
  });

  it('Verifica se o id da URL combina com o do pokemon', () => {
    const { history } = renderWithRouter(<App />);

    const getLink = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(getLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Verifica se existe uma estrela nos favoritados', () => {
    renderWithRouter(<App />);

    const getLink = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(getLink);

    const getCheckbox = screen.getByText(/pokémon favoritado?/i);
    expect(getCheckbox).toBeInTheDocument();
    userEvent.click(getCheckbox);

    const getStarImage = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(getStarImage).toBeInTheDocument();
  });
});
