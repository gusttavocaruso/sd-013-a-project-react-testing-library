import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import About from '../components/About';

describe('Teste o componente <About.js />', () => {
  test('se a página contém um heading h2 com o texto "About Pokédex"', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <About />
      </Router>,
    );

    const h2Text = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });

    expect(h2Text).toBeInTheDocument();
  });

  test('se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <About />
      </Router>,
    );

    const paragrafo1Text = screen.getByText(/simulates a pokédex/i);

    expect(paragrafo1Text).toBeInTheDocument();

    const paragrafo2Text = screen.getByText(/filter pokémons/i);

    expect(paragrafo2Text).toBeInTheDocument();
  });

  test('se a página contém a seguinte imagem de uma Pokédex', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <About />
      </Router>,
    );

    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imagem = screen.getByRole('img');

    expect(imagem.src).toBe(src);
  });
});
