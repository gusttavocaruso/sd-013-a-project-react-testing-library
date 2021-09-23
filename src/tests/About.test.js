import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import About from '../components/About';

describe('Requisito 2 - About.js', () => {
  test('Verifica se a página contém um heading h2 com o texto About Pokédex', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>,
    );
    const blnHeadingAbout = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
      exact: false,
    });
    expect(blnHeadingAbout).toBeInTheDocument();
  });

  test('Verifica se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>,
    );
    const firstParagraph = screen.getByText('This application simulates', {
      exact: false,
    });
    expect(firstParagraph).toBeInTheDocument();

    const secParagraph = screen.getByText('One can filter', {
      exact: false,
    });
    expect(secParagraph).toBeInTheDocument();
  });

  test('Verifica se a imagem do bulbagarden renderiza na tela', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>,
    );
    const pathImage = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    // --------------------------------------------------------
    // help source: https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
    const bulbagardenImg = screen.getByRole('img');
    expect(bulbagardenImg).toHaveAttribute('src', pathImage);
    // --------------------------------------------------------
  });
});
