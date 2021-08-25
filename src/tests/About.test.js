import React from 'react';
import { screen, render } from '@testing-library/react';
import About from '../components/About';

beforeEach(() => {
  render(<About />);
});

describe('About component:', () => {
  it('should have an h2 \'About Pokédex\' ', () => {
    const h2 = screen.queryByRole('heading', { name: 'About Pokédex' });
    expect(h2).toBeInTheDocument();
  });

  it('should have 2 paragraphs', () => {
    const firstParagraph = /This application simulates a Pokédex/i;
    const elFirstParagraph = screen.queryByText(firstParagraph);
    expect(elFirstParagraph).toBeInTheDocument();

    const secondParagraph = /One can filter Pokémons by type/i;
    const elSecondParagraph = screen.queryByText(secondParagraph);
    expect(elSecondParagraph).toBeInTheDocument();
  });

  it('should have an image of a pokedex', () => {
    const img = screen.queryByAltText('Pokédex');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
