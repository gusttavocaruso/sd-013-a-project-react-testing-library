import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 4 - NotFound.js', () => {
  test('Verfica se a página contém um heading com texto especifico', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/rota-que-nao-existe');
    expect(screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
      exact: false,
    })).toBeInTheDocument();
  });

  test('Verifica se renderiza imagem do Pikachu chorando', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/rota-que-nao-existe');
    const pikachuCryImg = screen.getByRole('img', {
      name: /pikachu crying/i,
      exact: false,
    });
    const pathImagePikachuCryng = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(pikachuCryImg).toHaveAttribute('src', pathImagePikachuCryng);
  });
});
