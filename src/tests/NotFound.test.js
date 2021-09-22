import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  beforeEach(() => {
    render(<NotFound />);
  });

  test('Verifica se a página mostra a gif', () => {
    const imagem = screen.getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });
    expect(imagem.src).toStrictEqual('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });

  test('Verifica se página contém um "h2" com o texto "Page requested not found"', () => {
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();

    const headingText = screen.getByRole(
      'heading',
      { name: 'Page requested not found Crying emoji',
      },
    );
    expect(headingText).toBeInTheDocument();
  });
});
