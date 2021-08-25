import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFound from '../components/NotFound';

describe('teste NotFound.js', () => {
  test('Teste se página contém um h2 com o texto Page requested not found 😭', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );
    const notFound = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(notFound).toBeInTheDocument();
  });

  test('Verifica se a página mostra a imagem:', () => {
    render(<NotFound />);

    const image = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(image.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
