import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

const {
  id,
  name,
  type,
  image,
  averageWeight: { value, measurementUnit },
} = pokemons[0];

describe('Verifica o componente Pokemon', () => {
  it('Verifica se é renderizado um card com as informações do pokémon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(name);

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(type);

    const pokemonWeigth = screen.getByTestId('pokemon-weight');
    expect(pokemonWeigth)
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);

    const pokemonImage = screen.getByRole('img', { name: `${name} sprite` });
    expect(pokemonImage.src).toBe(image);
  });

  it('Verifica se o card do Pokémon na Pokédex contém um link de detalhes', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: /More details/i });
    expect(moreDetailsLink).toHaveAttribute('href', `/pokemons/${id}`);
  });

  it('Verifica se o link do Pokémon, é redirecionado para a pág. de detalhes', () => {
    const { history } = renderWithRouter(<App />, { route: '/' });

    const moreDetailsLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetailsLink);

    const summary = screen.getByRole('heading', { name: /Summary/i });
    expect(summary).toBeInTheDocument();

    // Verifica se a URL exibida no navegador muda para /pokemon/<id>
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  it('Verifica se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetailsLink);

    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);

    const starIcon = screen.getByRole('img', { name: `${name} is marked as favorite` });
    expect(starIcon).toBeInTheDocument();
    expect(starIcon.src).toBe('http://localhost/star-icon.svg');
  });
});
