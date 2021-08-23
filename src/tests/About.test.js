import { screen } from '@testing-library/react';
import React from 'react';
import renderWithRouter from '../renderWithRouter';

import About from '../components/About';

describe('Testes da aplicação.', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);

    const heading = screen.getByRole('heading', {
      name: /About Pokédex/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto e Imagem Pokédex.', () => {
    renderWithRouter(<About />);

    const getLink = screen.getByRole('img');
    expect(getLink).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
