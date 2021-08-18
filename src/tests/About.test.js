import React from 'react';
import { screen } from '@testing-library/react';

import About from '../components/About';
import renderWithRouter from '../helpers/renderWithRouter';

describe('should test the About component', () => {
  it('verify if the page contains information about Pokédex', () => {
    renderWithRouter(<About />);
    const firstInformation = screen.getByText(/digital encyclopedia/i);
    const secondInformation = screen.getByText(/Pokémons by type/i);

    expect(firstInformation).toBeInTheDocument();
    expect(secondInformation).toBeInTheDocument();
  });

  it('verify if the page contains a <h2> with "About Pokédex" text', () => {
    renderWithRouter(<About />);
    const h2 = screen.getByText(/About Pokédex/i);

    expect(h2).toBeInTheDocument();
  });

  it('verify if two paragraphs exists in About component', () => {
    renderWithRouter(<About />);
    const getBothTexts = screen.getAllByText(/all Pokémons|by type/i);

    expect(getBothTexts).toHaveLength(2);
  });

  it('verify if the Pokédex (only the image) image is in the document', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img');
    const imageSource = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(image).toHaveAttribute('src', imageSource);
    expect(image).toHaveAttribute('alt', 'Pokédex');
    expect(image).toBeInTheDocument();
  });
});
