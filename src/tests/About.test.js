import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Test the component About', () => {
  it('If the page have a h2 heading with the text "About Pokédex"', () => {
    renderWithRouter(<About />);

    const headingText = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    const paragraph01 = screen
      .getByText((content) => content
        .startsWith('This application simulates a Pokédex, a'));
    const paragraph02 = screen.getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    );
    const img = screen.getByAltText(/Pokédex/i);

    expect(headingText).toBeInTheDocument();
    expect(paragraph01).toBeInTheDocument();
    expect(paragraph02).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
