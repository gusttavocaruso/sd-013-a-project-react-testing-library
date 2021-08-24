import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../components';

describe('App.js tests.', () => {
  test('Verifica se página contém as informações sobre a Pokédex.', () => {
    render(<About />);

    expect(screen
      .getByText(/This application simulates a Pokédex/i))
      .toBeDefined();
  });

  test('Verifica se existe um heading h2 com o texto About Pokédex.', () => {
    render(<About />);

    expect(screen.getByText('About Pokédex')).toBeDefined();
  });

  test('Verifica se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    render(<About />);

    expect(screen.getByText(/This application simulates /i)).toBeInTheDocument();
    expect(screen.getByText(/One can filter Pokémons/i)).toBeInTheDocument();
  });

  test('Verifica se a página contém a seguinte imagem de uma Pokédex:', () => {
    render(<About />);

    const imagePokedex = screen.getByRole('img');
    expect(imagePokedex.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
