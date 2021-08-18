import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFound from '../components/NotFound';

describe('NotFound.js tests', () => {
  test('Renderiza um heading h2 com texto correto', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );

    const h2 = screen.getByRole('heading', {
      level: 2,
      name: /requested not/i,
    });
    expect(h2).toBeInTheDocument();
  });

  test('Renderiza imagem Pikachu chorando NotFound', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );

    const img = screen.getByAltText(/crying because/i);
    expect(img.src).toStrictEqual('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
