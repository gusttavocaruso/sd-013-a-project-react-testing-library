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
    // expect(screen.getAllByRole('paragraph')).toHaveLength(2);

    expect(screen.getByText(/This application simulates a Pokédex/i)).toBeInTheDocument();
    expect(screen.getByText(/One can filter/i)).toBeInTheDocument();
  });
});
