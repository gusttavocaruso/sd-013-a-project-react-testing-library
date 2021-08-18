import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Teste o Componente <FavoritePokemons.js />.', () => {
  describe('Testa implementação da página".', () => {
    it('Test ase é exibido "No favorite Pokemon found".', () => {
      render(<FavoritePokemons />);

      const favoritePokemons = screen.getByText(/no favorite pokemon/i);
      expect(favoritePokemons).toBeInTheDocument();
    });
  });
});
