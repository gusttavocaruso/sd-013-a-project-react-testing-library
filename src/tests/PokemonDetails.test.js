import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa a pokemonDetails.js', () => {
  const { name, foundAt, summary } = pokemons[0];
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  test('Testa se as infos detalhadas são mostradas', () => {
    const details = screen.getByRole('link', { name: /more details/i });
    fireEvent.click(details);

    const headingDetails = screen.getByRole('heading', { name: `${name} Details` });
    expect(headingDetails).toBeInTheDocument();

    expect(details).not.toBeInTheDocument();

    const headingSummary = screen.getByRole('heading', { name: /summary/i });
    expect(headingSummary).toBeInTheDocument();

    expect(screen.getByText(summary)).toBeInTheDocument();
  });
  test('Testa se existem os mapas na página', () => {
    const locations = ['Kanto Viridian Forest', 'Kanto Power Plant'];
    const details = screen.getByRole('link', { name: /more details/i });

    fireEvent.click(details);

    const headingLocation = screen.getByRole('heading',
      { name: `Game Locations of ${name}` });
    expect(headingLocation).toBeInTheDocument();

    foundAt.forEach((item, index) => {
      const imgs = screen.getAllByRole('img',
        { name: `${name} location` });

      expect(imgs[index]).toHaveAttribute('src', item.map);
    });
    locations.forEach((item, index) => {
      expect(screen.getByText(item)).toBeInTheDocument();
      const imgs = screen.getAllByRole('img',
        { name: `${name} location` });

      expect(imgs[index]).toHaveAttribute('src', foundAt[index].map);
    });
  });
  test('Testa se um usuário pode favoritar através dos detalhes', () => {
    const details = screen.getByRole('link', { name: /more details/i });
    fireEvent.click(details);

    const checkBox = screen.getByRole('checkbox', 'Pokémon favoritado?');
    expect(checkBox).toBeDefined();
    fireEvent.click(checkBox);

    let favorited = screen.getByRole('img', { name: `${name} is marked as favorite` });
    expect(favorited).toHaveAttribute('src', '/star-icon.svg');
    fireEvent.click(checkBox);

    favorited = screen.queryByRole('img', { name: `${name} is marked as favorite` });
    expect(favorited).not.toBeInTheDocument();

    expect(screen.getByText(/Pokémon favoritado?/i)).toBeInTheDocument();
  });
});

// consulta no repositório : https://github.com/tryber/sd-013-a-project-react-testing-library/blob/1f10a253b67383dc358790eb99fc4e5bb26d1e94/src/tests/PokemonDetails.test.js
