import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../components';

describe('Tests About.js component', () => {
  it('Checks if the page cointains Pokedéx information', () => {
    render(<About />);
    // These p's should be in the page
    const firstText = /this application simulates a Pokédex/i;
    const firstPokedéxInfo = screen.getByText(firstText);
    expect(firstPokedéxInfo).toBeInTheDocument();
    const secondText = /one can filter Pokémons by type/i;
    const secondPokedéxInfo = screen.getByText(secondText);
    expect(secondPokedéxInfo).toBeInTheDocument();
  });

  it('Checks if the About Pokedéx title is displayed', () => {
    render(<About />);
    // This h2 should be in the page
    const aboutPokedex = screen.getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });
    expect(aboutPokedex).toBeInTheDocument();
  });
  it('Checks if the Pokedéx displays a particular image', () => {
    render(<About />);
    // This img should be in the page
    const pokedexImg = screen.getByAltText(/pokédex/i);
    // This should be the source of the image fetched above
    expect(pokedexImg.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
