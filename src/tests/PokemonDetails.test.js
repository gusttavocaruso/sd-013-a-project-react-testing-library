import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';
import App from '../App';

const {
  name,
  foundAt,
  summary,
} = pokemons[0];

describe('PokemonDetails.js Tests',
  () => {
    const textLink = 'More details';
    test('tests if a card with the information of each pokemon is rendered', () => {
      renderWithRouter(<App />);
      const details = screen.getByText(textLink);
      userEvent.click(details);

      const hText = screen.getByRole('heading', {
        name: `${name} Details`,
        level: 2,
      });
      expect(hText).toBeInTheDocument();
      expect(details).not.toBeInTheDocument();

      const hTextSummary = screen.getByRole('heading', {
        name: 'Summary',
        level: 2,
      });
      expect(hTextSummary).toBeInTheDocument();

      const textSummary = screen.getByText(summary);
      expect(textSummary).toBeInTheDocument();
    });

    test('test if there is a section on the page with maps containing the locations',
      () => {
        renderWithRouter(<App />);

        const details = screen.getByText(textLink);
        userEvent.click(details);

        const location = screen.getByRole('heading', { name:
          `Game Locations of ${name}` });
        expect(location).toBeInTheDocument();

        const altNamePok = screen.getAllByAltText(`${name} location`);
        expect(altNamePok).toHaveLength(foundAt.length);

        foundAt.forEach((item, index) => {
          const p = screen.getByText(item.location);
          expect(p).toBeInTheDocument();

          const pokAlt = screen.getAllByAltText(`${name} location`);
          expect(pokAlt[index]).toHaveAttribute('src', item.map);
        });
      });

    test('tests if the user can bookmark a pokemon on the details page', () => {
      renderWithRouter(<App />);

      const details = screen.getByText(textLink);
      userEvent.click(details);

      const checkBox = screen.getByRole('checkbox');
      expect(checkBox).toBeInTheDocument();

      userEvent.click(checkBox);
      expect(checkBox).toBeChecked();

      userEvent.click(checkBox);
      expect(checkBox).not.toBeChecked();

      const label = screen.getByLabelText('Pokémon favoritado?');
      expect(label).toBeInTheDocument();
    });
  });
