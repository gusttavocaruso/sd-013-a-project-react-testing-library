import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testa o componente <About.js />', () => {
  describe('Testa se a página contém informações sobre a Pokédex.', () => {
    it('Testa se a página contém um heading "h2" com o texto "About Pokédex".', () => {
      render(<About />);

      const h2 = screen.getByRole('heading', { level: 2 });
      const h2Text = screen.getByRole('heading', { name: /about pokédex/i });

      expect(h2).toBeInTheDocument();
      expect(h2Text).toBeInTheDocument();
    });
    it('Testa se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
      render(<About />);

      const info = screen.getAllByText(/pokémons/i);

      expect(info).toHaveLength(2);
    });
    it('Testa se a página contém a seguinte imagem de uma Pokédex específica.', () => {
      render(<About />);

      const img = screen.getByRole('img', { name: /pokédex/i });

      expect(img.src).toStrictEqual('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    });
  });
});
