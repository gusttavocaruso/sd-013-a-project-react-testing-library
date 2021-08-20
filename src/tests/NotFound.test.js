import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Verifica o componente NotFound', () => {
  test('Renderiza mensagem de pagina não encontrada', () => {
    const { history } = renderWithRouter(<NotFound />);
    history.push('/error');
    const notFoundText = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(notFoundText).toBeInTheDocument();
  });

  test('Verifica se a imagem correta esta sendo renderizada', () => {
    const { history } = renderWithRouter(<NotFound />);
    history.push('/error');
    const imgNotFound = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(imgNotFound).toBeInTheDocument();
    const srcImgNotFound = imgNotFound.src.includes('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(srcImgNotFound).toBeTruthy();
  });
});

// Praticamente dei Ctrl c + Ctrl v no requisito 2, e reaproveitei os testes da img e da mensagem de Page requested not found
