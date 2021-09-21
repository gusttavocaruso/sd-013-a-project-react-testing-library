import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Pokemon', () => {
  /**
 * Consultei o repositório do Carlos Lima para resolver essa parte. Gostei dessa ideia de descontrução feita na linha 13 e resolvi adotar.
 * https://github.com/tryber/sd-013-a-project-react-testing-library/blob/carloslima-project-react-testing-library/src/tests/Pokemon.test.js
 */
  const {
    id,
    name,
    type,
    averageWeight: {
      value,
      measurementUnit,
    },
    image,
  } = pokemons[0];

  test('Testa se é renderizado um card com informações de determinado pokémon.', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(name);
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);
    expect(screen.getByTestId('pokemon-weight'))
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    expect(screen.getByAltText(`${name} sprite`)).toHaveAttribute('src', image);
  });
  test('Teste se o card do Pokémon indicado na Pokédex contém um link , '
    + 'de navegação para exibir detalhes deste Pokémon e os efeitos ao clicar', () => {
    const { history } = renderWithRouter(<App />);
    const linkDetalhes = screen.getByRole('link', {
      name: /More details/i,
    });
    expect(linkDetalhes).toBeDefined();
    fireEvent.click(linkDetalhes);
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });
  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const linkDetalhes = screen.getByRole('link', {
      name: /More details/i,
    });
    fireEvent.click(linkDetalhes);
    const checkFavorite = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });
    fireEvent.click(checkFavorite);
    const imgStar = screen.getByRole('img', {
      name: `${name} is marked as favorite`,
    });
    expect(imgStar).toHaveAttribute('src', '/star-icon.svg');
  });
});
