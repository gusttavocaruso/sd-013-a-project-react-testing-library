import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Verifica componente About', () => {
  test('Verifica se a tag <h2> está sendo renderizado', () => {
    renderWithRouter(<About />);
    const aboutText = screen.getByRole('heading', { name: 'About Pokédex',
      level: 2 });
    expect(aboutText).toBeInTheDocument();
  });

  test('Verifica se os dois paragrafos estão sendo renderizados', () => {
    renderWithRouter(<About />);
    const firstParagraph = screen.getByTestId('first paragraph');
    expect(firstParagraph).toBeInTheDocument();

    const secondParagraph = screen.getByTestId('second paragraph');
    expect(secondParagraph).toBeInTheDocument();
  });

  test('Verifica se a imagem correta esta sendo renderizada', () => {
    renderWithRouter(<About />);
    const imgAbout = screen.getByAltText('Pokédex');
    const srcImgAbout = imgAbout.src.includes('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(imgAbout).toBeInTheDocument();
    expect(srcImgAbout).toBeTruthy();
  });
});

// No momento de testar a src, fiquei na duvida entre toBe, toBeTruthy, e toBeTrue, pesquisei no stackoverflow, e fui testando ate um que aparetemente deu certo

// https://qastack.com.br/programming/32615713/tobetrue-vs-tobetruthy-vs-tobetrue
