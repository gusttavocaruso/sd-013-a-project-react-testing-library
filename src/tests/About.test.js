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

    expect(screen.getByTestId('paragraph1')).toBeDefined();
    expect(screen.getByTestId('paragraph2')).toBeDefined();
  });

  test('Verifica se a página contém a seguinte imagem de uma Pokédex:', () => {
    render(<About />);

    const image = screen.getByRole('img', {
    });
    expect(image).toBeInTheDocument();
  });
});
