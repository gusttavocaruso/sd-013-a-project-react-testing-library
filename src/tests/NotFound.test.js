import React from 'react';
import { screen } from '@testing-library/react';
import { render } from 'react-dom';
import NotFound from '../components/NotFound';
import renderWithRouter from '../components/renderWithRouter';

describe('Requisito 4', () => {
  test('A página contém um heading "h2"', () => {
    renderWithRouter(<NotFound />);

    const header = screen.getByRole('heading', {
      name: /Page requested not found/i,
    });

    expect(header).toBeInTheDocument();
  });

  it('A página mostra imagem', () => {
    renderWithRouter(<NotFound />);

    const img = screen.getByAltText(/Pikachu crying because the page requested was not found/i);

    expect(img.src).toEqual('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
