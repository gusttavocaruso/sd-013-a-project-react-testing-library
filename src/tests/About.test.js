import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import About from '../components/About';

afterEach(cleanup);

describe('Verifica componente About', () => {
  test('Verifica se a tag <h2> está sendo renderizado', () => {
    render(<About />);
    const aboutText = screen.getByRole('heading', { name: 'About Pokédex',
      level: 2 });
    expect(aboutText).toBeInTheDocument();
  });

  test('Verifica se os dois paragrafos estão sendo renderizados', () => {
    render(<About />);
    const firstParagraph = screen.getByTestId('first paragraph');
    expect(firstParagraph).toBeInTheDocument();

    const secondParagraph = screen.getByTestId('second paragraph');
    expect(secondParagraph).toBeInTheDocument();
  });

  test('Verifica se a imagem correta esta sendo renderizada', () => {
    render(<About />);
    const imgAbout = screen.getByRole('img', { name: 'Pokédex' });
    const srcImgAbout = imgAbout.src.includes('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(imgAbout).toBeInTheDocument();
    expect(srcImgAbout).toBeTruthy();
  });
});

// No momento de testar a src, fiquei na vida entre toBe, toBeTruthy, e toBeTrue, pesquisei no stackoverflow, e fui testando ate um que aparetemente deu certo

// https://qastack.com.br/programming/32615713/tobetrue-vs-tobetruthy-vs-tobetrue
