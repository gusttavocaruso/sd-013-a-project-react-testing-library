import React from 'react';

import { render, screen } from '@testing-library/react';
import About from '../components/About';

beforeEach(() => render(<About />));

describe('testa o componente About', () => {
  it('testa o titulo', () => {
    const titulo = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });

    expect(titulo).toBeInTheDocument();
  });

  it('testa os dois paragrafos', () => {
    const paragrafo1 = screen.getByTestId('paragraph-1');
    const paragrafo2 = screen.getByTestId('paragraph-2');

    expect(paragrafo1).toBeInTheDocument();
    expect(paragrafo2).toBeInTheDocument();
  });

  it('testa a imagem', () => {
    const imagem = screen.getByRole('img');

    expect(imagem).toBeInTheDocument();

    expect(imagem).toHaveAttribute(
      'src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
