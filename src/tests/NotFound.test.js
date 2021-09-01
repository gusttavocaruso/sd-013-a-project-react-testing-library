import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

beforeEach(() => render(<NotFound />));

describe('Testa o component NotFound', () => {
  it('Testa o titulo', () => {
    const titulo = screen.getByRole('heading', {
      name: /Page requested not found/i,
    });
    expect(titulo).toBeInTheDocument();
  });

  it('Testa a imagem', () => {
    const imagem = screen
      .getByAltText(/Pikachu crying because the page requested was not found/i);

    expect(imagem).toBeInTheDocument();

    expect(imagem).toHaveAttribute(
      'src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});

// 4. Teste o componente <NotFound.js />
// Teste se página contém um heading h2 com o texto Page requested not found 😭;
// Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.
// O que será verificado:
// Será avaliado se o arquivo teste NotFound.test.js contemplam 100% dos casos de uso criados pelo Stryker.
