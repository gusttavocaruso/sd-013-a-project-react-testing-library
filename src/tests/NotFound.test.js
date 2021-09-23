import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Requisito 4: texte do componente NotFound', () => {
  afterEach(cleanup);
  it('Requisito 4.1: Teste se h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);
    /** ======== acessando o elemento ========= */
    const h2heading = screen
      .getByRole('heading', { level: 2, name: /Page requested not found/i });

    /** ======== testando os elementos ========= */
    expect(h2heading).toBeInTheDocument();
  });

  it('Requisito 4.2: Teste se página mostra a imagem é a correta', () => {
    renderWithRouter(<NotFound />);
    /** ======== acessando o elemento ========= */
    const img = screen.getByRole('img', { name: /Pikachu crying/i });
    const urlGif = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    /** ======== testando os elementos ========= */
    expect(img.src).toStrictEqual(urlGif);
  });
});
