import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Test "About" page', () => {
  beforeEach(() => renderWithRouter(<About />));

  it('Renders pokedex informations', () => {
    const pokedexText = screen.getByRole('heading', { level: 2 });
    expect(pokedexText).toHaveTextContent('About Pokédex');
  });

  it('Renders two paragraphs about pokedex', () => {
    const firstParagraph = screen.getByText((content) => content.startsWith('This app'));
    expect(firstParagraph).toBeInTheDocument();
    expect(firstParagraph).toHaveTextContent('encyclopedia containing all Pokémons');

    const secondParagraph = screen.getByText((content) => content.startsWith('One can '));
    expect(secondParagraph).toBeInTheDocument();
    expect(secondParagraph).toHaveTextContent('see more details for each one of them');
  });

  it('Renders an img element', () => {
    const notFoundImg = screen.getByAltText('Pokédex');
    expect(notFoundImg).toBeInTheDocument();
    expect(notFoundImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
