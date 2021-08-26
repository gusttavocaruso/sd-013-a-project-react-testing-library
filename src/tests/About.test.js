import React from 'react';
import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { About } from '../components';

describe('Testing About.js', () => {
  test('Testing if the page have specific texts', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>,
    );
    const pokedexInformation = screen.getByRole('heading', {
      name: /about pokédex/i, level: 2 });
    expect(pokedexInformation).toBeInTheDocument();
    expect(screen.getByText(/This application simulates a Pokédex/i)).toBeInTheDocument();
    expect(screen.getByText(/One can filter/i)).toBeInTheDocument();
  });

  test('', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>,
    );
    const image = screen.getByRole('img');
    expect(image.src).toEqual('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
