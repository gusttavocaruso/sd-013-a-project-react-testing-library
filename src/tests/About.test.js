import React from 'react';
import { render } from '@testing-library/react';
import { fireEvent, screen } from '@testing-library/dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

describe('Teste 2 - About.js', () => {
  test('teste se a página contém um heading h2 com o texto About Pokédex', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const aboutClick = screen.getByRole('link', { name: /about/i });
    fireEvent.click(aboutClick);
    const h2Text = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(h2Text).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const aboutClick = screen.getByRole('link', { name: /About/i });
    fireEvent.click(aboutClick);

    const paragraph1 = screen.getByText(/This application simulates a Pokédex/i);
    const paragraph2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const image = screen.getByRole('img');
    expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});