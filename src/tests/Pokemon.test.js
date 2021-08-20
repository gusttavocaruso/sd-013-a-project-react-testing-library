import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente Pokemons', () => {
  const {
    id,
    name,
    type,
    averageWeight: { value, measurementUnit },
    image,
  } = pokemons[0];

  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent(name);

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent(type);

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonWeight)
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    const pokemonImage = screen.getByRole('img', { name: `${name} sprite` });
    expect(pokemonImage.src).toBe(image);
  });

  // https://stackoverflow.com/questions/57827126/how-to-test-anchors-href-with-react-testing-library
  it('Teste se o card do Pokémon contém link de navegação para exibir detalhes', () => {
    const { history } = renderWithRouter(<App />, {
      route: '/',
    });
    const linkMoreDetails = screen.getByRole('link', { name: /More details/i });
    expect(linkMoreDetails).toHaveAttribute('href', `/pokemons/${id}`);

    // Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.
    // https://spectrum.chat/testing-library/general/test-that-a-link-react-router-navigates-to-a-specific-path~f5dcffa9-918f-4331-8a50-8c331a6b95d6
    expect(history.location.pathname).toBe('/');
    userEvent.click(linkMoreDetails);
    const summary = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(summary).toBeInTheDocument();
    expect(history.location.pathname).toBe(`/pokemons/${id}`);

    // Teste se existe um ícone de estrela nos Pokémons favoritados
    const favoriteCheckbox = screen.getByRole('checkbox');
    expect(favoriteCheckbox).toBeInTheDocument();
    userEvent.click(favoriteCheckbox);

    const star = screen.getByRole('img', { name: `${name} is marked as favorite` });
    expect(star).toBeInTheDocument();
    expect(star.src).toBe('http://localhost/star-icon.svg');
  });
});
