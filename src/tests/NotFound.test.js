import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../components';

describe('Testa o componente <NotFound.js />', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found', () => {
    const { history } = renderWithRouter(<NotFound />);
    history.push('rota/não-encontrada/');
    const notMatcher = screen.getByText('Page requested not found');
    expect(notMatcher).toBeInTheDocument();
  });

  it('Teste se página contém uma imagem ', () => {
    renderWithRouter(<NotFound />);
    const message = /Pikachu crying because the page requested was not found/i;
    const img = screen.getByAltText(message);
    const imgURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(img.src).toEqual(imgURL);
  });
});
