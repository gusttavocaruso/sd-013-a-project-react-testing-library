import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';
// Feito com consulta à PR 'https://github.com/tryber/sd-013-a-project-react-testing-library/pull/36/', com autorização da Lanai Conceição
describe('7- Testa o componente PokemonDetails.js', () => {
  const {
    name,
    foundAt,
    summary,
  } = pokemons[0];

  beforeEach(() => renderWithRouter(<App />));

  test('As informações detalhadas do Pokémon selecionado são mostradas na tela.', () => {
    const moreDetails = screen.getByText(/More Details/i);
    userEvent.click(moreDetails);

    const detailH2 = screen.getByRole('heading', {
      name: `${name} Details`,
      level: 2,
    });
    expect(detailH2).toBeInTheDocument();

    expect(moreDetails).not.toBeInTheDocument();

    const summaryH2 = screen.getByRole('heading', {
      name: 'Summary',
      level: 2,
    });
    expect(summaryH2).toBeInTheDocument();

    const summaryText = screen.getByText(summary);
    expect(summaryText).toBeInTheDocument();
  });

  test('Existe na página uma seção com os mapas contendo as localizações do pokémon',
    () => {
      const moreDetails = screen.getByText(/More Details/i);
      userEvent.click(moreDetails);

      const gameLocation = screen.getByRole('heading', { name:
        `Game Locations of ${name}` });
      expect(gameLocation).toBeInTheDocument();

      const pkmnLocations = screen.getAllByAltText(`${name} location`);
      expect(pkmnLocations).toHaveLength(foundAt.length);

      foundAt.forEach((item, index) => {
        const paragraph = screen.getByText(item.location);
        expect(paragraph).toBeInTheDocument();

        expect(pkmnLocations[index]).toHaveAttribute('src', item.map);
      });
    });

  test('O usuário pode favoritar um pokémon através da página de detalhes.', () => {
    const moreDetails = screen.getByText(/More Details/i);
    userEvent.click(moreDetails);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();

    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();

    const label = screen.getByLabelText('Pokémon favoritado?');
    expect(label).toBeInTheDocument();
  });
});
