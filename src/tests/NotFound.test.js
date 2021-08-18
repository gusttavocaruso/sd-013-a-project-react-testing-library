import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  describe('Testa implementação da página', () => {
    it('Teste se página contém um heading h2 Page requested not found', () => {
      render(<NotFound />);
      const h2Text = screen.getByRole('heading',
        { name: 'Page requested not found Crying emoji' });
      const h2 = screen.getByRole('heading', { level: 2 });

      expect(h2Text).toBeInTheDocument();
      expect(h2).toBeInTheDocument();
    });

    it('Testa se a pagina contem uma imagem.', () => {
      render(<NotFound />);

      const img = screen.getByRole('img',
        { name: 'Pikachu crying because the page requested was not found' });

      expect(img.src).toStrictEqual('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    });
  });
});
