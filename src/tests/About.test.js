import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { About } from '../components';

describe('Tests for the About.js component', () => {
  it('Checks if the page has 1 (one) "H2" element with the text "About Pokédex"', () => {
    renderWithRouter(<About />);
    // Catches the H2 element by using the screen.getByRole method.
    const aboutPokedex = screen.getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });
    // It expects the H2 element to be in the document.
    expect(aboutPokedex).toBeInTheDocument();
  });

  it('Checks if the page contains 2 (two) "P" elements with info about pokédex"', () => {
    renderWithRouter(<About />);
    // Catches the "P" element by using the RegExp (/string/i) method and fetching the information to a new const through a screen.getByText method.
    const firstText = /this application simulates a Pokédex/i;
    const firstPokedéxInfo = screen.getByText(firstText);
    // It expects the "P" element, with the corresponding text captured by the RegEx method, to be in the document.
    expect(firstPokedéxInfo).toBeInTheDocument();
    const secondText = /one can filter Pokémons by type/i;
    const secondPokedéxInfo = screen.getByText(secondText);
    expect(secondPokedéxInfo).toBeInTheDocument();
  });

  it('Checks if the Pokedéx displays a particular image', () => {
    renderWithRouter(<About />);
    // This img should be in the page.
    const pokedexImg = screen.getByAltText(/pokédex/i);
    // This should be the source of the image fetched above.
    expect(pokedexImg.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
