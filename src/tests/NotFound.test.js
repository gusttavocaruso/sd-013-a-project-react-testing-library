import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../components';

describe('Requisito 4', () => {
  it('Testando verifica se o textoesta correto', () => {
    renderWithRouter(<NotFound />);
    // testa se o H2 esta na tela
    const noMatchText = screen.getByRole('heading', {
      name: /Page requested not found/i,
    });
    expect(noMatchText).toBeInTheDocument();
  });
  it('Verifica se a imagem esta na tela', () => {
    renderWithRouter(<NotFound />);
    // Testa se a imagem esta na tela
    const noMatchImg = screen.getAllByRole('img');
    const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(noMatchImg[1]).toHaveAttribute('src', URL);
    expect(noMatchImg[1]).toBeInTheDocument();
  });
});
