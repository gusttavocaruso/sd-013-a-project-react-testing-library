import React from 'react';

import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('<About /> Tests Section', () => {
  beforeEach(() => {
    render(
      <About />,
    );
  });

  it('should contain title about pokedex', () => {
    const title = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(title).toBeInTheDocument();
  });

  it('should contain text about Pokémons', () => {
    const pokemons = screen.getAllByText(/pokémons/i);
    expect(pokemons.length).toStrictEqual(2);
  });

  it('should contain image path exactly', () => {
    const img = screen.getByRole('img');
    expect(img.src).toStrictEqual('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
