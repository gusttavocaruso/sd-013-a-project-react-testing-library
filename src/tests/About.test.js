import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import About from '../components/About';

describe('About.js tests', () => {
  test('Renderiza as informações sobre a Pokédex', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>,
    );

    const about = screen.getByText(/encyclopedia containing/i);
    expect(about).toBeInTheDocument();
  });

  test('Renderiza um heading h2 com texto correto', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>,
    );

    const h2 = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(h2).toBeInTheDocument();
  });

  test('Renderiza dois paragrafos e seus textos', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>,
    );

    const p1 = screen.getByText(/a digital encyclopedia /i);
    expect(p1).toBeInTheDocument();
    const p2 = screen.getByText(/see more details for each/i);
    expect(p2).toBeInTheDocument();
  });

  test('Renderiza imagem GameBoy', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>,
    );

    const img = screen.getByRole('img');
    expect(img.src).toStrictEqual('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
