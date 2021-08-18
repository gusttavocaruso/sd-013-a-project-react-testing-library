import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../components';

describe('Test About.js', () => {
  it('contain information about the Pokédex', () => {
    render(<About />);
    const heading = screen.getByRole('heading', {
      name: /^About Pokédex$/,
      level: 2,
    });
    expect(heading).toBeInTheDocument();

    const firstP = screen.getByText(/^This application simulates a Pokédex,/);
    expect(firstP).toBeInTheDocument();
    const secondP = screen.getByText(/^One can filter Pokémons by type,/);
    expect(secondP).toBeInTheDocument();

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
