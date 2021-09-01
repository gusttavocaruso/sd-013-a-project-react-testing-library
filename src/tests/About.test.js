import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

beforeEach(() => render(<About />));

describe('Testa o componente About', () => {
  it('Testa o título', () => {
    const titulo = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });

    expect(titulo).toBeInTheDocument();
  });

  it('Testa os dois paragrafos', () => {
    const paragrafos = screen.getAllByText(/Pokémons/i);

    expect(paragrafos.length).toBe(2);
  });

  it('Testa a imagem', () => {
    const imagem = screen.getByRole('img');

    expect(imagem).toBeInTheDocument();

    expect(imagem).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});

// 2. Teste o componente `<About.js />.`
// - Teste se a página contém as informações sobre a Pokédex.
// - Teste se a página contém um heading `h2` com o texto `About Pokédex`.
// - Teste se a página contém dois parágrafos com texto sobre a Pokédex.
// - Teste se a página contém a seguinte imagem de uma Pokédex: `https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png`.
//* *O que será verificado:**
// - Será avaliado se o arquivo teste `About.test.js` contemplam 100% dos casos de uso criados pelo Stryker.
