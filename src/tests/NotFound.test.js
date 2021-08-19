import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando componente NotFound.js', () => {
  it('Deve conter um h2 com o texto "Page requested not found"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/url-nao-existente');

    const notFoundMessage = screen.getByRole('heading', {
      name: /page requested not found/i,
    });

    expect(notFoundMessage).toBeInTheDocument();
  });

  it('Deve conter a imagem de notFound', () => {
    const { history } = renderWithRouter(<App />);
    history.push('url-nao-existente');

    const notFoundImg = screen.getByRole('img', {
      name: /Pikachu crying because the page requested was not found/i,
    });

    expect(notFoundImg.src).toBe(
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
