import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testa componente "About"', () => {
  beforeEach(() => render(<About />));

  it('Testa se a página tem o texto About Pokédex', () => {
    const heading = screen.getByRole('heading');
    expect(heading.textContent).toBe('About Pokédex');
  });

  it('Testa se a página tem a imagem', () => {
    const img = screen.getByAltText('Pokédex');
    expect(img.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
